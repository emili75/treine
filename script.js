
const botoes = document.querySelectorAll(".menu-item");
const titulo = document.querySelector("#titulo-pagina");

const paginas = {
  inicio: {
    titulo: "Bem-vinda ao Treine!"
  },
  treinos: {
    titulo: "Meus treinos"
  },
  evolucao: {
    titulo: "Minha evolução"
  },
  calendario: {
    titulo: "Meu calendário"
  },
  perfil: {
    titulo: "Meu perfil"
  }
};

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    const pagina = botao.dataset.pagina;

    botoes.forEach((item) => {
      item.classList.remove("ativo");
    });

    botao.classList.add("ativo");
    titulo.textContent = paginas[pagina].titulo;
  });
});

console.log("Treine iniciado com sucesso! 💚");
