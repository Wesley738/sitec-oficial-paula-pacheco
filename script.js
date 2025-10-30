const btnToggle = document.getElementById("toggleDepoimentos");
const depoimentos = document.getElementById("depoimentos");

btnToggle.addEventListener("click", () => {
    depoimentos.classList.toggle("expandido");

    if (depoimentos.classList.contains("expandido")) {
      btnToggle.textContent = "Ver Menos";
    } else {
      btnToggle.textContent = "Ver Mais";
      // scroll suave pra voltar a seção ao topo
      depoimentos.scrollIntoView({ behavior: "smooth", block: "start" });
    }
});