
let books = [];

const bookList = document.getElementById('book-list');
const bookDetails = document.getElementById('book-details');
const searchInput = document.getElementById('searchInput');

async function fetchBooks(filter = "") {
    let url = 'http://localhost:3001/api/books';
    if (filter) {
        url += `?q=${encodeURIComponent(filter)}`;
    }
    try {
        const res = await fetch(url);
        books = await res.json();
        renderBooks();
    } catch (err) {
        bookList.innerHTML = '<p style="color:red">Failed to load books.</p>';
    }
}

function renderBooks() {
    bookList.innerHTML = '';
    if (books.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `<h3>${book.title}</h3><p>by ${book.author}</p>`;
        card.onclick = () => showBookDetails(book);
        bookList.appendChild(card);
    });
}

function showBookDetails(book) {
    bookDetails.classList.remove('hidden');
    bookDetails.innerHTML = `
        <h2>${book.title}</h2>
        <h4>by ${book.author}</h4>
        <p>${book.description}</p>
        <button onclick="hideBookDetails()">Close</button>
    `;
}

function hideBookDetails() {
    bookDetails.classList.add('hidden');
    bookDetails.innerHTML = '';
}

searchInput.addEventListener('input', (e) => {
    fetchBooks(e.target.value);
    hideBookDetails();
});

// Initial render
fetchBooks();
