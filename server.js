const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

let bookCollection = [];
app.get("/books", (req, res) => {
  res.json(bookCollection);
});


app.post("/books", (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required." });
  }
  const id = Date.now().toString();

  const book = {
    id,
    title,
    author,
    publishedDate,
  };

  bookCollection.push(book);
  res.json(book);
});


app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const foundBook = bookCollection.find((book) => book.id === bookId);

  if (foundBook) {
    bookCollection = bookCollection.filter((book) => book.id !== bookId);
    return res.json({ message: "Book successfully deleted." });
  } else {
    res.status(404).json({ message: "Book not found." });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
