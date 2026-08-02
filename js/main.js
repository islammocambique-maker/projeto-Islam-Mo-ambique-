// Menu responsivo
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Carrossel de slides
let slides = [];
let currentSlideIndex = 0;
const carouselContainer = document.getElementById('carousel');

async function loadSlides() {
  const response = await fetch('data/slides.json');
  slides = await response.json();
  buildCarousel();
  startCarousel();
}

function buildCarousel() {
  carouselContainer.innerHTML = '';
  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide';
    slideDiv.innerHTML = `
      <h3>${slide.titulo}</h3>
      <p>${slide.descricao}</p>
      <a href="${slide.link}" class="btn">${slide.botao}</a>
    `;
    carouselContainer.appendChild(slideDiv);
  });
}

function showSlide(index) {
  const totalSlides = slides.length;
  if (index >= totalSlides) index = 0;
  if (index < 0) index = totalSlides -1;
  currentSlideIndex = index;
  const translateY = -index * 100;
  carouselContainer.style.transform = `translateY(${translateY}%)`;
}

let carouselInterval;

function startCarousel() {
  showSlide(currentSlideIndex);
  carouselInterval = setInterval(() => {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }, 5000);
}

// Carregar Hadith do dia somente depois do HTML estar pronto
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const module = await import('./hadith.js');
    await module.loadHadith();
  } catch (error) {
    console.error('Erro ao iniciar Hadith do dia:', error);
  }
});
