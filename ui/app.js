
let books = [
    { id: 1, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about manners, marriage, and social standing in 19th-century England." },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen et al.", description: "A comprehensive textbook covering a broad range of algorithms in depth, widely used in computer science and engineering." },
    { id: 3, title: "Engineering Mechanics: Dynamics", author: "J.L. Meriam, L.G. Kraige", description: "A foundational text for understanding the principles of dynamics in mechanical engineering." },
    { id: 4, title: "Fundamentals of Thermodynamics", author: "Richard E. Sonntag, Claus Borgnakke", description: "A classic reference for thermodynamics concepts, applications, and problem-solving in engineering." },
    { id: 5, title: "Electrical Engineering: Principles and Applications", author: "Allan R. Hambley", description: "An accessible introduction to the key concepts and applications of electrical engineering." },
    { id: 6, title: "Materials Science and Engineering: An Introduction", author: "William D. Callister Jr.", description: "A widely used textbook for understanding the properties and applications of engineering materials." },
    { id: 7, title: "Fluid Mechanics", author: "Frank M. White", description: "A comprehensive guide to the principles and applications of fluid mechanics in engineering." }
];

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
