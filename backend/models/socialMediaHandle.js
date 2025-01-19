import mongoose from "mongoose";
import Joi from 'joi';

const ImageSchema = new mongoose.Schema ({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload','/upload/w_200');
});

const socialMediaHandel = new mongoose.Schema({
    username: String,
    images:[ImageSchema],
    SocialMediaHandel: String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


const SocialMediaHandeler = new mongoose.model('SocialMediaHandel', socialMediaHandel);

function forValidation(SocialMediaHandel) {
    const schema = {
        username: Joi.string().required(),
        SocialMediaHandel: Joi.string().required(),
        author: Joi.required(),
        images:Joi.required()
    };
    return Joi.object(schema).validate(SocialMediaHandel);
}

export{SocialMediaHandeler , forValidation};