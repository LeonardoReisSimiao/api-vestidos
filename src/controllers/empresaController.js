import NaoEncontrado from "../erros/NaoEncontrado.js";
import { empresa } from "../models/index.js";
import DadoExistente from "../erros/DadoExistente.js";
import SemConteudo from "../erros/SemConteudo.js";

class EmpresaController {
	static getListarEmpresas = async (req, res, next) => {
		try {
			const resultadoEmpresas = empresa.find({});

			req.resultado = resultadoEmpresas;

			next();
		} catch (error) {
			next(error);
		}
	};

	static getEmpresaById = async (req, res, next) => {
		try {
			const resultadoEmpresas = await empresa.findById(req.params.id);

			if (
				!resultadoEmpresas ||
				(Array.isArray(resultadoEmpresas) && resultadoEmpresas.length === 0)
			) {
				next(new NaoEncontrado("Empresa não encontrada"));
			} else {
				res.status(200).json(resultadoEmpresas);
			}
		} catch (error) {
			next(error);
		}
	};

	static postCreateEmpresa = async (req, res, next) => {
		try {
			const { email, cnpj } = req.body;

			const dadosExistentes = await empresa.findOne({
				$or: [{ cnpj }, { email }],
			});
			if (dadosExistentes) {
				next(new DadoExistente("E-mail ou CNPJ já está sendo utilizado"));
			} else {
				await empresa.create(req.body);

				res.status(201).send("Empresa cadastrada com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};

	static putEmpresaById = async (req, res, next) => {
		try {
			const empresaAtualizada = req.body;
			empresaAtualizada.updated_at = new Date();
			await empresa.findByIdAndUpdate(req.params.id, empresaAtualizada);

			if (!empresaAtualizada) {
				next(new NaoEncontrado("Empresa não encontrada."));
			} else {
				res.status(200).send("Empresa atualizada com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteEmpresaById = async (req, res, next) => {
		try {
			const empresaExcluida = await empresa.findByIdAndDelete(req.params.id);

			//fazer busca pelos vestidos da empresa e desativar eles
			//desativar a empresa por 1 mês e depois realizar a exlusão dos dados
			//fazer endpoint para reativação da empresa.
			//salvar os dados da empresa em

			if (!empresaExcluida) {
				next(new NaoEncontrado("Empresa não encontrada"));
			} else {
				return res.status(200).send("Empresa deletada com sucesso");
			}
		} catch (error) {
			next(error);
		}
	};
}

export default EmpresaController;
