import { Flummox } from "flummox";
import CountStore from "./stores/CountStore";

export default class Flux extends Flummox {
  constructor(actions, currentUser) {
    super();
    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        this.createActions(key, actions[key]);
      }
    }
    this.createStore("count", CountStore, this);
  }
}
