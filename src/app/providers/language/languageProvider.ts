import { Injectable } from "@angular/core";
import { ILanguageKey } from "src/app/interfaces/language-key.interface";

@Injectable()
export class LanguageProvider {
    languages: ILanguageKey[] = [
        { key: "nl" , name: "Nederlands" },
        { key: "en" , name: "English" }
    ];

    getLanguages(): ILanguageKey[] {
        return this.languages;
    }

}
