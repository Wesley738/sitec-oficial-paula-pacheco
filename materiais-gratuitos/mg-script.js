const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlXWryJPJ3yN7GF8g4NOaM7FvbUw38jLbgApfcb0P46Y4YBwUr-GS7751R9zpR2n8_5JpuCo-EnsW2/pub?output=csv";

fetch(sheetUrl)
    .then(response => response.text())
    .then(csv => {
        const rows = csv.split("\n").slice(1); // Ignora cabeçalho
        const container = document.getElementById("ebooks");

        rows.forEach(row => {
            const [title, description, image, pdf] = row.split(",");

            if(!title) return; // evita linha vazia

            const ebookDiv = document.createElement("div");
            ebookDiv.className = "ebook";

            ebookDiv.innerHTML = `
                <img src="${image.trim()}" alt="${title}">
                <h2>${title}</h2>
                <p>${description}</p>
                <a href="${pdf.trim()}" download>Baixar Ebook</a>
            `;

            container.appendChild(ebookDiv);
        });
    });