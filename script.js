document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // --- Sticky Navbar Background ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-brand-black/95');
            navbar.classList.remove('bg-brand-black/80');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-brand-black/95');
            navbar.classList.add('bg-brand-black/80');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Interactive Quiz Logic ---
    const quizData = [
        {
            question: "Is your car new or used?",
            options: ["Brand New (0-6 Months)", "Slightly Used (< 3 Years)", "Older (3+ Years)"]
        },
        {
            question: "What protection are you most interested in?",
            options: ["Rock Chip Protection (PPF)", "Gloss & Easy Wash (Ceramic)", "Fixing Scratches (Correction)", "Not Sure Yet"]
        },
        {
            question: "What type of vehicle do you own?",
            options: ["Sedan / Coupe", "SUV / Truck", "Exotic / Supercar"]
        }
    ];

    let currentStep = 0;
    const quizContainer = document.getElementById('quiz-container');
    const userAnswers = [];

    function renderQuiz() {
        if (currentStep < quizData.length) {
            const currentQ = quizData[currentStep];
            
            let html = `
                <div class="animate-fade-in transition-opacity duration-300">
                    <p class="text-sm text-brand-gold font-bold uppercase tracking-widest mb-4">Step ${currentStep + 1} of ${quizData.length}</p>
                    <h4 class="text-2xl font-heading text-white mb-8">${currentQ.question}</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            `;

            currentQ.options.forEach((opt, index) => {
                html += `
                    <button class="quiz-btn border border-white/20 bg-black/40 hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 py-4 px-6 rounded-sm text-sm font-medium" data-value="${opt}">
                        ${opt}
                    </button>
                `;
            });

            html += `</div></div>`;
            quizContainer.innerHTML = html;

            // Attach event listeners to new buttons
            const btns = document.querySelectorAll('.quiz-btn');
            btns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    userAnswers.push(e.target.getAttribute('data-value'));
                    currentStep++;
                    renderQuiz();
                });
            });
        } else {
            renderQuizResult();
        }
    }

    function renderQuizResult() {
        quizContainer.innerHTML = `
            <div class="animate-fade-in transition-opacity duration-300">
                <div class="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-check text-brand-gold text-3xl"></i>
                </div>
                <h4 class="text-2xl font-heading text-white mb-4">Perfect Match Found</h4>
                <p class="text-brand-gray mb-8 max-w-lg mx-auto text-sm leading-relaxed">Based on your answers, we recommend scheduling a personalized consultation so we can inspect your vehicle and verify the exact package needed.</p>
                <a href="#booking" class="inline-block bg-brand-gold text-black px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-white transition-colors uppercase tracking-widest text-sm">
                    Book Consultation
                </a>
            </div>
        `;
    }

    // Initialize Quiz
    if(quizContainer) {
        renderQuiz();
    }
});