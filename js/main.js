// ==========================================
// MENU RESPONSIVO
// ==========================================

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


// ==========================================
// CARROSSEL DE SLIDES
// ==========================================

let slides = [];
let currentSlideIndex = 0;
let carouselInterval = null;

const carouselContainer =
  document.getElementById('carousel');


async function loadSlides() {

  if (!carouselContainer) {
    return;
  }

  try {

    const response =
      await fetch('data/slides.json');

    if (!response.ok) {
      throw new Error(
        'Não foi possível carregar slides.json'
      );
    }

    slides = await response.json();

    if (!Array.isArray(slides) || slides.length === 0) {
      throw new Error(
        'slides.json está vazio ou inválido'
      );
    }

    buildCarousel();
    startCarousel();

  } catch (error) {

    console.error(
      'Erro ao carregar os slides:',
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

    carouselContainer.appendChild(slideDiv);

  });
}


function showSlide(index) {

  if (!carouselContainer || slides.length === 0) {
    return;
  }

  if (index >= slides.length) {
    currentSlideIndex = 0;
  }

  if (index < 0) {
    currentSlideIndex = slides.length - 1;
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


// ==========================================
// HADITH DO DIA
// ==========================================

async function loadHadith() {

  const arabico =
    document.querySelector('.arabico');

  const traducao =
    document.querySelector('.traducao');

  const fonte =
    document.querySelector('.fonte');

  const reflexao =
    document.querySelector('.reflexao');


  // Se esta página não tiver Hadith,
  // simplesmente não faz nada.
  if (
    !arabico &&
    !traducao &&
    !fonte &&
    !reflexao
  ) {
    return;
  }


  try {

    const response =
      await fetch('data/hadiths.json', {
        cache: 'no-store'
      });


    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status} ao carregar hadiths.json`
      );
    }


    const hadiths =
      await response.json();


    if (
      !Array.isArray(hadiths) ||
      hadiths.length === 0
    ) {
      throw new Error(
        'hadiths.json está vazio ou inválido'
      );
    }


    // ======================================
    // DIA DO MÊS
    // ======================================

    const today =
      new Date().getDate().toString();


    // ======================================
    // VERIFICAR HADITH GUARDADO
    // ======================================

    let hadithSelecionado = null;

    const hadithGuardado =
      localStorage.getItem('hadithDia');

    const diaGuardado =
      localStorage.getItem('diaSalvo');


    if (
      hadithGuardado &&
      diaGuardado === today
    ) {

      try {

        hadithSelecionado =
          JSON.parse(hadithGuardado);

      } catch {

        hadithSelecionado = null;

      }

    }


    // ======================================
    // SE NÃO HOUVER, BUSCAR PELO DIA
    // ======================================

    if (!hadithSelecionado) {

      hadithSelecionado =
        hadiths.find(
          h => String(h.dia) === today
        );


      // ====================================
      // SE NÃO EXISTIR, ESCOLHER ALEATÓRIO
      // ====================================

      if (!hadithSelecionado) {

        hadithSelecionado =
          hadiths[
            Math.floor(
              Math.random() * hadiths.length
            )
          ];

      }


      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem(
        'diaSalvo',
        today
      );

    }


    // ======================================
    // MOSTRAR NA PÁGINA
    // ======================================

    if (arabico) {

      arabico.textContent =
        hadithSelecionado.arabico || '';

    }


    if (traducao) {

      traducao.textContent =
        hadithSelecionado.traducao || '';

    }


    if (fonte) {

      fonte.textContent =
        `Fonte: ${hadithSelecionado.fonte || ''}`;

    }


    if (reflexao) {

      reflexao.textContent =
        hadithSelecionado.reflexao || '';

    }


    console.log(
      'Hadith do Dia carregado:',
      hadithSelecionado
    );


  } catch (error) {

    console.error(
      'Erro ao carregar Hadith do Dia:',
      error
    );


    if (traducao) {

      traducao.textContent =
        'Não foi possível carregar o Hadith do Dia.';

    }

  }

}


// ==========================================
// INICIAR TUDO
// ==========================================

loadSlides();
loadHadith();
