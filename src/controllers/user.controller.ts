import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../utils/http-status';
import { UserService } from '../services/user.service';


export class UserController extends HttpStatus {
    public userService: UserService = new UserService();
    
    /** GET API: get all users */
    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get all users
            const users = await this.userService.getAllUsers();
            if (!users.length) return this.notFound(res, 'Users not found.', users);

            this.success(res, 'Users get successfully.', users);
        } catch (err) {
            if (err instanceof Error) {
                this.badRequest(res, err.message);
                next(err);
            }
        }
    };
}