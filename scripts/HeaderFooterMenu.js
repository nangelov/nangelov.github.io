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
});