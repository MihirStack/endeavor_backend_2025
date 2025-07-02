import { hashAsync } from '../../utils/crypto-helper';
import { User } from '../user.model';

export const userHooks = {
    /** Hook to validate that a user does not already exist before creating a new one. */
    beforeCreate: async (user: User) => {
        const existingUser = await User.findOne({ where: { email: user.email } });
        if (existingUser) throw new Error('Email already exists.');
    },

    /** Hook to hash password before saving a new user or updating an existing one */
    hashPassword: async (user: User) => {
        // Check if the password field is present and has been modified (or is new)
        if (user.password && user.changed('password')) {
            user.password = await hashAsync(user.password);
        }
    },
};
