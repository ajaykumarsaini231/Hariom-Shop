const Joi = require('joi');
const { post } = require('../routes/authrouter');

exports.signupSchema = Joi.object({
    name:Joi.string()
    .required(),

    
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net','in'] } }),
    mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
    'string.length': 'Mobile number must be exactly 10 digits',
    'string.pattern.base': 'Mobile number must contain only numbers'
  }),
    password: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
       
});



exports.signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net','in'] } }),

    password: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
        
});

exports.acceptCodeSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net'] } }),

        varificationCode: Joi.number()
        .required()
                
});

exports.passwordSchema = Joi.object({
    oldpassword: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),

    newpassword: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
        
});

exports.acceptforgotCodeSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net'] } }),

        varificationCode: Joi.number()
        .required(),

        newpassword: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
    
                
});



exports.postValidatort = Joi.object({
    title:Joi.string().min(6).max(600).required(),
    description:Joi.string().min(6).required(),
    userId:Joi.string().required()
    
})

exports.messageSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net', 'in'] } }),
    subject: Joi.string().min(3).max(200).required(),
    message: Joi.string().min(6).max(1000).required(),
});
