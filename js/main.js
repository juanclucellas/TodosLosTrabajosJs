document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const bookContainer = document.getElementById('bookContainer');

    searchButton.addEventListener('click', searchBooks);
    searchInput.addEventListener('input', searchBooks);

    async function searchBooks() {
        const query = searchInput.value.toLowerCase();

        if (query.trim() === '') {
            bookContainer.innerHTML = '';
            return;
        }

        try {
            const response = await fetch('books.json');
            const books = await response.json();
            
            const filteredBooks = books.filter(book => {
                return (
                    book.titulo.toLowerCase().includes(query) ||
                    book.autor.toLowerCase().includes(query) ||
                    book.genero.toLowerCase().includes(query)
                );
            });

            displayBooks(filteredBooks);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    }

    function displayBooks(books) {
        bookContainer.innerHTML = '';

        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            const title = document.createElement('h2');
            title.textContent = book.titulo;
            bookElement.appendChild(title);

            const author = document.createElement('p');
            author.textContent = 'Autor: ' + book.autor;
            bookElement.appendChild(author);

            const genre = document.createElement('p');
            genre.textContent = 'Género: ' + book.genero;
            bookElement.appendChild(genre);

            const description = document.createElement('p');
            description.textContent = book.descripcion;
            bookElement.appendChild(description);

            bookContainer.appendChild(bookElement);
        });
    }
});
