import User from '../models/User.js';
import * as Yup from 'yup';

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
      password_hash: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });

      const { name, email, password_hash, admin } = request.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return response.status(400).json({ error: 'Usuário já existe' });
      }

      const user = await User.create({ name, email, password_hash, admin });

      return response.status(201).json({
        message: 'Usuário criado com sucesso',
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
