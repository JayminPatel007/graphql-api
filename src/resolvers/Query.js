import jwt from 'jsonwebtoken';

import User from '../models/User'
import Merchant from "../models/Merchant";

const Query = {
    async login(parents, args, ctx, info) {
        const user = await User.findOne({email: args.data.email});
        if (user.length === 0) {
            throw new Error("User Credentials do not match");
        }
        if (args.data.password !== user.password) {
            throw new Error("User Credentials do not match");
        }else{
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            return {
                userId: user._id,
                token: token
            }
        }
    },

    async getMerchant(parents, args, ctx, info) {
        const decodedData = jwt.verify(args.token, process.env.JWT_SECRET);
        const userid = decodedData.userId;
        const merchant = await Merchant.findOne({userId: userid});
        if (merchant.length === 0) {
            throw new Error("You are not Merchant!!");
        }else{
            console.log(merchant);
            return merchant;
        }
    }
};

export { Query as default }
