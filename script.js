
console.log("Treine iniciado com sucesso! 💚");

document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector("h1");

  if (titulo) {
    titulo.addEventListener("click", () => {
      alert("Vamos evoluir juntas! 💪💚");
    });
  }
});
