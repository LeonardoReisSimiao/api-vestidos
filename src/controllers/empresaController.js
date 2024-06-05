import { empresa } from "../models/Empresa.js";

class EmpresaController {
	static getListarEmpresas = async (req, res, next) => {
		try {
			const listaEmpresas = await empresa.find({});
			res.status(200).json(listaEmpresas);
		} catch (error) {
			next(error);
		}
	};

	static getEmpresaById = async (req, res, next) => {
		try {
			const empresa = await empresa.findById(req.params.id);

			if (!empresa) {
				return res.status(404).json({ message: "Empresa não encontrada" });
			}

			res.status(200).json(empresa);
		} catch (error) {
			next(error);
		}
	};

	static postCreateEmpresa = async (req, res, next) => {
		try {
			console.log(req.body.address);
			const novoEmpresa = await empresa.create(req.body);
			res.status(201).json({
				message: "Empresa cadastrado com sucesso",
				empresa: novoEmpresa,
			});
		} catch (error) {
			next(error);
		}
	};

	static putEmpresaById = async (req, res, next) => {
		try {
			const empresa = await empresa.findByIdAndUpdate(req.params.id, req.body);

			if (!empresa) {
				return res.status(404).json({ message: "Empresa não encontrada" });
			}

			res.status(200).send("Empresa atualizado com sucesso");
		} catch (error) {
			next(error);
		}
	};

	static deleteEmpresaById = async (req, res, next) => {
		try {
			const empresa = await empresa.findByIdAndDelete(req.params.id);

			if (!empresa) {
				return res.status(404).json({ message: "Empresa não encontrada" });
			}

			res.status(200).send("Empresa excluído com sucesso");
		} catch (error) {
			next(error);
		}
	};
}

export default EmpresaController;
