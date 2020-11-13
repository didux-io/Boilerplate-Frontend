import { IUser } from "src/app/interfaces/user.interface";

export class UpdateUserAdminAction {
    static readonly type = "[User] UpdateUserAdmin";

    constructor(public user: IUser) {}
}
