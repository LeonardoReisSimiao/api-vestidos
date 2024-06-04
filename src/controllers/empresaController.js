import { empresa } from "../models/Empresa.js";


class EmpresaController {
  static getListarEmpresas = async (req, res) => {
    try {
      const listaEmpresas = await empresa.find({});
      res.status(200).json(listaEmpresas);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Empresas` });
    }
  }

  static getEmpresaById = async (req, res) => {
    try {
      const empresa = await empresa.findById(req.params.id);

      if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }

      res.status(200).json(empresa);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Empresa` });
    }
  }

  static postCreateEmpresa = async (req, res) => {
    try {
      console.log(req.body.address);
      const novoEmpresa = await empresa.create(req.body);
      res.status(201).json({
        message: "Empresa cadastrado com sucesso",
        empresa: novoEmpresa,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar Empresa` });
    }
  }

  static putEmpresaById = async (req, res) => {
    try {
      const empresa = await empresa.findByIdAndUpdate(req.params.id, req.body);

      if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }

      res.status(200).send("Empresa atualizado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar Empresa` });
    }
  }

  static deleteEmpresaById = async (req, res) => {
    try {
      const empresa = await empresa.findByIdAndDelete(req.params.id);

      if (!empresa) {
        return res.status(404).json({ message: 'Empresa não encontrada' });
      }

      res.status(200).send("Empresa excluído com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir Empresa` });
    }
  }

}

export default EmpresaController;
