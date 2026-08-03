```javascript
// ==========================================
// HADITH DO DIA - ISLAM MOÇAMBIQUE
// ==========================================

export async function loadHadith() {

  try {

    console.log('🔵 Iniciando Hadith do Dia...');

    // ==========================================
    // CARREGAR JSON
    // ==========================================

    const response = await fetch('./data/hadiths.json');

    console.log(
      '📡 Resposta hadiths.json:',
      response.status,
      response.url
    );

    if (!response.ok) {
      throw new Error(
        `Erro HTTP ${response.status}: ${response.statusText}`
      );
    }

    const hadiths = await response.json();

    console.log('📖 Hadiths carregados:', hadiths);


    // ==========================================
    // VALIDAR JSON
    // ==========================================

    if (!Array.isArray(hadiths) || hadiths.length === 0) {
      throw new Error(
        'O ficheiro hadiths.json está vazio ou inválido.'
      );
    }


    // ==========================================
    // DIA ATUAL
    // ==========================================

    const diaAtual = new Date().getDate().toString();

    console.log(
      '📅 Dia atual:',
      diaAtual
    );


    // ==========================================
    // PROCURAR HADITH DO DIA
    // ==========================================

    let hadithSelecionado = hadiths.find(
      hadith =>
        String(hadith.dia) === diaAtual
    );


    // ==========================================
    // SE NÃO EXISTIR, USAR UM HADITH
    // ==========================================

    if (!hadithSelecionado) {

      const indice =
        (new Date().getDate() - 1) % hadiths.length;

      hadithSelecionado =
        hadiths[indice];

    }


    console.log(
      '✅ Hadith selecionado:',
      hadithSelecionado
    );


    // ==========================================
    // ENCONTRAR ELEMENTOS DO HTML
    // ==========================================

    const arabico =
      document.querySelector('.arabico');

    const traducao =
      document.querySelector('.traducao');

    const fonte =
      document.querySelector('.fonte');

    const reflexao =
      document.querySelector('.reflexao');


    console.log({
      arabico,
      traducao,
      fonte,
      reflexao
    });


    // ==========================================
    // VERIFICAR ELEMENTOS
    // ==========================================

    if (!arabico ||
        !traducao ||
        !fonte ||
        !reflexao) {

      throw new Error(
        'Os elementos do Hadith não foram encontrados no index.html.'
      );

    }


    // ==========================================
    // MOSTRAR HADITH
    // ==========================================

    arabico.textContent =
      hadithSelecionado.arabico || '';

    traducao.textContent =
      hadithSelecionado.traducao || '';

    fonte.textContent =
      `Fonte: ${hadithSelecionado.fonte || ''}`;

    reflexao.textContent =
      hadithSelecionado.reflexao || '';


    console.log(
      '🎉 Hadith do Dia exibido com sucesso!'
    );

  }

  catch (erro) {

    console.error(
      '❌ ERRO NO HADITH DO DIA:',
      erro
    );


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
        'Erro ao carregar o Hadith.';
    }

    if (traducao) {
      traducao.textContent =
        'Verifique a ligação com o ficheiro hadiths.json.';
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
