const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    //name
    name :{
        type: String,
        required : [true,"Please mention the Project Name"],
        trim : true,
        maxlength :[300,"Please assign a project name under 300 characters"]
    },

    //type -> running, completed,future
    type:{
        type:String,
        required:[true,'Please choose a valid type: running, completed, or future'],
        enum : ["Running","Completed","Future"]
    },
    //start/end/expected end date
        startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },

    // Only for completed projects
    endDate: {
        type: Date,
        required: function() {
            return this.type === 'completed';
        },
        validate: {
            validator: function(value) {
                // Optional: end date should be after start date
                if (this.type === 'completed' && value) {
                    return value >= this.startDate;
                }
                return true;
            },
            message: 'End date must be after or equal to start date'
        }
    },

    // Only for running or future projects
    expectedEndDate: {
        type: Date,
        required: function() {
            return this.type !== 'completed';
        },
        validate: {
            validator: function(value) {
                if (this.type !== 'completed' && value) {
                    return value > this.startDate;   // expected end should be in future
                }
                return true;
            },
        message: 'Expected end date must be after start date'
            }
        },

        //Expected Budget -> visible only to the contractors and not supervisors.//handle in FE.
        expectedBudget: {
            type: Number,
            required: [true, 'Expected budget is required'],
            min: [0, 'Budget cannot be negative'],
            validate: {
                validator: function(value) {
                    return Number.isInteger(value) || value === undefined; // Allow only integers if you want
                },
                message: 'Expected budget must be a valid number'
            }
        },
        //Supervisor/(s) assigned
        Supervisors: {
        type :[String],
        required : [true,'Atleast one supervisor is required'],
        validate : {
            validator : function(value){
                return value && value.length>0;
            },
            message : "Atleast one  supervisor is required"
        }
    },
        //site location - schema is embedded.isske andrr adress hai aur googleMaps link hai, jinnke liyae bhi structure defined hai.
        siteLocation: {
            address: {
                type: String,
                required: [true, 'Site address or location description is required'],
                trim: true,
                maxlength: [500, 'Address cannot be more than 500 characters']
            }
        },

    }, 

{ timestamps: true });
    


