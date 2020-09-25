/*
coupon
Controller
*/

const CouponModel = require("../models/coupon.model");

// List of genres
exports.list = (req, res) => {
    CouponModel.list().then(result => {
        res.status(200).send(result);
    });
};

exports.createCoupon = async (req, res) => {
    try {
        let createResult = await CouponModel.createCoupon(req.body)
        res.status(201).send({
            success: true,
            payload: createResult
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
};

exports.validate = async (req, res) => {

    try {
        let coupon = req.params.coupon || '';
        let date = new Date()
        let result = await CouponModel.isValidCoupon(coupon, date)
        console.log(result);
        res.status(200).send({
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }

};

exports.applyCoupon = async (req, res) => {

    try {
        let coupon = req.query.coupon || '';
        let amount = (Number(req.query.amount)>0)? Number(req.query.amount) : 0
        let date = new Date()


        let result = await CouponModel.isValidCoupon(coupon, date)
        console.log(result);
        if (result) {
            if (amount >= result.minAmount) {

                let payload = {};
                switch (result.type) {
                    case "flat":
                        payload["amountToDeduct"] = (amount > result.discountAmount) ? result.discountAmount : amount;
                        break;
                    case "percent":
                        let totalDiscount = amount * (result.discountAmount / 100)
                        payload["amountToDeduct"] = (totalDiscount > result.maxDiscount) ? result.maxDiscount : totalDiscount;
                        break
                    default:
                        throw Error("somthing went wrong")
                        break;
                }
                console.log(result);
                res.status(200).send({
                    success: true,
                    payload: payload
                });
            } else {
                throw Error(`Need ${result.minAmount - amount} amount more to enable this coupon`)
            }
        } else {
            throw Error("Invalid Coupon!!")
        }

    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }

};
