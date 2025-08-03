async function loadProjectsContent() {
    try {
        const response = await fetch('/assets/data/projects.json');
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
            experienceContentElement.className = 'projects-section';
            
            const projectMediaDiv = document.createElement('div');
            projectMediaDiv.className = 'project-media';

            // Handle different media types or empty media
            if (content.thumbnail) {
                const fileExtension = content.thumbnail.split('.').pop().toLowerCase();
                
                if (fileExtension === 'mp4') {
                    // Create video element for MP4 files
                    const video = document.createElement('video');
                    video.className = 'project-video';
                    video.src = content.thumbnail;
                    video.autoplay = true;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    // Add title attribute for video accessibility
                    video.title = content.mediaAlt || `${content.title} demonstration video`;
                    projectMediaDiv.appendChild(video);
                } else if (['jpg', 'jpeg', 'png', 'webp'].includes(fileExtension)) {
                    // Set background image with accessibility attributes
                    projectMediaDiv.style.cssText = `
                        background-image: url('${content.thumbnail}');
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                    `;
                    projectMediaDiv.setAttribute('role', 'img');
                    projectMediaDiv.setAttribute('aria-label', content.mediaAlt || `${content.title} project image`);
                }
            } else {
                // Default background for empty thumbnail
                projectMediaDiv.style.cssText = `
                    background-image: url('/assets/images/projects/default-project.jpg');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                `;
                projectMediaDiv.setAttribute('role', 'img');
                projectMediaDiv.setAttribute('aria-label', 'Default project image');
            }

            const projectContent = document.createElement('div');
            projectContent.className = 'project-content';
            projectContent.innerHTML = `
                <h2>${content.title}</h2>
                <time>${content.date}</time>
                <p>${content.tech_stack.join(', ')}</p>
                <p>${content.summary.join('<br>')}</p>
                <p><a href="${content.url}" target="_blank">Link to the project</a></p>
            `;
            
            experienceContentElement.appendChild(projectMediaDiv);
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

document.addEventListener('DOMContentLoaded', loadProjectsContent);