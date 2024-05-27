import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {type: String, required: true},
    number: {type: String, required: true},
    district: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    cep: {type: String, required: true}
}, {versionKey: false});


export default addressSchema;