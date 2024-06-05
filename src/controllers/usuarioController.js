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
				return res.status(404).json({ message: "Usuário não encontrado." });
			}

			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	};

	static postLogin = async (req, res, next) => {
		const { email, password } = req.body;

		try {
			const login = await usuario.findOne({ email });

			if (!login) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			}

			const isValidPassword = await bcrypt.compare(password, login.password);

			if (!isValidPassword) {
				return res.status(401).json({ message: "Senha inválida" });
			}

			// const token = jwt.sign({ id: login._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
			// res.json({token});
			res.json({ message: "Logado!" });
		} catch (error) {
			next(error);
		}
	};

	static postCreateUsuario = async (req, res, next) => {
		const { nome, email, password, phone } = req.body;

		if (!nome || !email || !password || !phone) {
			return res
				.status(400)
				.json({ message: "Todos os dados devem ser enviados." });
		}

		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const novoUsuario = await usuario.create({
				...req.body,
				password: hashedPassword,
			});
			res.status(201).json({
				message: "Usuario cadastrado com sucesso",
			});
		} catch (error) {
			next(error);
		}
	};

	static putUsuarioById = async (req, res, next) => {
		try {
			const user = await usuario.findByIdAndUpdate(req.params.id, req.body);

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado" });
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
				return res.status(404).json({ message: "Usuário não encontrado" });
			}

			res.status(200).send("Usuario excluído com sucesso");
		} catch (error) {
			next(error);
		}
	};
}

export default UsuarioController;
