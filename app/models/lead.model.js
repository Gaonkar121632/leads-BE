/*!
 * Module dependencies
 */

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Lead schema
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


const LeadSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['Home Improvement', "Plumbing", "Carpentry"]
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


LeadSchema.set('toJSON', {
    virtuals: true
});


/**
 * Methods
 */


/**
 * Statics
 */


/**
 * Register
 */

const Lead = mongoose.model('Lead', LeadSchema);



exports.findByLeadId = async (lead) => {
    try {
        return await Lead.findOne({ _id: lead.leadId });
    } catch (error) {
        throw Error("Lead Id not exist")
    }
}

exports.createLeads = async (LeadData) => {
    try {
        return await Lead.insertMany(LeadData.data);
    } catch (error) {
        throw Error(error)
    }
};

exports.createLead = async (LeadData) => {
    try {
        let newLead=new Lead(LeadData)
        return await newLead.save();
    } catch (error) {
        throw Error(error)
    }
};


exports.list = async (perPage, page = 0) => {
    return await Lead.find()
};



