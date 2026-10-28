// Dark Mode
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// Back to Top
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

// Search & Filter
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.getElementById('searchSuggestions');
const toolCards = document.querySelectorAll('.tool-card');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = '';
    suggestionsBox.classList.remove('visible');
    if (!query) {
        toolCards.forEach(c => c.style.display = '');
        return;
    }
    const matches = [];
    toolCards.forEach(card => {
        const name = card.dataset.toolName?.toLowerCase() || '';
        const tags = card.dataset.toolTags?.toLowerCase() || '';
        if (name.includes(query) || tags.includes(query)) {
            card.style.display = '';
            if (!matches.includes(name)) matches.push(name);
        } else {
            card.style.display = 'none';
        }
    });
    if (matches.length) {
        suggestionsBox.classList.add('visible');
        matches.forEach(name => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = name;
            div.addEventListener('click', () => {
                searchInput.value = name;
                searchInput.dispatchEvent(new Event('input'));
                suggestionsBox.classList.remove('visible');
            });
            suggestionsBox.appendChild(div);
        });
    }
});

// Category Filter
document.querySelectorAll('.category-card').forEach(catCard => {
    catCard.addEventListener('click', () => {
        const category = catCard.dataset.category;
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        catCard.classList.add('active');
        searchInput.value = '';
        toolCards.forEach(tool => {
            tool.style.display = tool.dataset.toolCategory === category ? '' : 'none';
        });
        suggestionsBox.classList.remove('visible');
    });
});

// Newsletter
document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    const msg = document.getElementById('newsletterMessage');
    if (email.includes('@') && email.includes('.')) {
        msg.textContent = 'Subscribed successfully!';
        msg.style.color = 'green';
    } else {
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = 'red';
    }
});

// Footer year
document.getElementById('currentYear').textContent = new Date().getFullYear();