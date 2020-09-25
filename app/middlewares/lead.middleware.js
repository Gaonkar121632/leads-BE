const { valid } = require('joi');
var validator = require('joi');

let logger = require("../services/logger");
exports.validateLeads = async (req, res, next) => {
    logger.info("web | middleware | validateCoupon | validating request params");
    let location = validator.object().keys({
        type: validator.string(),
        coordinates: validator.string()
    })

    let schema = validator.object().keys({
        category: validator.string().required(),
        firstname: validator.string().required(),
        lastname: validator.string().required(),
        email: validator.string().email().required(),
        phone: validator.string().min(6).max(11).pattern(/^[0-9]+$/).required(),
        description: validator.string(),
        limit_response: validator.number(),
        location: validator.object().keys({
            type: validator.string(),
            coordinates: validator.array().ordered(
                validator.number().min(0).max(90).required(),
                validator.number().min(-180).max(180).required(),
            )
        })
    });

    let services = validator.array().items(schema)

    try {
        let { result, error } = await services.validate(req.body.data);
        console.log("-->", result);
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


exports.validateLead = async (req, res, next) => {
    logger.info("web | middleware | validateCoupon | validating request params");

    let schema = validator.object().keys({
        category: validator.string().required(),
        firstname: validator.string().required(),
        lastname: validator.string().required(),
        email: validator.string().email().required(),
        phone: validator.string().min(6).max(11).pattern(/^[0-9]+$/).required(),
        description: validator.string(),
        limit_response: validator.number(),
        location: validator.object().keys({
            type: validator.string(),
            coordinates: validator.array().ordered(
                validator.number().min(0).max(90).required(),
                validator.number().min(-180).max(180).required(),
            )
        })
    });

    // let services = validator.array().items(schema)

    try {
        let { result, error } = await schema.validate(req.body);
        console.log("-->", result);
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