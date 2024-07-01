import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { usuario } from "../models/Users.js";
import bcrypt from "bcrypt";

class UsuarioController {
	static getListarUsuarios = async (req, res, next) => {
		try {
			const listaUsuarios = await usuario.find({});
			res.status(200).json(listaUsuarios);
		} catch (error) {
			next(error);
		}
	};

	static getUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findById(req.params.id);

			if (!user) {
				next(new NaoEncontrado("Usuario não encontrado."));
			} else {
				res.status(200).json(user);
			}
		} catch (error) {
			next(error);
		}
	};

	static postLogin = async (req, res, next) => {
		const { email, cpf, password } = req.body;

		try {
			const login = await usuario.findOne({ $or: [{ email }, { cpf }] });

			if (!login) {
				return next(new NaoEncontrado("Usuario não encontrado."));
			}

			const isValidPassword = await bcrypt.compare(password, login.password);

			if (!isValidPassword) {
				return res.status(401).json({ mensagem: "Senha inválida" });
			} else {
				//const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				//	expiresIn: "1d",
				//});
				return res.json({ mensagem: "Logado!" }); //,token });
			}
		} catch (error) {
			next(error);
		}
	};

	static postCreateUsuario = async (req, res, next) => {
		const { password, passwordConfirm } = req.body;

		if (password !== passwordConfirm) {
			return next(new RequisicaoIncorreta("Senhas não coincidem."));
		}
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			await usuario.create({
				...req.body,
				password: hashedPassword,
			});
			res.status(201).json({
				mensagem: "Usuario cadastrado com sucesso",
			});
		} catch (error) {
			next(error);
		}
	};

	static putUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findByIdAndUpdate(req.params.id, req.body);

			if (!user) {
				next(new NaoEncontrado("Usuário não encontrado."));
			}

			res.status(200).send("Usuario atualizado com sucesso");
		} catch (error) {
			next(error);
		}
	};

	static deleteUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findByIdAndDelete(req.params.id);

			if (!user) {
				next(new NaoEncontrado("Usuário não encontrado."));
			}

			res.status(200).send("Usuario excluído com sucesso");
		} catch (error) {
			next(error);
		}
	};
}

export default UsuarioController;
