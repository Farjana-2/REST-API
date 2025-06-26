const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: '1984', author: 'George Orwell' }
];

app.get('/books', (_req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Both title and author are required.' });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  const { title, author } = req.body;
  if (title)  book.title  = title;
  if (author) book.author = author;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }

  const [deleted] = books.splice(index, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
