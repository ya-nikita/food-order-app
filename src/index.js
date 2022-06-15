import "core-js/stable";
import "regenerator-runtime/runtime";

import Main from "./js/app.js";

let main = new Main();

main.render().then(() => console.log("Страница готова!"));
