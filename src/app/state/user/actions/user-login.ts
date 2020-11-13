export class UserLoginAction {
    static readonly type = "[User] UserLoginAction";

    constructor(public email: string, public password: string) {}
}
