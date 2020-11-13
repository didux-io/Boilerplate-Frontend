import { Injectable } from "@angular/core";

@Injectable()
export class LanguageProvider {
    languages = [
        { key: "nl" , name: "Nederlands" },
        { key: "en" , name: "English" }
    ];

    constructor() {
        //do nothing
    }

    getLanguages() {
        return this.languages;
    }

}
