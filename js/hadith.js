// ===============================
// MENU RESPONSIVO
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}


// ===============================
// CARROSSEL DE SLIDES
// ===============================

let slides = [];
let currentSlideIndex = 0;
let carouselInterval = null;

const carouselContainer = document.getElementById('carousel');

async function loadSlides() {
  if (!carouselContainer) return;

  try {
    const response = await fetch('data/slides.json');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    slides = await response.json();

    if (!Array.isArray(slides) || slides.length === 0) {
      throw new Error('slides.json está vazio ou inválido.');
    }

    buildCarousel();
    startCarousel();

  } catch (error) {
    console.error('Erro ao carregar slides:', error);
  }
}


function buildCarousel() {
  carouselContainer.innerHTML = '';

  slides.forEach((slide) => {

    const slideDiv = document.createElement('div');

    slideDiv.className = 'slide';

    slideDiv.innerHTML = `
      <h3>${slide.titulo}</h3>

      <p>${slide.descricao}</p>

      <a href="${slide.link}" class="btn">
        ${slide.botao}
      </a>
    `;

    carouselContainer.appendChild(slideDiv);
  });
}


function showSlide(index) {

  if (!carouselContainer || slides.length === 0) return;

  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }

  carouselContainer.style.transform =
    `translateY(-${currentSlideIndex * 100}%)`;
}


function startCarousel() {

  showSlide(currentSlideIndex);

  if (carouselInterval) {
    clearInterval(carouselInterval);
  }

  carouselInterval = setInterval(() => {

    currentSlideIndex++;

    showSlide(currentSlideIndex);

  }, 5000);
}


// ===============================
// INICIAR SLIDES
// ===============================

loadSlides();


// ===============================
// HADITH DO DIA
// ===============================

import('./hadith.js')
  .then(module => {
    if (typeof module.loadHadith === 'function') {
      module.loadHadith();
    }
  })
  .catch(error => {
    console.error('Erro ao carregar Hadith:', error);
  });
