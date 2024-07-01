import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import addressSchema from "./Address.js";

const usuarioSchema = new mongoose.Schema(
	{
		id: { type: ObjectId },
		nome: {
			type: String,
			required: [true, "O nome do(a) usuário(a) é obrigatório"],
		},
		email: {
			type: String,
			required: [true, "O e-mail do(a) usuário(a) é obrigatório"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "A senha do(a) usuário(a) é obrigatório"],
		},
		cpf: {
			type: String,
			required: [true, "O CPF do(a) usuário(a) é obrigatório"],
			unique: true,
			immutable: true,
		},
		phone: {
			type: String,
			required: [true, "O telefone do(a) usuário(a) é obrigatório"],
		},
		address: addressSchema,
		role: {
			type: String,
			required: [true, "O perfil do(a) usuário(a) é obrigatório"],
		},
		created_at: { type: Date, default: Date.now, immutable: true },
		updated_at: {
			type: Date,
			default: Date.now,
			required: [true, "A data de atualização do(a) usuário(a) é obrigatório"],
		},
	},
	{ versionKey: false },
);

const usuario = mongoose.model("users", usuarioSchema);

export { usuario, usuarioSchema };
