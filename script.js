document.addEventListener('DOMContentLoaded', () => {

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
        if(themeToggle) themeToggle.textContent = '☀️ Light Mode';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            document.documentElement.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙 Dark Mode';
            }
        });
    }

    // --- SIDEBAR MENU ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => { sidebar.classList.add('open'); });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => { sidebar.classList.remove('open'); });
    }

    // --- CATEGORY FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const category = button.getAttribute('data-category');
                jobCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'flex'; 
                    } else {
                        card.style.display = 'none'; 
                    }
                });
            });
        });
    }

    // --- LIVE SEARCH DROPDOWN ---
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');

    // A list of all your pages to search through
    const allPagesList = [
        { title: "Outlier AI Trainer", category: "AI Training", link: "pages/outlier.html" },
        { title: "Loggy3", category: "AI Training", link: "pages/loggy3.html" },
        { title: "DataAnnotation Tech", category: "AI Training", link: "pages/dataannotation.html" },
        { title: "Fiverr Freelancer", category: "Freelancing", link: "pages/fiverr.html" },
        { title: "Upwork Professional", category: "Freelancing", link: "pages/upwork.html" },
        { title: "Deriv Trading", category: "Trading", link: "pages/deriv.html" },
        { title: "Forex Trading", category: "Trading", link: "pages/forex-trading.html" }
    ];

    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            searchDropdown.innerHTML = ''; // Clear previous results

            if (term.length === 0) {
                searchDropdown.classList.remove('active');
                // Reset the cards on the homepage
                jobCards.forEach(card => card.style.display = 'flex');
                return;
            }

            // Filter the list
            const filteredPages = allPagesList.filter(page => 
                page.title.toLowerCase().includes(term) || page.category.toLowerCase().includes(term)
            );

            // Build the dropdown HTML
            if (filteredPages.length > 0) {
                filteredPages.forEach(page => {
                    const item = document.createElement('a');
                    item.href = page.link;
                    item.className = 'search-dropdown-item';
                    item.innerHTML = `<h4>${page.title}</h4> <span>${page.category}</span>`;
                    searchDropdown.appendChild(item);
                });
                searchDropdown.classList.add('active');
            } else {
                searchDropdown.innerHTML = '<div style="padding: 15px; color: var(--text-muted);">No results found</div>';
                searchDropdown.classList.add('active');
            }

            // Also filter the cards on the homepage visually
            jobCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                if (title.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Close dropdown if clicked outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.classList.remove('active');
            }
        });
    }

    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const parent = question.parentElement;
                parent.classList.toggle('active');
            });
        });
    }

});
