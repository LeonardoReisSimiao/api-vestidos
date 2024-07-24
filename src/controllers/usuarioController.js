import DadoExistente from "../erros/DadoExistente.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { usuario } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UsuarioController {
	static getListarUsuarios = async (req, res, next) => {
		try {
			const resultadoUsuarios = usuario.find({});

			req.resultado = resultadoUsuarios;

			next();
		} catch (error) {
			next(error);
		}
	};

	static getUsuarioById = async (req, res, next) => {
		try {
			const resultadoUsuarios = await usuario.findById(req.params.id);

			if (
				!resultadoUsuarios ||
				(Array.isArray(resultadoUsuarios) && resultadoUsuarios.length === 0)
			) {
				next(new NaoEncontrado("Usuario não encontrado."));
			} else {
				res.status(200).json(resultadoUsuarios);
			}
		} catch (error) {
			next(error);
		}
	};

	static postLogin = async (req, res, next) => {
		const { user, password } = req.body;

		try {
			const login = await usuario.findOne({
				$or: [{ email: user }, { cpf: user }],
			});

			if (!login) {
				return next(new NaoEncontrado("Usuario não encontrado."));
			}

			const isValidPassword = await bcrypt.compare(password, login.password);

			if (!isValidPassword) {
				return res.status(401).json({ mensagem: "Senha inválida" });
			} else {
				const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
					expiresIn: "2h",
				});
				return res.json({ mensagem: "Logado!", token });
			}
		} catch (error) {
			next(error);
		}
	};

	static postCreateUsuario = async (req, res, next) => {
		try {
			const { cpf, email, password, passwordConfirm } = req.body;

			if (password !== passwordConfirm) {
				return next(new RequisicaoIncorreta("Senhas não coincidem."));
			}
			const dadosExistentes = await usuario.findOne({
				$or: [{ cpf }, { email }],
			});
			if (dadosExistentes) {
				next(new DadoExistente("E-mail ou CPF já está sendo utilizado."));
			} else {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				await usuario.create({
					...req.body,
					password: hashedPassword,
				});
				res.status(201).send("Usuario cadastrado com sucesso.");
			}
		} catch (error) {
			next(error);
		}
	};

	static putUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findByIdAndUpdate(req.params.id, req.body);

			if (!user) {
				next(new NaoEncontrado("Usuário não encontrado."));
			} else {
				res.status(200).send("Usuário atualizado com sucesso.");
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findByIdAndDelete(req.params.id);

			if (!user) {
				next(new NaoEncontrado("Usuário não encontrado."));
			} else {
				res.status(200).send("Usuário excluído com sucesso.");
			}
		} catch (error) {
			next(error);
		}
	};
}

export default UsuarioController;
