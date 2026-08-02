// ==========================================
// ISLAM MOÇAMBIQUE
// JAVASCRIPT PRINCIPAL
// ==========================================


// ==========================================
// MENU RESPONSIVO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // Fechar menu depois de clicar num link
    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
      });
    });

  }


// ==========================================
// CARROSSEL / SLIDES
// ==========================================

  const carousel = document.getElementById("carousel");

  if (carousel) {

    let slides = [];
    let currentSlide = 0;
    let carouselInterval = null;


    // --------------------------------------
    // CARREGAR SLIDES
    // --------------------------------------

    async function loadSlides() {

      try {

        const response = await fetch("data/slides.json", {
          cache: "no-cache"
        });

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar slides.json"
          );
        }

        slides = await response.json();

        if (!Array.isArray(slides) || slides.length === 0) {

          carousel.innerHTML = `
            <div class="slide">
              <h3>Islam Moçambique</h3>
              <p>
                Bem-vindo ao nosso projeto.
              </p>
            </div>
          `;

          return;
        }

        buildCarousel();
        startCarousel();

      } catch (error) {

        console.error(
          "Erro ao carregar slides:",
          error
        );

        // Não deixar a página quebrar caso
        // slides.json tenha algum problema.

        carousel.innerHTML = `
          <div class="slide">
            <h3>Islam Moçambique</h3>

            <p>
              Conhecimento, educação e comunidade islâmica.
            </p>

            <a href="guia/" class="btn">
              VER GUIAS
            </a>
          </div>
        `;

      }

    }


    // --------------------------------------
    // CONSTRUIR CARROSSEL
    // --------------------------------------

    function buildCarousel() {

      carousel.innerHTML = "";

      slides.forEach((slide) => {

        const slideElement =
          document.createElement("div");

        slideElement.className = "slide";

        slideElement.innerHTML = `
          <h3>${escapeHTML(slide.titulo || "")}</h3>

          <p>
            ${escapeHTML(slide.descricao || "")}
          </p>

          ${
            slide.link
              ? `
                <a
                  href="${escapeAttribute(slide.link)}"
                  class="btn">
                  ${escapeHTML(slide.botao || "ABRIR")}
                </a>
              `
              : ""
          }
        `;

        carousel.appendChild(slideElement);

      });

      // O #carousel contém todos os slides
      // um abaixo do outro.
      carousel.style.height =
        `${slides.length * 100}%`;

    }


    // --------------------------------------
    // MOSTRAR SLIDE
    // --------------------------------------

    function showSlide(index) {

      if (!slides.length) return;

      if (index >= slides.length) {
        currentSlide = 0;
      }

      if (index < 0) {
        currentSlide = slides.length - 1;
      }

      const translateY =
        -(currentSlide * (100 / slides.length));

      carousel.style.transform =
        `translateY(${translateY}%)`;

    }


    // --------------------------------------
    // INICIAR SLIDE AUTOMÁTICO
    // --------------------------------------

    function startCarousel() {

      if (carouselInterval) {
        clearInterval(carouselInterval);
      }

      showSlide(currentSlide);

      carouselInterval = setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
          currentSlide = 0;
        }

        showSlide(currentSlide);

      }, 5000);

    }


    // --------------------------------------
    // PROTEÇÃO CONTRA HTML INDESEJADO
    // --------------------------------------

    function escapeHTML(value) {

      const div =
        document.createElement("div");

      div.textContent = value;

      return div.innerHTML;

    }


    function escapeAttribute(value) {

      return String(value)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    }


    // --------------------------------------
    // INICIAR
    // --------------------------------------

    loadSlides();

  }


// ==========================================
// HADITH DO DIA
// ==========================================

  import("./hadith.js")
    .then(module => {

      if (
        module &&
        typeof module.loadHadith === "function"
      ) {

        module.loadHadith();

      }

    })
    .catch(error => {

      console.error(
        "Erro ao carregar hadith.js:",
        error
      );

    });

});
