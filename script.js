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

const skillItems = skillsList.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    const clone = item.cloneNode(true);
    skillsList.appendChild(clone); // Append clones for infinite loop
});

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
       
  html: {
    desc: 'Comfortable writing clean, semantic HTML with accessibility in mind.',
    proficiency: 88,
  },
  css: {
    desc: 'Good with responsive layouts, flex/grid and some neat animations.',
    proficiency: 85,
  },
  javascript: {
    desc: 'Confident with core JS and DOM . Love solving UI logic.',
    proficiency: 82,
  },
  react: {
    desc: 'Can build smooth interfaces with reusable components and hooks.',
    proficiency: 76,
  },
  nodejs: {
    desc: 'Have built APIs using Express and Node, know the flow well.',
    proficiency: 72,
  },
  mongodb: {
    desc: 'Used MongoDB for several projects, comfortable with queries and schema design.',
    proficiency: 71,
  },
  express: {
    desc: 'Familiar with routing, middleware, and building APIs using Express.',
    proficiency: 71,
  },
  next: {
    desc: 'Learning Next.js for SSR and routing. Have done a few experiments.',
    proficiency: 68,
  },
  c: {
    desc: 'Learned in academics. Good with basics and pointers, used in DSA.',
    proficiency: 72,
  },
  cpp: {
    desc: 'Used for solving DSA problems and building small projects.',
    proficiency: 78,
  },
  java: {
    desc: 'Used in academics and for OOP concepts. Comfortable with syntax and logic.',
    proficiency: 77,
  },
  python: {
    desc: 'Written a few scripts, know the basics and syntax well.',
    proficiency: 70,
  },
  php: {
    desc: 'Used in a full-stack project. Comfortable with backend logic and forms.',
    proficiency: 72,
  },
  sql: {
    desc: 'Can write queries, joins, and manage relational databases.',
    proficiency: 78,
  },
  plsql: {
    desc: 'Used PL/SQL blocks and cursors in Oracle. Academic exposure.',
    proficiency: 76,
  },
  firebase: {
    desc: 'Used Firebase Auth and Realtime DB in personal projects.',
    proficiency: 70,
  },
  figma: {
    desc: 'Design UI and create wireframes easily. Use it for project plans.',
    proficiency: 80,
  },
  canva: {
    desc: 'Use Canva for posters and quick UI visuals. Simple and handy tool.',
    proficiency: 80,
  },
  vscode: {
    desc: 'Main code editor. Customized and familiar with it.',
    proficiency: 85,
  },
  git: {
    desc: 'Know branching, commits, pushing projects – daily driver.',
    proficiency: 80,
  },
  tailwind: {
        desc: 'Experienced in creating sleek UI designs with Tailwind CSS.',
        proficiency: 78,
    },
    bootstrap: {
        desc: 'Skilled in building responsive layouts with Bootstrap’s CSS framework.',
        proficiency: 82,
    }
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

        setTimeout(() => closePopup(), 5000);
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