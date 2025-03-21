import User from "../models/User";
import bcrypt from "bcrypt";
import OTP from "../models/OTP";
import { sendMail } from "../utils/common";
import EmailTemplates from "../utils/emailTemplates";
import { generate } from "otp-generator";

export default class AuthService {
    static async loginUser(credentials: any) {
        try {
            let user = await User.findOne({ email: credentials.email }).exec();
            if(user) {
              if (!user.is_verified)
                throw new Error("Your email is not verified yet.");
              let auth = bcrypt.compareSync(credentials.password, user.password);
              if(auth) {
                  return user;
              }
            }
            throw new Error("User does not exist.");          
        } catch (error) {
            console.error(new Date(), error);
            throw error;
        }
    }

    static async resendOTPMail(filter: any) {
        try {
            let otp = await OTP.findOne(filter).exec();
            if (otp && this.otpNotExpired(otp.createdOn.toISOString()))
                return await this.sendOTPMail(otp.otp, otp.email);
            else return {
                err: "No OTP exists against this email."
            };
        } catch (e) {
            throw new Error(e);
        }
      }
      
    static async sendOTPMail(code: any, email: string) {
        return new Promise((resolve) => {
            let emailTemplate = EmailTemplates.OTP(email, code);
            let subject = emailTemplate.subject;
            let text = emailTemplate.text;
            let html = emailTemplate.html;
            resolve(sendMail(email, subject, text, "OTP", html));
        });
    };      

    static async sendOTP(email: string) {
        try {
          const user = await User.findOne({ email, deleted: false });
      
          if (!user) {
              return {
                  success: false,
                  message: "User not found",
                  record: null,
              };
          }
      
          const code = generate(6, {
              digits: true,
              upperCaseAlphabets: false,
              lowerCaseAlphabets: false,
              specialChars: false,
          });;
      
          const update = {
              email: email,
              otp: code,
              createdOn: Date.now(),
          };
      
          const existingOTP = await OTP.findOne({ email }).exec();
      
            if (existingOTP && this.otpNotExpired(existingOTP.createdOn.toISOString())) {
                return await this.resendOTPMail({ email });
            } else {
                await OTP.deleteOne({ email }); // Delete any existing OTP record
                let newOTP = await OTP.create(update);
                let newOTPObject = {
                    createdOn: newOTP.createdOn,
                    email: newOTP.email
                };
                if (newOTPObject) {
                    await this.sendOTPMail(code, email);
                    return {
                        success: true,
                        message: "OTP sent successfully",
                        record: newOTPObject
                    };
                } else {
                    return {
                        success: false,
                        message: "Failed to send OTP",
                        record: null
                    };
                }
            }
        } catch (error) {
          throw error;
        }
    };
      
      static async verifyOTP(obj: any) {
        try {
            const { otp, email } = obj;
        
            const otpMatched = await OTP.findOne({ otp }, { otp: 1, email: 1, createdOn: 1 }, { sort: { createdOn: -1 } });
        
            if (otpMatched) {
              if (email.toLowerCase() === otpMatched.email.toLowerCase()) {
                if (this.otpNotExpired(otpMatched.createdOn.toISOString())) {
                  const record = await OTP.deleteOne({ email: otpMatched.email }).exec();
                  return {
                    success: true,
                    message: "OTP verified.",
                    record,
                  };
                } else {
                  const record = await OTP.deleteOne({ email: otpMatched.email }).exec();
                  return {
                    success: false,
                    message: "OTP has expired.",
                    record,
                  };
                }
              } else {
                return {
                  success: false,
                  message: "Incorrect email.",
                  record: null,
                };
              }
            } else {
              return {
                success: false,
                message: "Incorrect OTP.",
                record: null,
              };
            }
        } catch (error) {
            return {
              success: false,
              message: "Error during OTP verification.",
              record: null,
              error: error.message,
            };
        }
    };

    static async sendActivationOTP(email: string) {
      try {
        if (email && /^[^@]+@[^@]+\.[^@]+$/.test(email)) {
          let user = await User.findOne({ email }).exec();
          if (user)
            throw new Error("This email is already registered with us.")
          return this.sendOTP(email);
        }
        else
          throw new Error("Please provide a valid email address.");
      } catch (error) {
        console.error(new Date(), error);
        return {
          success: false,
          message: "",
          record: null
        };
      }
    };
    

    static async otpNotExpired(time: string) {
        return (Date.now() - new Date(time).getTime()) / 60000 <= 3;
    }
};