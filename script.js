document.addEventListener('DOMContentLoaded', () => {
    // Typing Effect
    const typedName = document.getElementById('typed-name');
    const fullName = "Sugandha Tiwari";
    let charIndex = 0;

    const typeWriter = () => {
        if (charIndex < fullName.length) {
            typedName.innerHTML += fullName.charAt(charIndex++);
            setTimeout(typeWriter, 150);
        }
    };
    if (typedName) typeWriter();

    // Smooth Scroll
    document.querySelectorAll('.top-nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // About Section: Square Toggle and Carousel Control
    const optionSquares = document.querySelectorAll('.option-square');
    const contentSections = document.querySelectorAll('.content-section');
    const clickSound = document.getElementById('click-sound');
    const optionsContainer = document.querySelector('.options-container');
    const skillsList = document.querySelector('.skills-list');

    optionSquares.forEach(square => {
        square.addEventListener('click', () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.volume = 0.2;
                clickSound.play().catch(err => console.log('Sound failed:', err));
            }

            optionSquares.forEach(sq => sq.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            square.classList.add('active');
            const sectionId = square.getAttribute('data-section');
            document.getElementById(`${sectionId}-content`).classList.add('active');

            optionsContainer.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                optionsContainer.style.transform = 'translateY(0) scale(1)';
            }, 150);

            if (sectionId === 'skills') {
                skillsList.addEventListener('mouseenter', () => {
                    skillsList.style.animationPlayState = 'paused';
                });
                skillsList.addEventListener('mouseleave', () => {
                    skillsList.style.animationPlayState = 'running';
                });
            }
        });
    });

    // Work Card Zoom Effect with Blur Fix and Video Playback
    const workItems = document.querySelectorAll('.work-item');
    const contentWrapper = document.querySelector('.content-wrapper');
    const workCards = document.querySelectorAll('.work-card');

    const updateBlur = () => {
        const isAnyActive = [...workItems].some(item => item.classList.contains('active'));
        contentWrapper.classList.toggle('blur-background', isAnyActive);
        workCards.forEach(card => {
            const parentItem = card.closest('.work-item');
            const workVideo = card.querySelector('.work-img'); // Preview video
            const detailsVideo = card.querySelector('.details-img'); // Active video
            
            if (parentItem.classList.contains('active')) {
                card.classList.remove('blur');
                card.style.zIndex = '1001'; // Ensure above all sections
                if (detailsVideo) {
                    detailsVideo.play().catch(err => console.log('Details video play failed:', err));
                }
                if (workVideo) {
                    workVideo.pause();
                    workVideo.currentTime = 0; // Reset preview video
                }
            } else {
                card.classList.toggle('blur', isAnyActive);
                card.style.zIndex = '0';
                if (workVideo) workVideo.pause();
                if (detailsVideo) detailsVideo.pause();
            }
        });
        document.body.classList.toggle('card-active', isAnyActive);
    };

    workItems.forEach(item => {
        const card = item.querySelector('.work-card');
        const workVideo = card.querySelector('.work-img'); // Preview video

        // Click to activate
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = item.classList.contains('active');
            workItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
            updateBlur();
        });

        // Hover to play preview video (non-active cards only)
        card.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active') && workVideo) {
                workVideo.play().catch(err => console.log('Hover video play failed:', err));
            }
        });

        // Pause preview video on hover end (non-active cards only)
        card.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active') && workVideo) {
                workVideo.pause();
                workVideo.currentTime = 0; // Reset to start
            }
        });
    });

    // Close active card on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.work-card') && document.querySelector('.work-item.active')) {
            workItems.forEach(item => item.classList.remove('active'));
            updateBlur();
        }
    });

    // Close active card on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            workItems.forEach(item => item.classList.remove('active'));
            updateBlur();
        }
    });

    // Scroll Animation
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!document.body.classList.contains('card-active')) { // Only if no card is active
            document.body.classList.add('scrolling');
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 500);
        }
    });

    // Social Links Hover Sound
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!document.body.classList.contains('card-active')) { // Only if no card is active
                const audio = new Audio('./component/click.mp3');
                audio.volume = 0.2;
                audio.play().catch(err => console.log('Audio failed:', err));
            }
        });
    });

    // Loader Logic
    const loader = document.querySelector('.loader');
    if (!loader) {
        console.error('Loader element not found!');
        return;
    }

    const hideLoader = () => {
        console.log('Hiding loader...');
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
            console.log('Loader hidden');
        }, 800);
    };

    if (document.readyState === 'complete') {
        console.log('DOM already complete');
        hideLoader();
    } else {
        window.addEventListener('load', () => {
            console.log('Window fully loaded');
            hideLoader();
        });
        setTimeout(() => {
            console.log('Timeout triggered');
            hideLoader();
        }, 3000);
    }

    // Code Rain Effect
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(26, 37, 38, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#86cedd';
        ctx.font = `${fontSize}px 'Fira Code'`;

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let animationFrameId;
    function animate() {
        if (!loader.classList.contains('hidden')) {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationFrameId);
            console.log('Code rain stopped');
        }
    }
    animationFrameId = requestAnimationFrame(animate);

    // Intersection Observer for Sections
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.setAttribute('data-active-section', entry.target.id);
                }
            });
        },
        { threshold: 0.3 }
    );
    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // Reveal Work Section
    const workSection = document.querySelector('#work');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    workSection.classList.add('visible');
                    revealObserver.disconnect();
                }
            });
        },
        { threshold: 0.3 }
    );
    if (workSection) revealObserver.observe(workSection);

    // Constellation Background
    const createStars = (numStars, container) => {
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            container.appendChild(star);
        }
    };

    document.querySelectorAll('.constellation-background').forEach(bg => {
        createStars(50, bg);
    });

    // Skills Popup
    const skillsLists = document.querySelector('.skills-list');
    let activePopup = null;

    const skillData = {
        html: { desc: 'Proficient in semantic markup and accessibility.', proficiency: 90 },
        css: { desc: 'Expert in responsive design and animations.', proficiency: 85 },
        javascript: { desc: 'Skilled in ES6+ and dynamic interactions.', proficiency: 80 },
        react: { desc: 'Building reusable components with React.', proficiency: 75 },
        nodejs: { desc: 'Server-side development with Node.js.', proficiency: 70 },
        mongodb: { desc: 'Database management with MongoDB.', proficiency: 65 },
        figma: { desc: 'UI/UX design with Figma.', proficiency: 80 }
    };

    skillsLists.addEventListener('click', (e) => {
        const skillItem = e.target.closest('.skill-item');
        if (!skillItem) return;

        if (activePopup) {
            activePopup.remove();
            activePopup = null;
            skillsLists.classList.remove('paused');
        }

        const skillKey = skillItem.dataset.skill;
        const data = skillData[skillKey];
        if (!data) return;

        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.volume = 0.2;
            clickSound.play().catch(err => console.log('Sound failed:', err));
        }

        skillsLists.classList.add('paused');

        const popup = document.createElement('div');
        popup.className = 'skill-popup';
        popup.innerHTML = `
            <p>${data.desc}</p>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        `;
        
        const rect = skillItem.getBoundingClientRect();
        const containerRect = skillsLists.getBoundingClientRect();
        popup.style.left = `${rect.left - containerRect.left + rect.width / 2 - 125}px`;
        popup.style.top = `${rect.bottom - containerRect.top + 10}px`;

        skillsLists.appendChild(popup);
        activePopup = popup;

        requestAnimationFrame(() => {
            popup.classList.add('visible');
            const progressFill = popup.querySelector('.progress-fill');
            progressFill.style.width = `${data.proficiency}%`;
        });

        setTimeout(() => closePopup(), 3000);
    });

    document.addEventListener('click', (e) => {
        if (activePopup && !e.target.closest('.skill-item') && !e.target.closest('.skill-popup')) {
            closePopup();
        }
    });

    function closePopup() {
        if (activePopup) {
            activePopup.classList.remove('visible');
            setTimeout(() => {
                activePopup.remove();
                activePopup = null;
                skillsLists.classList.remove('paused');
            }, 300);
        }
    }

    skillsLists.addEventListener('mouseleave', () => {
        if (!activePopup) skillsLists.classList.remove('paused');
    });

    skillsLists.addEventListener('mouseenter', () => {
        if (!activePopup) skillsLists.style.animationPlayState = 'paused';
    });
    skillsLists.addEventListener('mouseleave', () => {
        if (!activePopup) skillsLists.style.animationPlayState = 'running';
    });
});