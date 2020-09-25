/*
leads
Controller
*/

const LeadModel = require("../models/lead.model");

// List of genres
exports.list = (req, res) => {
    LeadModel.list().then(result => {
        res.status(200).send(result);
    });
};

exports.createLeads = async (req, res) => {
    try {
        let createResult = await LeadModel.createLeads(req.body)
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

exports.createLead = async (req, res) => {
    try {
        let createResult = await LeadModel.createLead(req.body)
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


exports.listLeadById = async(req, res) => {
    try {
        let leadDetails=await LeadModel.findByLeadId(req.params)
        res.status(200).send(leadDetails);
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        })
    }
    
};
