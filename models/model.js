const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    FullName: {
        required: true,
        type: String,
        validate: {
            validator: function (v) {
                //regex product code must have XXXX-XXXX-XXXX format
                //return true to pass the validation
                //return false to fail the validation
                return (/(^[a-zA-Z\s]+$)/.test(v));
            },
            //message to return if validation fails
            message: props => `${props.value} is not a valid code format!`
        },
    },
    Email: {
        required: true,
        pattern: "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$",
        description: "Please give valid email",
        type: String,
        validate: {
            validator: function (v) {
                //regex product code must have XXXX-XXXX-XXXX format
                //return true to pass the validation
                //return false to fail the validation
                return (/(^[a-zA-Z0-9_.]+)@[a-z]+\.com/.test(v));
            },
            //message to return if validation fails
            message: props => `${props.value} is not a valid code format!`
        },
    },
    Password: {
        required: true,
        type: String,
        validate: {
            validator: function (v) {
                //regex product code must have XXXX-XXXX-XXXX format
                //return true to pass the validation
                //return false to fail the validation
                return (/(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/.test(v));
            },
            //message to return if validation fails
            message: `Please enter 1.) at least 1 upper case character 2.) at least 1 lower
            case character 3.) at least 1 numerical character 4.) at least 1 special character.`
        },
    }
})

module.exports = mongoose.model('Data', dataSchema)