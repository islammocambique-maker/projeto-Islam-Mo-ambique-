```javascript
// ==========================================
// HADITH DO DIA - ISLAM MOÇAMBIQUE
// ==========================================

export async function loadHadith() {

  try {

    // ==========================================
    // CARREGAR HADITHS
    // Caminho relativo, compatível com GitHub Pages
    // ==========================================

    const response = await fetch(
      './data/hadiths.json',
      {
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status} ao carregar data/hadiths.json`
      );
    }

    const hadiths = await response.json();

    // ==========================================
    // VALIDAR FICHEIRO JSON
    // ==========================================

    if (!Array.isArray(hadiths) || hadiths.length === 0) {
      throw new Error(
        'hadiths.json não contém Hadiths válidos.'
      );
    }

    // ==========================================
    // DATA ATUAL
    // ==========================================

    const hoje = new Date();

    const diaAtual = hoje.getDate().toString();

    // ==========================================
    // LOCALSTORAGE
    // ==========================================

    let hadithSalvo =
      localStorage.getItem('hadithDia');

    let diaSalvo =
      localStorage.getItem('diaSalvo');

    let hadithSelecionado = null;


    // ==========================================
    // VERIFICAR SE É UM NOVO DIA
    // ==========================================

    if (
      diaSalvo !== diaAtual ||
      !hadithSalvo
    ) {

      // Procurar Hadith correspondente ao dia
      hadithSelecionado = hadiths.find(
        hadith =>
          String(hadith.dia) === diaAtual
      );


      // ==========================================
      // CASO NÃO EXISTA HADITH PARA O DIA
      // ==========================================

      if (!hadithSelecionado) {

        hadithSelecionado =
          hadiths[
            Math.floor(
              Math.random() * hadiths.length
            )
          ];

      }


      // ==========================================
      // GUARDAR HADITH
      // ==========================================

      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem(
        'diaSalvo',
        diaAtual
      );

    } else {

      // ==========================================
      // RECUPERAR HADITH GUARDADO
      // ==========================================

      try {

        hadithSelecionado =
          JSON.parse(hadithSalvo);

      } catch (erro) {

        console.warn(
          'LocalStorage corrompido. Selecionando novo Hadith.'
        );

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
    // ELEMENTOS DO HTML
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
    // VERIFICAR SE O HADITH É VÁLIDO
    // ==========================================

    if (!hadithSelecionado) {
      throw new Error(
        'Não foi possível selecionar um Hadith.'
      );
    }


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
        hadithSelecionado.fonte
          ? `Fonte: ${hadithSelecionado.fonte}`
          : '';

    }

    if (reflexao) {

      reflexao.textContent =
        hadithSelecionado.reflexao || '';

    }


    // ==========================================
    // CONSOLE
    // ==========================================

    console.log(
      '✅ Hadith do dia carregado:',
      hadithSelecionado
    );

  } catch (error) {

    console.error(
      '❌ Erro ao carregar Hadith:',
      error
    );


    // ==========================================
    // MENSAGEM DE ERRO NA PÁGINA
    // ==========================================

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
        'Verifique o ficheiro data/hadiths.json.';

    }

    if (fonte) {

      fonte.textContent = '';

    }

    if (reflexao) {

      reflexao.textContent = '';

    }

  }

}
```
