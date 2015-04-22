import fs from "fs";
import { execSync } from "child_process";
import { join } from "path";

import { version } from "../../package.json";

export default (config, options) => {
  if (!options.prerender) {
    let plugin = function() {
      this.plugin("done", function(stats) {
        let jsonStats = stats.toJson({
          chunkModules: true,
          exclude: options.excludeFromStats,
        });
        jsonStats.publicPath = options.publicPath;
        jsonStats.appVersion = version;
        jsonStats.appCommit = execSync("git rev-parse --short HEAD").toString();

        const folderPath = join(__dirname, "../../", "build");
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        fs.writeFileSync(join(folderPath, "stats.json"), JSON.stringify(jsonStats));
      });
    };
    config.plugins.push(plugin);
  }
  return config;
};
