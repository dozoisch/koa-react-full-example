import { Store } from "flummox";

class CountStore extends Store {
  constructor(flux, initialState) {
    super();
    const countActions = flux.getActions("count");
    this.registerAsync(countActions.fetchCount,
      this.handleBeginFetchCount,
      this.handleSuccessFetchCount,
      this.handleFailedFetchCount
    );
    this.registerAsync(countActions.increment,
      null,
      this.handleSuccessFetchCount,
      null
    );
    this.registerAsync(countActions.decrement,
      null,
      this.handleSuccessFetchCount,
      null
    );
    this.state = initialState || {};
  }

  handleBeginFetchCount() {

  }

  handleSuccessFetchCount(count) {
    this.setState({ count });
  }

  handleFailedFetchCount() {

  }

  getInitialState() {
    return {};
  }

  getCount(id) {
    return this.state.count;
  }
}

export default CountStore;
