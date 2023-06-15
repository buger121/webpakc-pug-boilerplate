import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Sheet1 from '@/i18n/translate.xlsx';

Vue.use(VueI18n);

const { Sheet1: data } = Sheet1;
const messages = {};
data.forEach((item) => {
  for (let [key, val] of Object.entries(item)) {
    if (!messages[key]) messages[key] = {};
    messages[key][item.id] = val;
  }
});

const localLang = sessionStorage.getItem('madtale-lang') || null;
const rLang = /index_(.*).html/.exec(window.location.href);
const defaultLang = rLang ? rLang[1] : localLang || 'en';
sessionStorage.setItem('madtale-lang', defaultLang);

export default new VueI18n({
  locale: sessionStorage.getItem('madtale-lang') || defaultLang, // set locale
  messages, // set locale messages
});
