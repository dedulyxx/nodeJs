const pool = require('../db');

class UserController {
  // Получение всех пользователей
  async getAllUsers(req, res) {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      res.status(500).send('Error fetching users');
    }
  }

  // Создание нового пользователя
  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      res.status(201).json(result.rows);
    } catch (err) {
      res.status(500).send('Error creating user');
    }
  }

  // Обновление данных пользователя
  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send('Error updating user');
    }
  }

  // Удаление пользователя
  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.sendStatus(200);
    } catch (err) {
      res.status(500).send('Error deleting user');
    }
  }

    // Очистить всю таблицу
    async deleteAll(req, res) {
        try {
          await pool.query('TRUNCATE TABLE users RESTART IDENTITY');
          res.sendStatus(200);
        } catch (err) {
          res.status(500).send('WARNING!!!!!');
        }
      }
}

module.exports = new UserController();
