import axiosClient from "../config/axiosInstance";
import { API_ENDPOINTS } from "../constants/api";



class AuthService {

    static async login(UserName, Password){
        const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, { UserName, Password })
        return response.data
    }

    static async generateOTP(Fullname, Email, UserName){
        const response = await axiosClient.post(API_ENDPOINTS.AUTH.GENERATE_OTP, { Fullname, Email, UserName })
        return response.data
    }

    static async validateOTP(Email, Otp){
        const response = await axiosClient.post(API_ENDPOINTS.AUTH.VALIDATE_OTP, { Email, Otp })
        return response.data
    }
}


export default AuthService