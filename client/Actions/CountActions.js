import { Actions } from "flummox";
import CountApi from "../api/CountApi";
const countApi = new CountApi();

class CounterActions extends Actions {
  async fetchCount(id) {
    return await countApi.read(id);
  }

  async increment(count) {
    ++(count.value);
    return await countApi.update(count);
  }

  async decrement(count) {
    --(count.value);
    return await countApi.update(count);
  }
}

export default CounterActions;
