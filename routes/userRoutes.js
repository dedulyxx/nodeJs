const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

// Получение всех пользователей
router.get('/users', userController.getAllUsers);

// Создание нового пользователя
router.post('/users', userController.createUser);

// Обновление данных пользователя
router.put('/users/:id', userController.updateUser);

// Удаление пользователя
router.delete('/users/:id', userController.deleteUser);

// Очистить всю таблицу
router.delete('/clear', userController.deleteAll);

module.exports = router;
