import { createPinia } from "pinia";

export default ({ app }, inject) => {
  const pinia = createPinia();
  app.pinia = pinia;
  inject("pinia", pinia);
};
