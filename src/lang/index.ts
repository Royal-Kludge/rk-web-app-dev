import { createI18n } from "vue-i18n";
import EN from "./en";
import CN from "./zh-cn";
import TW from "./zh-tw";
import JA from "./ja";
import KR from "./ko-kr";
import RU from "./ru";
import PT_BR from "./pt_br";
import DE from "./de";
import ES from "./es";
import TR from "./tr";
import IT from "./it";
import AR from "./ar";
import TH from "./th";

// 获取浏览器界面语言，默认语言
let currentLanguage = navigator.language.toLowerCase();
// 如果本地缓存记录了语言环境，则使用本地缓存
let lsLocale = localStorage.getItem("locale") || "";
if (lsLocale) {
  currentLanguage = lsLocale;
}

const messages = {
  en: {
    ...EN,
  },
  cn: {
    ...CN,
  },
  tw: {
    ...TW,
  },
  ja: {
    ...JA,
  },
  kr: {
    ...KR,
  },
  ru: {
    ...RU,
  },
  pt_br: {
    ...PT_BR,
  },
  de: {
    ...DE,
  },
  es: {
    ...ES,
  },
  tr: {
    ...TR,
  },
  it: {
    ...IT,
  },
  ar: {
    ...AR,
  },
  th: {
    ...TH,
  },
};
let lang = 'en';
for (let key in messages) {
  if (messages.hasOwnProperty(key)) {
    if (currentLanguage.includes(key)) {
      lang = key
    }
  }
}
//进行类型配置，可根据不同类型进行不同配置
const i18n = createI18n({
  legacy: false, //使用Composition APT模式，需要将其设置为false
  globalInjection: true, //全局生效$t
  locale: lang, //默认使用的语言
  messages: messages, //es6解构
});
export default i18n;
