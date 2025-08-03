async function loadBooksContent() {
    try {
        const response = await fetch('/assets/data/books.json');
        const booksContent = await response.json();
        const container = document.getElementById('books-container');
        
        if (!container) {
            console.error('Container element not found');
            return;
        }

        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        booksContent.forEach(book => {
            const bookElement = document.createElement('article');
            bookElement.className = 'books-section';
            
            const bookEmbedDiv = document.createElement('div');
            bookEmbedDiv.className = 'book-embed-container';
            bookEmbedDiv.innerHTML = `
                <iframe width='160' height='450' src='https://leanpub.com/the_adaptive_leaders_toolkit/embed' frameborder='0' allowtransparency='true'></iframe>
            `;

            const bookContent = document.createElement('div');
            bookContent.className = 'book-content';
            bookContent.innerHTML = `
                <h2>${book.title}</h2>
                <h3>${book.subtitle}</h3>
                <time>${book.date}</time>
                <p>${book.summary.join('<br>')}</p>
                <p><a href="${book.url}" target="_blank">Get the book</a></p>
            `;
            
            bookElement.appendChild(bookEmbedDiv);
            bookElement.appendChild(bookContent);
            container.appendChild(bookElement);
        });
    } catch (error) {
        console.error('Error loading books content:', error);
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        const container = document.getElementById('books-container');
        if (container) {
            container.innerHTML = 
                '<p style="text-align: center; color: #666;">Unable to load books content. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadBooksContent); 