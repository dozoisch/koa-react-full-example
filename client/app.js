import React from "react";
import Router from "react-router";
import FluxComponent from "flummox/component";

import Actions from "./Actions";
import Flux from "../shared/Flux";
import routes from "../shared/routes";
import requestData from "../shared/requestData";

const container = document.getElementById("content");

const flux = new Flux(Actions);

if (process.env.NODE_ENV !== "production") {
  flux.on("dispatch", (dispatch) => {
    const { actionId, ...payload } = dispatch;
    console.log("Dispatch:", actionId, payload);
  });
}

if (typeof window !== undefined && window.DATA) {
  flux.hydrate(window.DATA);
}

const router = Router.create({
  routes,
  // @TODO finish serverside rendering
  location: Router.HashLocation, //Router.HistoryLocation,
  transitionContext: { flux },
});

router.run((Root, state) => {
  requestData(state.routes, { flux, state });

  React.render(
    <FluxComponent flux={flux}>
      <Root />
    </FluxComponent>,
    container
  );
});

