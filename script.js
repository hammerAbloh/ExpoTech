// ============================================
// NAVEGAÇÃO RESPONSIVA - MENU HAMBURGUER
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle do menu mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animação do ícone hamburger
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ============================================
// SCROLL SUAVE E HEADER FIXO
// ============================================

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// SISTEMA DE TROCA DE TEMA GELO/CALOR
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const snowContainer = document.getElementById('snowContainer');
const thermometerFillFixed = document.getElementById('thermometerFillFixed');
const thermometerIconFixed = document.getElementById('thermometerIconFixed');

let isIceMode = true; // Começa no modo gelo

// Função para criar flocos de neve
function createSnowflake() {
    if (!isIceMode || !snowContainer) return;
    
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';
    snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    snowflake.style.opacity = Math.random();
    snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
    
    snowContainer.appendChild(snowflake);
    
    // Remover após animação
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, 5000);
}

// Iniciar efeito de neve
function startSnow() {
    if (!isIceMode) return;
    setInterval(createSnowflake, 300);
}

// Trocar tema
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isIceMode = !isIceMode;
        
        if (isIceMode) {
            // Modo Gelo
            body.classList.remove('hot-mode');
            themeIcon.className = 'fas fa-snowflake';
            themeToggle.style.borderColor = '#1e3a8a';
            themeToggle.style.color = '#1e3a8a';
            
            // Atualizar termômetro fixo
            if (thermometerFillFixed) {
                thermometerFillFixed.style.height = '30%';
                thermometerFillFixed.style.background = 'linear-gradient(to top, #0284c7, #0ea5e9)';
            }
            if (thermometerIconFixed) {
                const icon = thermometerIconFixed.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-snowflake';
                }
                thermometerIconFixed.style.color = '#0ea5e9';
            }
            
            // Reiniciar neve
            if (snowContainer) {
                snowContainer.innerHTML = '';
            }
            startSnow();
        } else {
            // Modo Calor
            body.classList.add('hot-mode');
            themeIcon.className = 'fas fa-fire';
            themeToggle.style.borderColor = '#ef4444';
            themeToggle.style.color = '#ef4444';
            
            // Atualizar termômetro fixo
            if (thermometerFillFixed) {
                thermometerFillFixed.style.height = '85%';
                thermometerFillFixed.style.background = 'linear-gradient(to top, #ef4444, #f97316)';
            }
            if (thermometerIconFixed) {
                const icon = thermometerIconFixed.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-fire';
                }
                thermometerIconFixed.style.color = '#ef4444';
            }
            
            // Parar neve
            if (snowContainer) {
                snowContainer.innerHTML = '';
            }
        }
    });
}

// ============================================
// TERMÔMETRO FIXO - ATUALIZAÇÃO AUTOMÁTICA
// ============================================

// O termômetro já é atualizado pela função de troca de tema acima

// ============================================
// MINI GAME
// ============================================

const gameArea = document.getElementById('gameArea');
const penguinCharacter = document.getElementById('penguinCharacter');
const startGameBtn = document.getElementById('startGameBtn');
const gameScore = document.getElementById('gameScore');
const gameTimer = document.getElementById('gameTimer');
const gameResult = document.getElementById('gameResult');

let gameActive = false;
let score = 0;
let timeLeft = 30;
let gameInterval = null;
let iceCubes = [];
let penguinPosition = { x: 50, y: 50 };

// Posicionar pinguim inicialmente
if (penguinCharacter && gameArea) {
    updatePenguinPosition();
}

function updatePenguinPosition() {
    if (!penguinCharacter || !gameArea) return;
    const areaRect = gameArea.getBoundingClientRect();
    const x = (penguinPosition.x / 100) * areaRect.width - 24;
    const y = (penguinPosition.y / 100) * areaRect.height - 24;
    penguinCharacter.style.left = x + 'px';
    penguinCharacter.style.top = y + 'px';
}

// Mover pinguim ao tocar/clicar
if (gameArea) {
    gameArea.addEventListener('click', (e) => {
        if (!gameActive) return;
        
        const rect = gameArea.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        penguinPosition.x = Math.max(0, Math.min(100, x));
        penguinPosition.y = Math.max(0, Math.min(100, y));
        updatePenguinPosition();
        
        checkIceCubeCollision();
    });
    
    // Suporte para touch
    gameArea.addEventListener('touchstart', (e) => {
        if (!gameActive) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const rect = gameArea.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        
        penguinPosition.x = Math.max(0, Math.min(100, x));
        penguinPosition.y = Math.max(0, Math.min(100, y));
        updatePenguinPosition();
        
        checkIceCubeCollision();
    });
}

function createIceCube() {
    if (!gameArea || !gameActive) return;
    
    const iceCube = document.createElement('div');
    iceCube.className = 'ice-cube';
    iceCube.innerHTML = '🧊';
    
    const x = Math.random() * 90 + 5;
    const y = Math.random() * 90 + 5;
    
    iceCube.style.left = x + '%';
    iceCube.style.top = y + '%';
    
    gameArea.appendChild(iceCube);
    iceCubes.push({ element: iceCube, x, y });
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (iceCube.parentNode && gameActive) {
            iceCube.classList.add('melting');
            setTimeout(() => {
                if (iceCube.parentNode) {
                    iceCube.parentNode.removeChild(iceCube);
                }
                iceCubes = iceCubes.filter(cube => cube.element !== iceCube);
            }, 1000);
        }
    }, 5000);
}

function checkIceCubeCollision() {
    if (!penguinCharacter || !gameArea) return;
    
    const penguinRect = penguinCharacter.getBoundingClientRect();
    const areaRect = gameArea.getBoundingClientRect();
    
    iceCubes.forEach((cube, index) => {
        const cubeRect = cube.element.getBoundingClientRect();
        
        if (
            penguinRect.left < cubeRect.right &&
            penguinRect.right > cubeRect.left &&
            penguinRect.top < cubeRect.bottom &&
            penguinRect.bottom > cubeRect.top
        ) {
            // Colisão detectada
            score++;
            if (gameScore) gameScore.textContent = score;
            
            cube.element.classList.add('melting');
            setTimeout(() => {
                if (cube.element.parentNode) {
                    cube.element.parentNode.removeChild(cube.element);
                }
            }, 300);
            
            iceCubes.splice(index, 1);
        }
    });
}

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    timeLeft = 30;
    iceCubes = [];
    
    if (gameScore) gameScore.textContent = score;
    if (gameTimer) gameTimer.textContent = timeLeft;
    if (gameResult) gameResult.textContent = '';
    if (startGameBtn) startGameBtn.style.display = 'none';
    
    // Limpar área de jogo
    if (gameArea) {
        const existingCubes = gameArea.querySelectorAll('.ice-cube');
        existingCubes.forEach(cube => cube.remove());
    }
    
    // Criar cubos periodicamente
    const cubeInterval = setInterval(() => {
        if (gameActive) {
            createIceCube();
        } else {
            clearInterval(cubeInterval);
        }
    }, 2000);
    
    // Timer
    gameInterval = setInterval(() => {
        timeLeft--;
        if (gameTimer) gameTimer.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Primeiro cubo
    createIceCube();
}

function endGame() {
    gameActive = false;
    if (gameInterval) clearInterval(gameInterval);
    
    if (gameResult) {
        gameResult.textContent = `Você salvou ${score} blocos de gelo!`;
    }
    if (startGameBtn) {
        startGameBtn.style.display = 'inline-block';
        startGameBtn.textContent = 'Jogar Novamente';
    }
    
    // Limpar cubos restantes
    if (gameArea) {
        const existingCubes = gameArea.querySelectorAll('.ice-cube');
        existingCubes.forEach(cube => {
            cube.classList.add('melting');
            setTimeout(() => {
                if (cube.parentNode) {
                    cube.parentNode.removeChild(cube);
                }
            }, 1000);
        });
    }
    iceCubes = [];
}

if (startGameBtn) {
    startGameBtn.addEventListener('click', startGame);
}

// ============================================
// ANIMAÇÃO DE APARIÇÃO AO SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observar todas as seções e cards
const sections = document.querySelectorAll('section');
const cards = document.querySelectorAll('.impact-card, .penguin-card, .ngo-card, .help-item, .info-card');

sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// EFEITO DE HOVER NOS CARDS
// ============================================

const allCards = document.querySelectorAll('.impact-card, .penguin-card, .ngo-card, .help-item, .info-card');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// VALIDAÇÃO DE LINKS EXTERNOS
// ============================================

const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Adiciona atributo de segurança
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// ============================================
// INICIALIZAÇÃO AO CARREGAR A PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Iniciar neve no modo gelo
    if (isIceMode) {
        startSnow();
    }
    
    // Adicionar classe de animação inicial ao hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Inicializar termômetro fixo
    if (thermometerFillFixed && isIceMode) {
        thermometerFillFixed.style.height = '30%';
        thermometerFillFixed.style.background = 'linear-gradient(to top, #0284c7, #0ea5e9)';
    }
    if (thermometerIconFixed && isIceMode) {
        const icon = thermometerIconFixed.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-snowflake';
        }
        thermometerIconFixed.style.color = '#0ea5e9';
    }
    
    console.log('Ambiente Virtual - Site carregado com sucesso!');
});

// ============================================
// PREVENIR COMPORTAMENTO PADRÃO DE LINKS ÂNCORA
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// FEEDBACK VISUAL NOS BOTÕES
// ============================================

const buttons = document.querySelectorAll('.btn, .mode-toggle, .theme-toggle');

buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});
