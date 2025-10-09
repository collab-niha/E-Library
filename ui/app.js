
let books = [
    { id: 1, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about manners, marriage, and social standing in 19th-century England." },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen et al.", description: "A comprehensive textbook covering a broad range of algorithms in depth, widely used in computer science and engineering." },
    { id: 3, title: "Engineering Mechanics: Dynamics", author: "J.L. Meriam, L.G. Kraige", description: "A foundational text for understanding the principles of dynamics in mechanical engineering." },
    { id: 4, title: "Fundamentals of Thermodynamics", author: "Richard E. Sonntag, Claus Borgnakke", description: "A classic reference for thermodynamics concepts, applications, and problem-solving in engineering." },
    { id: 5, title: "Electrical Engineering: Principles and Applications", author: "Allan R. Hambley", description: "An accessible introduction to the key concepts and applications of electrical engineering." },
    { id: 6, title: "Materials Science and Engineering: An Introduction", author: "William D. Callister Jr.", description: "A widely used textbook for understanding the properties and applications of engineering materials." },
    { id: 7, title: "Fluid Mechanics", author: "Frank M. White", description: "A comprehensive guide to the principles and applications of fluid mechanics in engineering." }
];
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", description: "A classic novel set in the Roaring Twenties, exploring themes of wealth, love, and the American Dream." },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", description: "A powerful story of racial injustice and childhood innocence in the Deep South." },
    { id: 3, title: "1984", author: "George Orwell", description: "A dystopian novel about totalitarianism, surveillance, and the loss of individuality." },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", description: "A romantic novel about manners, marriage, and social standing in 19th-century England." },
    { id: 5, title: "Moby-Dick", author: "Herman Melville", description: "A whaling adventure and a quest for vengeance against the elusive white whale, Moby Dick." },
    { id: 6, title: "The Hobbit", author: "J.R.R. Tolkien", description: "A fantasy adventure following Bilbo Baggins as he embarks on a quest to reclaim a lost dwarf kingdom." },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", description: "A coming-of-age story about teenage alienation and rebellion in postwar America." },
    { id: 8, title: "Brave New World", author: "Aldous Huxley", description: "A futuristic society driven by technology, pleasure, and the loss of individuality." },
    { id: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", description: "An epic fantasy trilogy about the struggle between good and evil in Middle-earth." },
    { id: 10, title: "The Alchemist", author: "Paulo Coelho", description: "A philosophical novel about a shepherd's journey to find his personal legend and fulfill his dreams." }
];


const bookList = document.getElementById('book-list');
const bookDetails = document.getElementById('book-details');
const searchInput = document.getElementById('searchInput');
const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const descInput = document.getElementById('descInput');


// Commented out backend fetch for now, using local data
// async function fetchBooks(filter = "") {
//     let url = 'http://localhost:3001/api/books';
//     if (filter) {
//         url += `?q=${encodeURIComponent(filter)}`;
//     }
//     try {
//         const res = await fetch(url);
//         books = await res.json();
//         renderBooks();
//     } catch (err) {
//         bookList.innerHTML = '<p style="color:red">Failed to load books.</p>';
//     }
// }

function renderBooks(filter = "") {
    bookList.innerHTML = '';
    let filtered = books;
    if (filter) {
        filtered = books.filter(book =>
            book.title.toLowerCase().includes(filter.toLowerCase()) ||
            book.author.toLowerCase().includes(filter.toLowerCase())
        );
    }
    if (filtered.length === 0) {
        bookList.innerHTML = '<p>No books found.</p>';
        return;
    }
    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <button class="delete-btn">Delete</button>
        `;
        card.onclick = (e) => {
            if (e.target.classList.contains('delete-btn')) {
                deleteBook(book.id);
            } else {
                showBookDetails(book);
            }
        };
        bookList.appendChild(card);
    });
}

function showBookDetails(book) {
    bookDetails.classList.remove('hidden');
    bookDetails.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;">
            <h2>${book.title}</h2>
            <button onclick="hideBookDetails()">Close</button>
        </div>
        <h4>by ${book.author}</h4>
        <p>${book.description}</p>
    `;
}
function deleteBook(id) {
    books = books.filter(b => b.id !== id);
    renderBooks(searchInput.value);
    hideBookDetails();
}

function hideBookDetails() {
    bookDetails.classList.add('hidden');
    bookDetails.innerHTML = '';
}


searchInput.addEventListener('input', (e) => {
    const filter = e.target.value;
    renderBooks(filter);
    hideBookDetails();
});

if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const description = descInput.value.trim();
        if (!title || !author) return;
        const newBook = {
            id: books.length ? books[books.length - 1].id + 1 : 1,
            title,
            author,
            description
        };
        books.push(newBook);
        renderBooks(searchInput.value);
        addBookForm.reset();
    });
}

// Initial render
renderBooks();
