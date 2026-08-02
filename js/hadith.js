async function loadHadith() {
  try {
    const response = await fetch('data/hadiths.json');

    if (!response.ok) {
      throw new Error('Não foi possível carregar hadiths.json');
    }

    const hadiths = await response.json();

    if (!Array.isArray(hadiths) || hadiths.length === 0) {
      throw new Error('Nenhum Hadith encontrado.');
    }

    const today = new Date().getDate().toString();

    let hadithDia = localStorage.getItem('hadithDia');
    let diaSalvo = localStorage.getItem('diaSalvo');

    let hadithSelecionado;

    if (diaSalvo !== today || !hadithDia) {

      const index = hadiths.findIndex(
        h => h.dia === today
      );

      if (index !== -1) {
        hadithSelecionado = hadiths[index];
      } else {
        hadithSelecionado =
          hadiths[Math.floor(Math.random() * hadiths.length)];
      }

      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem('diaSalvo', today);

    } else {

      hadithSelecionado = JSON.parse(hadithDia);

    }

    const arabico = document.querySelector('.arabico');
    const traducao = document.querySelector('.traducao');
    const fonte = document.querySelector('.fonte');
    const reflexao = document.querySelector('.reflexao');

    if (arabico) {
      arabico.textContent = hadithSelecionado.arabico;
    }

    if (traducao) {
      traducao.textContent = hadithSelecionado.traducao;
    }

    if (fonte) {
      fonte.textContent =
        `Fonte: ${hadithSelecionado.fonte}`;
    }

    if (reflexao) {
      reflexao.textContent = hadithSelecionado.reflexao;
    }

  } catch (error) {

    console.error('Erro ao carregar Hadith:', error);

  }
}

loadHadith();
