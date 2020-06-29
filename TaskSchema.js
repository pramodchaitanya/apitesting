const joi=require('joi');
const taskschema={
    name: joi.string().required(),
    age: joi.number().required()
};


exports.validatetask=(data)=>{
    return  joi.validate(data,taskschema);
}
