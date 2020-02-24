import { Schema, model, Types } from 'mongoose'

const MerchantSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'PENDING'
    }
});

module.exports = model('Merchant', MerchantSchema);
