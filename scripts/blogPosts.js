async function loadBlogPosts() {
    try {
        const response = await fetch('/assets/data/posts.json');
        const posts = await response.json();
        const container = document.getElementById('posts-container');
        // Hide loader
        document.querySelector('.loader').style.display = 'none';
        
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                ${post.thumbnail ? `
                    <div class="post-image" style="background-image: url('${post.thumbnail}')" 
                         role="img" 
                         aria-label="${post.imageAlt || 'Blog post thumbnail'}">
                    </div>
                ` : ''}
                <div class="post-content">
                    <h2 class="post-title">
                        <a href="${post.url}">${post.title}</a>
                    </h2>
                    <time class="post-date">${post.date}</time>
                    <a href="${post.url}" class="read-more">Read more</a>
                </div>
            `;
            container.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.querySelector('.loader').style.display = 'none';
        document.getElementById('posts-container').innerHTML = 
            '<p style="text-align: center; color: #666;">Unable to load blog posts. Please try again later.</p>';
    }
}

// Show loader while loading
document.querySelector('.loader').style.display = 'block';

// Load posts when the page is ready
document.addEventListener('DOMContentLoaded', loadBlogPosts);