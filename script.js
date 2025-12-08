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
const overlay = document.getElementById("menu-overlay");

hamburger.addEventListener("click", () => {
    const ativo = hamburger.classList.toggle("ativo");
    menu.classList.toggle("aberto", ativo);
    overlay.classList.toggle("ativo", ativo);
});

// Fecha ao clicar em qualquer link
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        fecharMenu();
    });
});

// Fecha ao clicar fora do menu (no overlay)
overlay.addEventListener("click", fecharMenu);

function fecharMenu() {
    menu.classList.remove("aberto");
    hamburger.classList.remove("ativo");
    overlay.classList.remove("ativo");
}