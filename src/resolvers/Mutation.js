import jwt from 'jsonwebtoken';

import User from '../models/User';
import Merchant from '../models/Merchant'

const Mutation = {
    async createUser(parents, args, ctx, info) {
        const users = await User.find({email: args.data.email});
        if (users.length > 0) {
            throw  new Error("This email is already taken");
        }
        const newUser = new User({
            name: args.data.name,
            email: args.data.email,
            password: args.data.password
        });
        const user = await newUser.save();
        return user._doc;
    },

    async createAdmin(parents, args, ctx, info) {
        const users = await User.find({email: args.data.email});
        if (users.length > 0) {
            throw  new Error("This email is already taken");
        }
        const newUser = new User({
            name: args.data.name,
            email: args.data.email,
            password: args.data.password,
            userType: "ADMIN"
        });
        const user = await newUser.save();
        return user._doc;
    },

    async createMarchent(parents, args, ctx, info) {
        const decodedData = jwt.verify(args.token, process.env.JWT_SECRET);
        const userid = decodedData.userId;
        const merchants = await Merchant.find({userId: userid});
        if (merchants.length > 0) {
            throw new Error("You have already applied to become merchant");
        } else{
            const newMerchant = new Merchant({
                userId: userid
            })
            const merchant = await newMerchant.save();
            return merchant
        }
    }
};

export { Mutation as default };
