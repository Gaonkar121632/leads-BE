var validator = require('joi');

let logger = require("../services/logger");
exports.validateCoupon = async (req, res, next) => {
    logger.info("web | middleware | validateCoupon | validating request params");
    let schema = validator.object().keys({
        firstname: validator.string().required(),
        lastname: validator.string().required(),
        email: validator.string().email().required(),
        phone: validator.string().required(),
        description: validator.string(),
        limit_response: validator.number(),
        
    });

    let services = Joi.array().items(schema)

    try {
        let { result, error } = await services.validate(req.body);
        console.log(result);
        if (error) {
            throw error
        }
        next();
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

