
const treinos = {
  "Segunda": {
    foco: "Quadríceps + glúteo",
    exercicios: [
      ["Agachamento no Smith", "4x8-10"],
      ["Leg press 45°", "4x8-12"],
      ["Cadeira extensora", "4x10-15"],
      ["Elevação pélvica na máquina", "4x8-12"],
      ["Cadeira adutora", "3x12-15"],
      ["Panturrilha na máquina", "4x12-20"]
    ]
  },
  "Terça": {
    foco: "Costas + bíceps",
    exercicios: [
      ["Puxada frente na máquina", "4x8-12"],
      ["Remada articulada", "3x8-12"],
      ["Desenvolvimento de ombros na máquina", "3x10-12"],
      ["Bíceps na máquina", "3x10-12"],
      ["Abdominal na máquina", "3x12-15"]
    ]
  },
  "Quarta": {
    foco: "Posterior + glúteo",
    exercicios: [
      ["Flexora deitada", "4x8-12"],
      ["Flexora sentada", "3x10-12"],
      ["Leg press com pés altos", "3x10-12"],
      ["Glúteo na máquina", "3x10-15 cada perna"],
      ["Abdutora", "4x15-20"],
      ["Panturrilha sentada", "4x15-20"]
    ]
  },
  "Quinta": {
    foco: "Peito + ombro + tríceps",
    exercicios: [
      ["Chest press", "4x8-12"],
      ["Elevação lateral na máquina", "3x12-15"],
      ["Remada articulada ou puxada", "3x10-12"],
      ["Tríceps na máquina ou polia", "3x10-12"],
      ["Abdominal na máquina", "3x12-15"]
    ]
  },
  "Sexta": {
    foco: "Glúteo completo",
    exercicios: [
      ["Elevação pélvica na máquina", "5x6-10"],
      ["Hack squat", "4x8-10"],
      ["Leg press unilateral", "3x10 cada perna"],
      ["Glúteo na máquina", "3x12-15"],
      ["Abdutora", "3x15-20"],
      ["Adutora", "3x12-15"]
    ]
  }
};

const conteudo = document.querySelector(".conteudo");
const botoesMenu = document.querySelectorAll(".menu-item");

function inicio() {
  conteudo.innerHTML = `
    <header>
      <p class="subtitulo">MEU PAINEL</p>
      <h2>Bem-vinda ao Treine! 💚</h2>
      <p>Seu treino, sua evolução, no seu ritmo.</p>
    </header>
    <section class="cartoes">
      <article class="cartao">
        <span>🏋️</span>
        <h3>Meus treinos</h3>
        <p>Seus exercícios organizados por dia.</p>
      </article>
      <article class="cartao">
        <span>📸</span>
        <h3>Fotos dos exercícios</h3>
        <p>Uma foto específica para cada exercício.</p>
      </article>
      <article class="cartao">
        <span>🎥</span>
        <h3>Vídeos dos exercícios</h3>
        <p>Seus vídeos escolhidos por você.</p>
      </article>
    </section>
    <section class="destaque">
      <h2>Um treino de cada vez 💚</h2>
      <p>Entre em “Meus treinos” para ver sua semana.</p>
    </section>`;
}

function mostrarTreinos(diaSelecionado = "Segunda") {
  const dias = Object.keys(treinos);

  conteudo.innerHTML = `
    <header>
      <p class="subtitulo">MINHA ROTINA</p>
      <h2>Meus treinos 🏋️</h2>
      <p>Escolha o dia e consulte cada exercício.</p>
    </header>
    <div class="dias-treino">
      ${dias.map(dia => `
        <button class="botao-dia ${dia === diaSelecionado ? "selecionado" : ""}"
          data-dia="${dia}">${dia}</button>
      `).join("")}
    </div>
    <section id="lista-exercicios"></section>`;

  document.querySelectorAll(".botao-dia").forEach(botao => {
    botao.addEventListener("click", () => {
      mostrarTreinos(botao.dataset.dia);
    });
  });

  const treino = treinos[diaSelecionado];
  const lista = document.querySelector("#lista-exercicios");

  lista.innerHTML = `
    <div class="titulo-treino">
      <h2>${diaSelecionado} 💚</h2>
      <p>Foco: ${treino.foco}</p>
    </div>
    <div class="lista-cartoes">
      ${treino.exercicios.map(([nome, series], indice) => {
        const numero = String(indice + 1).padStart(2, "0");
        const slug = nome.normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

        return `
          <article class="exercicio">
            <div class="exercicio-cabecalho">
              <span class="numero">${numero}</span>
              <div>
                <h3>${nome}</h3>
                <p class="series">Séries e repetições: ${series}</p>
              </div>
            </div>

            <div class="midia-grade">
              <div class="midia">
                <p>📸 Foto do exercício</p>
                <img
                 src="${({
  "Agachamento no Smith": "Smith.jpg",
  "Leg press 45°": "Leg%20Press.jpg",
  "Cadeira extensora": "Cadeira%20Extensora.jpg",
  "Elevação pélvica na máquina": "Elava%C3%A7%C3%A3o%20P%C3%A9lvica%20na%20M%C3%A1quina.jpg",
  "Cadeira adutora": "Cadeira%20Adutora.jpg",
  "Panturrilha na máquina": "Panturrilha.jpg"
})[nome] || `fotos/${slug}.jpg`}"
                  alt="Foto de ${nome}"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                <div class="midia-vazia">Sua foto aparecerá aqui</div>
              </div>

              <div class="midia">
                <p>🎥 Vídeo do exercício</p>
                <video controls preload="none"
                  src="videos/${slug}.mp4"
                  onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                </video>
                <div class="midia-vazia">Seu vídeo aparecerá aqui</div>
              </div>
            </div>
          </article>`;
      }).join("")}
    </div>`;
}

function mostrarPagina(pagina) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.pagina === pagina);
  });

  if (pagina === "inicio") {
    inicio();
  } else if (pagina === "treinos") {
    mostrarTreinos();
  } else if (pagina === "evolucao") {
    conteudo.innerHTML = `
      <header><p class="subtitulo">MEU PROGRESSO</p>
      <h2>Minha evolução 📈</h2>
      <p>Aqui vamos organizar suas cargas e seus resultados.</p></header>
      <section class="destaque"><h2>Seu progresso começa aqui 💚</h2>
      <p>Podemos adicionar um registro de cargas em uma próxima etapa.</p></section>`;
  } else if (pagina === "calendario") {
    conteudo.innerHTML = `
      <header><p class="subtitulo">MINHA ROTINA</p>
      <h2>Calendário 📅</h2>
      <p>Veja como seus treinos estão organizados.</p></header>
      <div class="dias-calendario">
        ${Object.entries(treinos).map(([dia, treino]) => `
          <button class="cartao dia-calendario" data-dia="${dia}">
            <h3>${dia}</h3><p>${treino.foco}</p>
          </button>`).join("")}
      </div>`;

    document.querySelectorAll(".dia-calendario").forEach(botao => {
      botao.addEventListener("click", () => {
        mostrarPagina("treinos");
        mostrarTreinos(botao.dataset.dia);
      });
    });
  } else if (pagina === "perfil") {
    conteudo.innerHTML = `
      <header><p class="subtitulo">MEU ESPAÇO</p>
      <h2>Meu perfil 👤</h2>
      <p>Seu espaço pessoal no Treine.</p></header>
      <section class="destaque"><h2>Continue no seu ritmo 💚</h2>
      <p>Em breve, podemos adicionar suas metas e preferências.</p></section>`;
  }
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    mostrarPagina(botao.dataset.pagina);
  });
});

mostrarPagina("inicio");
