function toggleMenu() {
    //console.log('Toggle menu clicked');
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

async function includeHTML(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await includeHTML('header-placeholder', '/components/header.html');
    await includeHTML('footer-placeholder', '/components/footer.html');
    
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Initialize dropdown menu functionality
    initializeDropdownMenus();
});

function initializeDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Prevent default link behavior
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
        });
        
        // Add click functionality for mobile
        toggle.addEventListener('click', function() {
            const dropdown = this.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle dropdown visibility
            dropdown.classList.toggle('active');
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}