/* --------- CONFIGURAR AQUI: cole o link CSV público do Google Sheets --------- */
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlXWryJPJ3yN7GF8g4NOaM7FvbUw38jLbgApfcb0P46Y4YBwUr-GS7751R9zpR2n8_5JpuCo-EnsW2/pub?output=csv";

/* ----------------- Função simples para fazer escape de HTML (segurança) ----------------- */
function escapeHtml(s) {
  if (!s && s !== 0) return "";
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ----------------- Parser CSV que trata campos entre aspas ----------------- */
function parseCSV(text) {
  const rows = [];
  let cur = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"' ) {
      if (inQuotes && text[i+1] === '"') { // double quote inside quoted field -> add one quote
        cur += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(cur);
      cur = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      // handle CRLF and LF
      if (cur !== '' || row.length > 0) {
        row.push(cur);
        rows.push(row);
        row = [];
        cur = '';
      }
      // if CRLF eat next char when CR (\r) followed by LF (\n)
      if (ch === '\r' && text[i+1] === '\n') i++;
    } else {
      cur += ch;
    }
  }
  // push last
  if (cur !== '' || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }
  return rows;
}

/* ----------------- FUNÇÃO PRINCIPAL: busca CSV e renderiza cards ----------------- */
fetch(sheetUrl)
  .then(resp => {
    if (!resp.ok) throw new Error("Não foi possível buscar a planilha (verifique o link).");
    return resp.text();
  })
  .then(csvText => {
    const rows = parseCSV(csvText);

    if (rows.length <= 1) {
      document.getElementById("ebooks").innerHTML = "<p>Sem conteúdo postado. Em breve teremos diversos materiais</p>";
      return;
    }

    // assume header: title,description,pdf  (pode estar em ordem diferente — neste caso ajuste abaixo)
    const header = rows[0].map(h => h.trim().toLowerCase());
    const titleIdx = header.indexOf("title");
    const descIdx  = header.indexOf("description");
    const pdfIdx   = header.indexOf("pdf");

    if (titleIdx === -1 || descIdx === -1 || pdfIdx === -1) {
      document.getElementById("ebooks").innerHTML = "<p>O cabeçalho da planilha deve conter as colunas: title, description, pdf</p>";
      return;
    }

    const container = document.getElementById("ebooks");
    container.innerHTML = "";

    // percorrer a partir da segunda linha (dados)
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      // proteger caso linha curta
      const title = (row[titleIdx] || "").trim();
      const description = (row[descIdx] || "").trim();
      const pdf = (row[pdfIdx] || "").trim();

      if (!title) continue; // pula linhas vazias

      // criar card
      const card = document.createElement("div");
      card.className = "ebook"; // aproveita o CSS já existente

      const safeTitle = escapeHtml(title);
      const safeDesc = escapeHtml(description);
      const safePdf = escapeHtml(pdf);

      card.innerHTML = `
        <h2>${safeTitle}</h2>
        <p>${safeDesc}</p>
        <a href="${safePdf}" target="_blank" rel="noopener" download>Baixar Ebook</a>
      `;

      container.appendChild(card);
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("ebooks").innerHTML = `<p>Erro ao carregar ebooks: ${escapeHtml(err.message)}</p>`;
  });