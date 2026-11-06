const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
const users = [];
let nextId = 1;
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => {
  const name = req.body?.name;
  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Укажите имя' });
  }
  const user = { id: nextId++, name: name.trim() };
  users.push(user);
  res.status(201).json(user);
});
app.use((err, req, res, next) => res.status(err.status || 500).json({error: 'Ошибка запроса'}));
const server = app.listen(process.env.PORT || 3000, '127.0.0.1', () => console.log('API listening on http://127.0.0.1:' + server.address().port));
