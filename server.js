const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let libros = [
  { id: 1, nombre: "Carrie" },
  { id: 2, nombre: "Cementerio de animales" },
  { id: 3, nombre: "Misterio en Salems Lot" }
];

app.get('/', (req, res) => {
  res.json({ mensaje: "Bienvenido a mi API con Express" });
});

app.get('/libros', (req, res) => {
  res.json(libros);
});

app.get('/libros/:id', (req, res) => {
  const libro = libros.find(p => p.id == req.params.id);

  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  res.json(libro);
});

app.post('/libros', (req, res) => {
  if (!req.body.nombre) {
    return res.status(400).json({ mensaje: "Falta el nombre" });
  }

  const nuevoLibro = {
    id: libros.length + 1,
    nombre: req.body.nombre
  };

  libros.push(nuevoLibro);

  res.json({ mensaje: "Libro agregado", libro: nuevoLibro });
});

app.put('/libros/:id', (req, res) => {
  const libro = libros.find(p => p.id == req.params.id);

  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  libro.nombre = req.body.nombre;

  res.json({ mensaje: "Libro actualizado", libro });
});

app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  libros = libros.filter(p => p.id !== id);

  res.json({ mensaje: "Libro eliminado" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});