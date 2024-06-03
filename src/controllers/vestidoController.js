import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";


class VestidoController {
  static async getListarVestidos(req, res) {
    try {
      const vestidos = await vestido.find().populate('location_id');

      // Converte o campo location_id de Buffer para string hexadecimal para cada vestido
      const response = vestidos.map(vestido => {
        let locationIdString = '';
        if (vestido.location_id && vestido.location_id.buffer && vestido.location_id.buffer.data) {
          locationIdString = Buffer.from(vestido.location_id.buffer.data).toString('hex');
        }

        return {
          ...vestido._doc,
          location_id: {
            ...vestido.location_id._doc,
            buffer: locationIdString
          }
        };
      });

      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar vestidos` });
    }
  }


  static async getBuscarVestidos (req, res){
    const busca = req.query.vestido;
    try {
      const vestidos = await vestido.find({
        $or:[
          { nome: new RegExp(busca, 'i') },
          { descricao: new RegExp(busca, 'i') },
          { cor: new RegExp(busca, 'i') },
          { tamanho: new RegExp(busca, 'i') },
          { tipoEvento: new RegExp(busca, 'i') },
          { modelo: new RegExp(busca, 'i') },
          { comprimento: new RegExp(busca, 'i') },          
          { tecido: new RegExp(busca, 'i') }
        ]
      }).populate('location_id');

       // Converte o campo location_id de Buffer para string hexadecimal para cada vestido
       const response = vestidos.map(vestido => {
        let locationIdString = '';
        if (vestido.location_id && vestido.location_id.buffer && vestido.location_id.buffer.data) {
          locationIdString = Buffer.from(vestido.location_id.buffer.data).toString('hex');
        }

        return {
          ...vestido._doc,
          location_id: {
            ...vestido.location_id._doc,
            buffer: locationIdString
          }
        };
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao buscar vestidos` });
    }
  }

  static async getVestidoById(req, res) {
    try {
      const vestidoId = await vestido.findById(req.params.id).populate('location_id');

      if (!vestidoId) {
        return res.status(404).send('Vestido não encontrado' );
      }

      let locationIdString = '';
      if (vestidoId.location_id && vestidoId.location_id.buffer && vestidoId.location_id.buffer.data) {
        locationIdString = Buffer.from(vestidoId.location_id.buffer.data).toString('hex');
      }

      const response = {
        ...vestidoId._doc,
        location_id: {
          ...vestidoId.location_id._doc,
          buffer: locationIdString
        }
      };

      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar vestido` });
    }
  }

  static async postCreateVestido(req, res) {
    const novoVestido = req.body;
    try {
      const empresaEncontrada = await empresa.findById(novoVestido.location_id);
      const vestidoCompleto = { ...novoVestido, location_id: { ...empresaEncontrada } };
      const vestidoCriado = await vestido.create(vestidoCompleto);
      res.status(201).json({
        message: "Vestido cadastrado com sucesso",
        vestido: vestidoCriado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cadastrar vestido` });
    }
  }

  static async putVestidoById(req, res) {
    try {
      const vestidoId = await vestido.findByIdAndUpdate(req.params.id, req.body);

      if (!vestidoId) {
        return res.status(404).send('Vestido não encontrado' );
      }
      else {
        res.status(200).send("Vestido atualizado com sucesso");
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar vestido` });
    }
  }

  static async deleteVestidoById(req, res) {
    try {
      const vestidoId = await vestido.findByIdAndDelete(req.params.id);
      if (!vestidoId) {
        return res.status(404).send('Vestido não encontrado' );
      }
      else {
        res.status(200).send("Vestido excluído com sucesso");
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao excluir vestido` });
    }
  }

}

export default VestidoController;
