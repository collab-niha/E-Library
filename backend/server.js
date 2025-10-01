const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory book data
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice in the Deep South." },
  { id: 3, title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarianism." },
  { id: 4, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about manners and marriage." },
  { id: 5, title: "Moby-Dick", author: "Herman Melville", description: "A whaling adventure and quest for vengeance." }
];

// Get all books or search
app.get('/api/books', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(q) ||
    book.author.toLowerCase().includes(q)
  );
  res.json(filtered);
});

// Get book by id
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, description } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author required' });
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    description: description || ''
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Book not found' });
  books.splice(idx, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`E-Library backend running on http://localhost:${PORT}`);
});
