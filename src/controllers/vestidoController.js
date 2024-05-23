import vestido from "../models/Vestido.js";

class VestidoController {
  static async getListarVestidos(req, res) {
    try {
      const listaVestidos = await vestido.find({});
      res.status(200).json(listaVestidos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar vestidos` });
    }
  }

  static async getVestidoById(req, res) {
    try {
      const id = await vestido.findById(req.params.id);
      res.status(200).json(id);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar vestido` });
    }
  }

  static async postCreateVestido(req, res) {
    try {
      const novoVestido = await vestido.create(req.body);
      res.status(201).json({
        message: "Vestido cadastrado com sucesso",
        vestido: novoVestido,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar vestido` });
    }
  }

  static async putVestidoById(req, res) {
    try {
        await vestido.findByIdAndUpdate(req.params.id, req.body);      
        res.status(200).send("Vestido atualizado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar vestido` });
    }
  }

  static async deleteVestidoById(req, res) {
    try {
        await vestido.findByIdAndDelete(req.params.id);      
        res.status(200).send("Vestido excluído com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir vestido` });
    }
  }

}

export default VestidoController;
