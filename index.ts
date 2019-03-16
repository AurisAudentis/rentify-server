import {app} from "./src/app";
import config from "./config/config";

new app().launch(config.port);