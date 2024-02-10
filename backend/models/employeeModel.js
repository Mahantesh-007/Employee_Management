const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    fieldOfEmployment:{
        type : String,
        required : true
    },
    skills:{
        type : Array,
    },

    about:{
        type:String,
        required:true
    },

    isAvailable:{
        type : Boolean,
        default:true
    }

},{timestamps:true})

mongoose.models = {}
const Employee = mongoose.model('Employee Details',employeeSchema)

module.exports = Employee