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
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }
    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // --- CATEGORY FILTERING (Homepage Only) ---
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

    // --- FAQ ACCORDION (Article Pages Only) ---
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
