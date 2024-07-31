import jwt from "jsonwebtoken";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import bcrypt from "bcrypt";
import { usuario } from "../models/Users.js";
import ErroBase from "../erros/ErroBase.js";

export const login = async (req, res, next) => {
	const { user, password } = req.body;

	try {
		const login = await usuario.findOne(
			{
				$or: [{ email: user }, { cpf: user }],
			},

			"password role location_id", // Selecionar apenas os campos role e location_id
		);

		if (!login) {
			return next(new NaoEncontrado("Usuario não encontrado."));
		}

		const isValidPassword = await bcrypt.compare(password, login.password);

		if (!isValidPassword) {
			return res.status(401).json({ mensagem: "Senha inválida" });
		} else {
			const token = jwt.sign({ id: login._id }, process.env.JWT_SECRET, {
				expiresIn: "2h", // expiração está funcionando
			});
			return res.json({
				mensagem: "Logado!",
				token,
				role: login.role,
				location_id: login.location_id._id,
			});
		}
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.status(200).json({ auth: false, token: null });
	} catch (error) {
		return next(new ErroBase("Erro ao fazer logout.", 500));
	}
};
