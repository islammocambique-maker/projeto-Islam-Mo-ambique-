// ===============================
// MENU RESPONSIVO
// ===============================

const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });
}


// ===============================
// CARROSSEL
// ===============================

let slides = [];
let currentSlideIndex = 0;
let carouselInterval;

const carouselContainer =
  document.getElementById('carousel');


async function loadSlides() {

  if (!carouselContainer) return;

  try {

    const response =
      await fetch('data/slides.json');

    if (!response.ok) {
      throw new Error(
        'Erro ao carregar slides.json'
      );
    }

    slides = await response.json();

    if (!Array.isArray(slides) ||
        slides.length === 0) {
      return;
    }

    buildCarousel();
    startCarousel();

  } catch (error) {

    console.error(
      'Erro ao carregar slides:',
      error
    );

  }
}


function buildCarousel() {

  carouselContainer.innerHTML = '';

  slides.forEach(slide => {

    const slideDiv =
      document.createElement('div');

    slideDiv.className = 'slide';

    slideDiv.innerHTML = `
      <h3>${slide.titulo}</h3>

      <p>${slide.descricao}</p>

      <a href="${slide.link}" class="btn">
        ${slide.botao}
      </a>
    `;

    carouselContainer.appendChild(
      slideDiv
    );

  });
}


function showSlide(index) {

  if (!slides.length) return;

  if (index >= slides.length) {
    currentSlideIndex = 0;
  }

  if (index < 0) {
    currentSlideIndex =
      slides.length - 1;
  }

  carouselContainer.style.transform =
    `translateY(-${currentSlideIndex * 100}%)`;
}


function startCarousel() {

  showSlide(currentSlideIndex);

  clearInterval(carouselInterval);

  carouselInterval =
    setInterval(() => {

      currentSlideIndex++;

      showSlide(currentSlideIndex);

    }, 5000);
}


// Iniciar
loadSlides();
