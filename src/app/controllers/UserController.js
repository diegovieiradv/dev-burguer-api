import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const user = {
      name: 'dora',
      email: 'dora@gmail.com',
      password_hash: '123456',
      admin: false,
    };

    try {
      const newUser = await User.create(user);
      res
        .status(200)
        .json({ message: 'User created successfully', user: newUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export default new UserController();
