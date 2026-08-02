```javascript
// ==========================================
// HADITH DO DIA - ISLAM MOÇAMBIQUE
// ==========================================

async function loadHadith() {

  try {

    // Caminho correto para o GitHub Pages
    const caminhoHadith =
      '/projeto-Islam-Mocambique-/data/hadiths.json';

    const response = await fetch(caminhoHadith, {
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status} ao carregar hadiths.json`
      );
    }

    const hadiths = await response.json();

    if (!Array.isArray(hadiths) || hadiths.length === 0) {
      throw new Error('Nenhum Hadith encontrado.');
    }

    // Dia atual do mês
    const today = new Date().getDate().toString();

    let hadithDia =
      localStorage.getItem('hadithDia');

    let diaSalvo =
      localStorage.getItem('diaSalvo');

    let hadithSelecionado;


    // ==========================================
    // VERIFICAR SE É UM NOVO DIA
    // ==========================================

    if (diaSalvo !== today || !hadithDia) {

      // Procurar Hadith correspondente ao dia
      const encontrado = hadiths.find(
        hadith => String(hadith.dia) === today
      );


      if (encontrado) {

        hadithSelecionado = encontrado;

      } else {

        // Se não existir Hadith para aquele dia,
        // escolher um aleatoriamente
        hadithSelecionado =
          hadiths[
            Math.floor(
              Math.random() * hadiths.length
            )
          ];
      }


      // Guardar o Hadith escolhido
      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem(
        'diaSalvo',
        today
      );

    } else {

      // Recuperar o Hadith já guardado
      try {

        hadithSelecionado =
          JSON.parse(hadithDia);

      } catch (erro) {

        // Se o LocalStorage estiver corrompido,
        // escolher novamente
        hadithSelecionado =
          hadiths[
            Math.floor(
              Math.random() * hadiths.length
            )
          ];

        localStorage.setItem(
          'hadithDia',
          JSON.stringify(hadithSelecionado)
        );
      }
    }


    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const arabico =
      document.querySelector('.arabico');

    const traducao =
      document.querySelector('.traducao');

    const fonte =
      document.querySelector('.fonte');

    const reflexao =
      document.querySelector('.reflexao');


    // ==========================================
    // MOSTRAR HADITH
    // ==========================================

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
      'Hadith do dia carregado:',
      hadithSelecionado
    );

  } catch (error) {

    console.error(
      'Erro ao carregar Hadith:',
      error
    );

    // Mostrar uma mensagem apenas se
    // os elementos existirem
    const arabico =
      document.querySelector('.arabico');

    const traducao =
      document.querySelector('.traducao');

    const fonte =
      document.querySelector('.fonte');

    const reflexao =
      document.querySelector('.reflexao');

    if (arabico) {
      arabico.textContent =
        'Não foi possível carregar o Hadith.';
    }

    if (traducao) {
      traducao.textContent =
        'Verifique a ligação à internet e tente novamente.';
    }

    if (fonte) {
      fonte.textContent = '';
    }

    if (reflexao) {
      reflexao.textContent = '';
    }
  }
}


// ==========================================
// INICIAR QUANDO A PÁGINA ESTIVER PRONTA
// ==========================================

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    loadHadith
  );

} else {

  loadHadith();

}
```
