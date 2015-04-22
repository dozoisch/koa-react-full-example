import _ from "lodash";
import { optimize, NoErrorsPlugin } from "webpack";

export default (config, options) => {
  if (options.optimize) {
    config = _.extend({}, config, {
      output: _.extend({}, config.output, {
        filename: "[name].min.js",
      }),
    });
    config.plugins = config.plugins.concat([
      new optimize.UglifyJsPlugin(),
      new optimize.DedupePlugin(),
      new NoErrorsPlugin(),
    ]);
    return config;
  }

  return config;
};
