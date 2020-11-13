export class contactAction {
    static readonly type = "[User] contactAction";

    constructor(public name: string, public email: string, public message: string) {}
}
