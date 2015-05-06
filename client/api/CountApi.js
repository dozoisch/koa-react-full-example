import ResourceApi from "./ResourceApi";
import Count from "../model/Count";

class CountApi extends ResourceApi {
    static resourceUrl = "counts";
    static resourceName = {
      singular: "count",
      plural: "counts",
    };
    static Resource = Count;
};

export default CountApi;
