import { User } from '../models/user.model';

export class UserService {

    /** Get all users */
    public getAllUsers = async () => {
        return await User.findAll();
    };
}