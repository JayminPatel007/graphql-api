import { Schema, model} from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            require: true
        },
        userType: {
            type: String,
            default: "NORMAL"
        }
    }
);

module.exports = model('User', UserSchema);
