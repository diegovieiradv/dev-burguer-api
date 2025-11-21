import * as Yup from "yup";
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    const isValid = await schema.isValid(request.body, { strict: true });

    if (!isValid) {
      return response.status(400).json({ error: "Falha na validação" });
    }

    const { email, password } = request.body;
    const existingUser = await User.findOne({ where: { email } });

    // Se não existe, retorna erro
    if (!existingUser) {
      return response.status(400).json({ error: "Usuário não existe" });
    }

    // Verifica senha
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password_hash);

    if (!isPasswordCorrect) {
      return response.status(400).json({ error: "Senha incorreta" });
    }
 
  const token = jwt.sign(
      { id: existingUser.id },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
  )
    // Tudo certo, cria sessão
    return response.status(200).json({ 
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
    });
    
  }
}

export default new SessionController();
