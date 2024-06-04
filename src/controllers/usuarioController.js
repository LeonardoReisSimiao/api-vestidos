import { usuario } from "../models/Users.js";
import bcrypt from "bcrypt";


class UsuarioController {
  static  getListarUsuarios = async (req, res) => {
    try {
      const listaUsuarios = await usuario.find({});
      res.status(200).json(listaUsuarios);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Usuarios` });
    }
  }

  static  getUsuarioById = async (req, res) =>  {
    try {
      const usuario = await usuario.findById(req.params.id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar Usuario` });
    }
  }

  static  postLogin = async (req, res) =>  {
    const { email, password } = req.body;

    try {
      const login = await usuario.findOne({ email });

      if (!login) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const isValidPassword = await bcrypt.compare(password, login.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Senha inválida' });
      }

      // const token = jwt.sign({ id: login._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      // res.json({token});
      res.json({ message: 'Logado!' });


    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao fazer login` });
    }
  };

  static  postCreateUsuario = async (req, res) =>  {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const novoUsuario = await usuario.create({ ...req.body, password: hashedPassword });
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

  static  putUsuarioById = async (req, res) =>  {
    try {
      const usuario = await usuario.findByIdAndUpdate(req.params.id, req.body);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).send("Usuario atualizado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar Usuario` });
    }
  }

  static  deleteUsuarioById = async (req, res) =>  {
    try {
      const usuario = await usuario.findByIdAndDelete(req.params.id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      res.status(200).send("Usuario excluído com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir Usuario` });
    }
  }

}

export default UsuarioController;
