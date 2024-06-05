import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
	{
		street: {
			type: String,
			required: [true, "A rua é obrigatório"],
		},
		number: {
			type: String,
			required: [true, "O número da residência/empresa é obrigatório"],
		},
		complemento: {
			type: String,
		},
		district: {
			type: String,
			required: [true, "O bairro é obrigatório"],
		},
		city: {
			type: String,
			required: [true, "A Cidade é obrigatório"],
		},
		state: {
			type: String,
			required: [true, "O Estado é obrigatório"],
		},
		cep: {
			type: String,
			required: [true, "O CEP é obrigatório"],
		},
	},
	{ versionKey: false },
);

export default addressSchema;
