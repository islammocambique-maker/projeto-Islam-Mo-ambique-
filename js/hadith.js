export async function loadHadith() {
  try {
    const response = await fetch('./data/hadiths.json', {
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(`Erro ao carregar hadiths.json: ${response.status}`);
    }

    const hadiths = await response.json();

    if (!Array.isArray(hadiths) || hadiths.length === 0) {
      throw new Error('O arquivo hadiths.json está vazio ou inválido.');
    }

    // Dia do mês: 1, 2, 3... 31
    const today = new Date().getDate().toString();

    let hadithSelecionado = null;

    const diaSalvo = localStorage.getItem('hadithDiaData');
    const hadithSalvo = localStorage.getItem('hadithDia');

    // Usar o Hadith guardado se ainda for o mesmo dia
    if (diaSalvo === today && hadithSalvo) {
      try {
        hadithSelecionado = JSON.parse(hadithSalvo);
      } catch (e) {
        hadithSelecionado = null;
      }
    }

    // Se não houver Hadith salvo para hoje,
    // procurar o Hadith correspondente ao dia
    if (!hadithSelecionado) {
      hadithSelecionado = hadiths.find(
        h => String(h.dia) === today
      );

      // Se não existir para esse dia, escolher um aleatório
      if (!hadithSelecionado) {
        hadithSelecionado =
          hadiths[Math.floor(Math.random() * hadiths.length)];
      }

      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem(
        'hadithDiaData',
        today
      );
    }

    // Procurar os elementos na página
    const arabico = document.querySelector('.arabico');
    const traducao = document.querySelector('.traducao');
    const fonte = document.querySelector('.fonte');
    const reflexao = document.querySelector('.reflexao');

    // Se os elementos não existirem, não quebrar a página
    if (!arabico || !traducao || !fonte || !reflexao) {
      console.warn(
        'Elementos do Hadith do dia não encontrados no index.html.'
      );
      return;
    }

    // Mostrar Hadith
    arabico.textContent = hadithSelecionado.arabico || '';
    traducao.textContent = hadithSelecionado.traducao || '';
    fonte.textContent =
      `Fonte: ${hadithSelecionado.fonte || 'Desconhecida'}`;
    reflexao.textContent = hadithSelecionado.reflexao || '';

  } catch (error) {
    console.error('Erro no Hadith do dia:', error);

    const traducao = document.querySelector('.traducao');

    if (traducao) {
      traducao.textContent =
        'Não foi possível carregar o Hadith do dia.';
    }
  }
}
