import en from "./eng.json";
import pl from "./pl.json";

type EnTranslate = typeof import("./eng.json");
type PlTranslate = typeof import("./pl.json");

export type Translate = Partial<EnTranslate | PlTranslate>;
export type TranslateGroups = keyof Translate;
export type TranslateLabels = keyof Translate["labels"];
export type TranslatePlaceholders = keyof Translate["placeholders"];
export type TranslateButtons = keyof Translate["buttons"];
export type TranslateTexts = keyof Translate["texts"];
export type TranslateErrors = keyof Translate["errors"];
export type TranslateMenu = keyof Translate["menu"];
export type TranslateSelect = keyof Translate["select"];
export type TranslateNotifications = keyof Translate["notifications"];
export type TranslateText = TranslateLabels | TranslatePlaceholders | TranslateButtons | TranslateTexts | TranslateErrors | TranslateMenu | TranslateSelect | TranslateNotifications;
export type langType = "en" | "pl";

const langs = { en, pl };

export class LanguageDictionary {
  currLang: langType;

  constructor() {
    this.currLang = this._getLocale();
  }

  getDictionary = () => {
    return {
      dictionary: (path: string): string => {
        const sp = path.split(".");
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        let dictionary: any = langs[this.currLang];
        for(let i = 0; i < sp.length; i++) {
          if(dictionary[sp[i]]) {
            dictionary = dictionary[sp[i]];
          } else {
            dictionary = `#${path}`;
            break;
          }
        }
        return dictionary;
      },
      current: this.currLang,
    };
  }

  private _getLocale = (): langType => {
    const loc = location.pathname.match(/\/[a-z]+\//);
    if(loc) {
      const language = loc[0].split("/")[1];
      if(language === "en" || language === "pl") return language;
    }
    return "en";
  };
}
