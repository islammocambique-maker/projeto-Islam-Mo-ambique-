export async function loadHadith() {
  const response = await fetch('data/hadiths.json');
  const hadiths = await response.json();

  // Obter o dia do Hadith
  const today = new Date().getDate().toString();

  // Verificar se já existe um Hadith salvo na memória
  let hadithDia = localStorage.getItem('hadithDia');
  let diaSalvo = localStorage.getItem('diaSalvo');

  if (diaSalvo !== today || !hadithDia) {
    // Selecionar aleatoriamente ou sequencialmente
    const index = hadiths.findIndex(h => h.dia === today);
    let hadithSelecionado;
    if (index !== -1) {
      hadithSelecionado = hadiths[index];
    } else {
      // Se não encontrar, pegar aleatório
      hadithSelecionado = hadiths[Math.floor(Math.random() * hadiths.length)];
    }
    localStorage.setItem('hadithDia', JSON.stringify(hadithSelecionado));
    localStorage.setItem('diaSalvo', today);
  } else {
    hadithSelecionado = JSON.parse(hadithDia);
  }

  // Mostrar na tela
  document.querySelector('.arabico').textContent = hadithSelecionado.arabico;
  document.querySelector('.traducao').textContent = hadithSelecionado.traducao;
  document.querySelector('.fonte').textContent = `Fonte: ${hadithSelecionado.fonte}`;
  document.querySelector('.reflexao').textContent = hadithSelecionado.reflexao;
}
