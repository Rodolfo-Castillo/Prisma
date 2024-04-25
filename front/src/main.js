import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar, Notify } from "quasar";
import quasarLang from "quasar/lang/es";
import routes from "./router";

import "./style.css";
import App from "./App.vue";
const pinia = createPinia();

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

createApp(App)
    .use(Quasar, {
        plugins: { Notify }, // import Quasar plugins and add here
        config: {
            notify: {},
        },
        lang: quasarLang,
    })
    .use(pinia)
    .use(routes)
    .mount("#app");
