import { vestido } from "../models/Vestido.js";
import { empresa } from "../models/Empresa.js";
import { usuario } from "../models/Users.js";
import aluguel from "../models/Rental.js";


class AluguelController {
  static getListarAluguel = async (req, res) => {
    try {
      const rentals = await aluguel.find().populate('user_id').populate('vestido_id').populate('location_id');
      res.status(200).json(rentals);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar reservas` });
    }
  }

  static getAluguelById = async (req, res) => {
    try {
      const rental = await aluguel.findById(req.params.id).populate('user_id').populate('vestido_id').populate('location_id');

      if (!rental) {
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }

      res.status(200).json(rental);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao buscar reserva` });
    }
  }

  static postCreateAluguel = async (req, res) => {
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

  static putAluguelById = async (req, res) => {
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

  static deleteAluguelById = async (req, res) => {
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
