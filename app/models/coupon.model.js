/*!
 * Module dependencies
 */

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Coupon schema
 */
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});


const CouponSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['Home Improvement',"Plumbing","Carpentry"]
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    limit_response: {
        type: String,
        required: true,
    },

    location: {
        type: pointSchema,
        required: true
    }
},
    {
        timestamps: true
    });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

CouponSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CouponSchema.set('toJSON', {
    virtuals: true
});

CouponSchema.findById = function (cb) {
    return this.model('Coupons').find({ id: this.id }, cb)
}

/**
 * Methods
 */


/**
 * Statics
 */


/**
 * Register
 */

const Coupon = mongoose.model('Coupon', CouponSchema);



exports.findByCouponId = (id) => {
    return Coupon.findOne({ CouponId: id })
}

exports.createCoupon = async (CouponData) => {
    try {
        return await Coupon.insertMany(CouponData.data);
    } catch (error) {
        throw Error(error)
    }
};

exports.isValidCoupon = async (code, date) => {
    return await Coupon.findOne({
        CouponCode: code,
        startDate: { $lte: date },
        endDate: { $gte: date }
    }).lean()
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Coupon.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Coupons) {
                if (err) {
                    reject(err)
                } else {
                    resolve(Coupons);
                }
            });
    })
};



