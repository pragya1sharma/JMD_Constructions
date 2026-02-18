const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type :String,
        required : [true, 'Please provide a name'],
        trim : true,
        maxLength : [50, 'Name cannot exceed 50 characters']
    },

    //V2
    // email: {
    //     type: String,
    //     required: [true, 'Please provide an email'],
    //     unique: true,
    //     lowercase: true,
    //     match : [
    //         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/     //regex for email validation : no need to cram-only know a little
    //         , 'Please provide a valid email address'
    //     ]
    // },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    role : {
        type :String,
        enum : ['Contractor','Supervisor'],
        required : [true, 'Please specify user role'],

    },
    phone : {
        type : String,
        required : [true, 'Please provide a phone number'],
        match : [
            /^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number'
        ]
    },

    //No need of profile Image for Now, will do this for V2.
    // profileImage : String,
    // isActive : {
    //     type : Boolean,
    //     default : true
    // },
    lastLogin :Date,
    resetPasswordToken : String,
    resetPasswordExpire : Date
}, 

{ 
    timestamps : true     
})

module.exports = mongoose.model('User', UserSchema);