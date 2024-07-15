import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
	validator: (valor) => {
		// Verifica se 'valor' não é null, undefined e é uma string não vazia após trim
		return valor != null && typeof valor === "string" && valor.trim() !== "";
	},
	message: ({ path }) => `O campo ${path} foi fornecido em branco`,
});
