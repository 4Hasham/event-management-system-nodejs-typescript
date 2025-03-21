import User from "../models/User";
import AuthService from "../services/auth.service";

export default class UserService {
    static async getAllUsersService() {
        try {
            return await User.find({}, { password: -1 }, { sort: { created_date: -1 } }).exec();
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }

    static async getUserById(id: string) {
        try {
            return await User.findById(id).exec();
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }

    static async createUser(user: any) {
        try {
            let verification = await AuthService.verifyOTP({ otp: user.otp, email: user.email });
            if (verification.success)
                return await User.create(user);
            else
                throw new Error('Invalid OTP.');
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }
};
