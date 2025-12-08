const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", () => {
    if (window.scrollY > 250) {
        btnTopo.style.opacity = "1";
        btnTopo.style.pointerEvents = "auto";
    } else {
        btnTopo.style.opacity = "0";
        btnTopo.style.pointerEvents = "none";
    }
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("ativo");
    menu.classList.toggle("aberto");
});

// Fecha ao clicar em qualquer link
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        fecharMenu();
    });
});

// Fecha ao clicar fora do nav
document.addEventListener("click", (e) => {
    const clicouFora = !nav.contains(e.target);

    if (clicouFora && menu.classList.contains("aberto")) {
        fecharMenu();
    }
});

function fecharMenu() {
    menu.classList.remove("aberto");
    hamburger.classList.remove("ativo");
}