import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IConfig } from "../../interfaces/config.interface";
import { take } from "rxjs/operators";

@Injectable()
export class ConfigProvider {
    config: IConfig;

    constructor(private http: HttpClient) {

    }

    async getConfig(): Promise<IConfig> {
        try {
            const config = await this.http.get<IConfig>("/assets/config/config.json").pipe(take(1)).toPromise();
            this.config = config;
            return config;
        } catch (error) {
            console.error("Error in config.json!:", error);
            return null;
        }
    }
}
