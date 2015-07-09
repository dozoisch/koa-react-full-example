import React from "react";
import Counter from "../components/counter";

export default class Index extends React.Component {
  static displayName = "IndexPage";
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Index - Super Counter</h2>
        <Counter />
      </div>
    );
  }
}
