import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";
import { usuario } from "../models/Users.js";
import aluguel from "../models/Rental.js";


class AluguelController {
  static async getListarAluguel(req, res) {
    try {
      const rentals = await aluguel.find().populate('user_id').populate('vestido_id').populate('location_id');

      /* Converte o campo location_id de Buffer para string hexadecimal para cada vestido
      const response = rentals.map(rental => {
        let locationIdString = '';
        let userIdString = '';
        let vestidoIdString = '';
        if (rental.location_id && rental.location_id.buffer && rental.location_id.buffer.data) {
          locationIdString = Buffer.from(rental.location_id.buffer.data).toString('hex');
        }
        if (rental.user_id && rental.user_id.buffer && rental.user_id.buffer.data) {
          userIdString = Buffer.from(rental.user_id.buffer.data).toString('hex');
        }
        if (rental.vestido_id && rental.vestido_id.buffer && rental.vestido_id.buffer.data) {
          vestidoIdString = Buffer.from(rental.vestido_id.buffer.data).toString('hex');
        }

        return {
          ...rental._doc,
          user_id: {
            ...rental.user_id._doc,
            buffer: userIdString
          },
          vestido_id: {
            ...rental.vestido_id._doc,
            buffer: vestidoIdString
          },
          location_id: {
            ...rental.location_id._doc,
            buffer: locationIdString
          }
        };
      });*/

      res.status(200).json(rentals);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar reservas` });
    }
  }

  static async getAluguelById(req, res) {
    try {
      const rental = await aluguel.findById(req.params.id).populate('user_id').populate('vestido_id').populate('location_id');

      if (!rental) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      let locationIdString = '';
      let userIdString = '';
      let vestidoIdString = '';
      if (rental.location_id && rental.location_id.buffer && rental.location_id.buffer.data) {
        locationIdString = Buffer.from(rental.location_id.buffer.data).toString('hex');
      }
      if (rental.user_id && rental.user_id.buffer && rental.user_id.buffer.data) {
        userIdString = Buffer.from(rental.user_id.buffer.data).toString('hex');
      }
      if (rental.vestido_id && rental.vestido_id.buffer && rental.vestido_id.buffer.data) {
        vestidoIdString = Buffer.from(rental.vestido_id.buffer.data).toString('hex');
      }


      const response = {
        ...rental._doc,
        user_id: {
          ...rental.user_id._doc,
          buffer: userIdString
        },
        vestido_id: {
          ...rental.vestido_id._doc,
          buffer: vestidoIdString
        },
        location_id: {
          ...rental.location_id._doc,
          buffer: locationIdString
        }
      };

      res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar reserva` });
    }
  }

  static async postCreateAluguel(req, res) {
    const novoAluguel = req.body;
    try {
      const userEncontrado = await usuario.findById(novoAluguel.user_id);
      const vestidoEncontrado = await vestido.findById(novoAluguel.vestido_id);
      const empresaEncontrada = await empresa.findById(novoAluguel.location_id);
      const aluguelCompleto = { ...novoAluguel, user_id: { ...userEncontrado }, vestido_id: { ...vestidoEncontrado }, location_id: { ...empresaEncontrada } };
      const aluguelCriado = await aluguel.create(aluguelCompleto);
      res.status(201).json({
        message: "Reserva realizada com sucesso",
        reserva: aluguelCriado,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao realizar reserva` });
    }
  }

  static async putAluguelById(req, res) {
    try {
      const rental = await aluguel.findByIdAndUpdate(req.params.id, req.body);

      if (!rental) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      res.status(200).send("reserva atualizada com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao atualizar reserva` });
    }
  }

  static async deleteAluguelById(req, res) {
    try {
      const rental = await aluguel.findByIdAndDelete(req.params.id);

      if (!rental) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      res.status(200).send("Aluguel cancelado com sucesso");
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao cancelar aluguel` });
    }
  }

}

export default AluguelController;
