import Joi from 'joi';
// const { post } = require('../routes/authrouter');

export const signupSchema = Joi.object({
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



export const signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net','in'] } }),

    password: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
        
});

export const acceptCodeSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({ tlds: { allow: ['com', 'net'] } }),

        varificationCode: Joi.number()
        .required()
                
});

export const passwordSchema = Joi.object({
    oldpassword: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),

    newpassword: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$"))
        
});

export const acceptforgotCodeSchema = Joi.object({
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



export const postValidatort = Joi.object({
    title:Joi.string().min(6).max(600).required(),
    description:Joi.string().min(6).required(),
    userId:Joi.string().required()
    
})


export const messageSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    
    // Updated Email: Removed strict TLD list to allow all valid emails (.org, .co.in, etc.)
    email: Joi.string()
        .min(6)
        .max(100)
        .required()
        .email(),

    // Phone: Optional & Flexible
    // Allows: "+91 9999999999", "9999999999", or just a number
    phone: Joi.string()
        .min(10)      // Minimum length for a valid number
        .max(20)      // Max length to accommodate country codes and spaces
        .pattern(/^[0-9+\- ]+$/) // Regex allows digits (0-9), plus (+), hyphen (-), and space
        .optional()
        .allow('', null), // Allows empty string or null so it doesn't error if skipped

    subject: Joi.string().min(3).max(200).required(),
    
    message: Joi.string().min(2).max(2000).required(),
});