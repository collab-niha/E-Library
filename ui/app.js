// Sample book data
const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties." },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A story of racial injustice in the Deep South." },
    { id: 3, title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarianism." },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about manners and marriage." },
    { id: 5, title: "Moby-Dick", author: "Herman Melville", description: "A whaling adventure and quest for vengeance." }
];

const bookList = document.getElementById('book-list');
const bookDetails = document.getElementById('book-details');
const searchInput = document.getElementById('searchInput');

function renderBooks(filter = "") {
    bookList.innerHTML = '';
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(filter.toLowerCase()) ||
        book.author.toLowerCase().includes(filter.toLowerCase())
    );
    if (filteredBooks.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }
    filteredBooks.forEach(book => {
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
    renderBooks(e.target.value);
    hideBookDetails();
});

// Initial render
renderBooks();
