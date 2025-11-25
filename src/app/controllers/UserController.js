import User from '../models/User.js';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string()
        .required()
        .matches(
          /^[A-Za-zÀ-ÿ\s]+$/,
          'O nome deve conter apenas letras e espaços',
        ),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });

      const { name, email, password, admin } = request.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return response.status(400).json({ error: 'Usuário já existe' });
      }

      const password_hash = await bcrypt.hash(password, 8);
      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
      });

      return response.status(201).json({
        message: 'Usuário criado com sucesso',
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return response
          .status(400)
          .json({ error: 'Falha na validação', messages: err.errors });
      }

      console.error(err);
      return response.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export default new UserController();
