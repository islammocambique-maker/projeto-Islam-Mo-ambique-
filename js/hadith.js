async function loadHadith() {
  try {
    const response = await fetch('./data/hadiths.json');

    if (!response.ok) {
      throw new Error('Erro ao carregar hadiths.json');
    }

    const hadiths = await response.json();

    const hoje = new Date();
    const diaDoMes = hoje.getDate().toString();

    let hadithSelecionado;

    // Verifica se já existe um Hadith guardado para hoje
    const salvo = localStorage.getItem('hadithDia');
    const diaSalvo = localStorage.getItem('diaSalvo');

    if (salvo && diaSalvo === diaDoMes) {

      hadithSelecionado = JSON.parse(salvo);

    } else {

      // Procura o Hadith correspondente ao dia
      hadithSelecionado = hadiths.find(
        hadith => String(hadith.dia) === diaDoMes
      );

      // Se não existir, escolhe um aleatório
      if (!hadithSelecionado) {
        hadithSelecionado =
          hadiths[Math.floor(Math.random() * hadiths.length)];
      }

      localStorage.setItem(
        'hadithDia',
        JSON.stringify(hadithSelecionado)
      );

      localStorage.setItem(
        'diaSalvo',
        diaDoMes
      );
    }

    // Mostrar Hadith
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
        'Fonte: ' + hadithSelecionado.fonte;
    }

    if (reflexao) {
      reflexao.textContent = hadithSelecionado.reflexao;
    }

  } catch (erro) {

    console.error('Erro no Hadith do Dia:', erro);

    const traducao = document.querySelector('.traducao');

    if (traducao) {
      traducao.textContent =
        'Não foi possível carregar o Hadith.';
    }
  }
}


// Executar automaticamente
loadHadith();
