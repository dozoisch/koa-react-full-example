import _ from "lodash";

export default (config, options) => {
  if (options.development) {
    config = _.extend({}, config, {
      devtool: "cheap-module-eval-source-map",
    });

    return config;
  }

  return config;
};
