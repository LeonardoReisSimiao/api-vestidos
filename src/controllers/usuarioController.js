import { usuario } from "../models/Users.js";


class UsuarioController {
  static async getListarUsuarios(req, res) {
    try {
      const listaUsuarios = await usuario.find({});
      res.status(200).json(listaUsuarios);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Usuarios` });
    }
  }

  static async getUsuarioById(req, res) {
    try {
      const id = await usuario.findById(req.params.id);
      res.status(200).json(id);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Usuario` });
    }
  }

  static async postCreateUsuario(req, res) {
    try {
      console.log(req.body.address);
      const novoUsuario = await usuario.create(req.body);
      res.status(201).json({
        message: "Usuario cadastrado com sucesso",
        usuario: novoUsuario,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar Usuario` });
    }
  }

  static async putUsuarioById(req, res) {
    try {
      await usuario.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Usuario atualizado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar Usuario` });
    }
  }

  static async deleteUsuarioById(req, res) {
    try {
      await usuario.findByIdAndDelete(req.params.id);
      res.status(200).send("Usuario excluído com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir Usuario` });
    }
  }

}

export default UsuarioController;
