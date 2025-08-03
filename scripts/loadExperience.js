async function loadExperienceContent() {
    try {
        const response = await fetch('/assets/data/experience.json');
        const experienceContent = await response.json();
        const container = document.getElementById('project-container');
        
        if (!container) {
            console.error('Container element not found');
            return;
        }

        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        
        experienceContent.forEach(content => {
            const experienceContentElement = document.createElement('article');
            experienceContentElement.className = 'prof-ex-section';
            
            let currentImageIndex = 0;
            const images = Array.isArray(content.thumbnail) ? content.thumbnail : [content.thumbnail];
            const imageAlts = Array.isArray(content.imageAlt) ? content.imageAlt : [content.imageAlt || `${content.title} image`];
            
            const projectImageDiv = document.createElement('div');
            projectImageDiv.className = 'project-image';
            
            // Set initial background image with full CSS properties and accessibility attributes
            projectImageDiv.style.cssText = `
                background-image: url('${images[currentImageIndex]}');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            `;
            projectImageDiv.setAttribute('role', 'img');
            projectImageDiv.setAttribute('aria-label', imageAlts[currentImageIndex] || `${content.title} image`);
                        
            // Only set up image rotation if there are multiple images
            if (images.length > 1) {
                const rotateImages = () => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    projectImageDiv.style.cssText = `
                        background-image: url('${images[currentImageIndex]}');
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    `;
                    projectImageDiv.setAttribute('aria-label', imageAlts[currentImageIndex] || `${content.title} image ${currentImageIndex + 1}`);
                };
                
                // Start rotation
                const intervalId = setInterval(rotateImages, 3000);
                
                // Clean up interval when element is removed
                experienceContentElement.addEventListener('remove', () => {
                    clearInterval(intervalId);
                });
            }

            const projectContent = document.createElement('div');
            projectContent.className = 'project-content';
            projectContent.innerHTML = `
                <h2>${content.title}</h2>
                <time>${content.date}</time>
                <p>${content.location}</p>
                <p>${content.company}</p>
                <p>${content.content.join('<br>')}</p>
            `;
            
            experienceContentElement.appendChild(projectImageDiv);
            experienceContentElement.appendChild(projectContent);
            container.appendChild(experienceContentElement);
        });
    } catch (error) {
        console.error('Error loading project content:', error);
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.display = 'none';
        }
        const container = document.getElementById('project-container');
        if (container) {
            container.innerHTML = 
                '<p style="text-align: center; color: #666;">Unable to load project content. Please try again later.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', loadExperienceContent);