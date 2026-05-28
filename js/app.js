(function () {
  "use strict";

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatDateBadge(start, end) {
    if (start.month === end.month) {
      return `${start.month}月${start.day}日-${end.day}日`;
    }
    return `${start.month}月${start.day}日-${end.month}月${end.day}日`;
  }

  function renderHeader() {
    const line1 = document.getElementById("schedule-title-line1");
    const line2 = document.getElementById("schedule-title-line2");
    const dateEl = document.getElementById("schedule-date");
    if (line1 && SCHEDULE_CONFIG.titleLine1) {
      line1.textContent = SCHEDULE_CONFIG.titleLine1;
    }
    if (line2 && SCHEDULE_CONFIG.titleLine2) {
      line2.textContent = SCHEDULE_CONFIG.titleLine2;
    }
    if (dateEl && SCHEDULE_CONFIG.rangeStart && SCHEDULE_CONFIG.rangeEnd) {
      dateEl.textContent = formatDateBadge(
        SCHEDULE_CONFIG.rangeStart,
        SCHEDULE_CONFIG.rangeEnd
      );
    }
  }

  function cellHtml(col, row) {
    const value = row[col.key];
    if (value == null) return "";
    if (col.key === "lastReturn") {
      const extra = row.returnType === "first" ? " is-first" : " is-normal";
      return `<td class="${col.className}${extra}">${escapeHtml(value)}</td>`;
    }
    return `<td class="${col.className}">${escapeHtml(value)}</td>`;
  }

  function termCellHtml(col, row) {
    if (row.termRowspan && row.term) {
      return `<td class="${col.className}" rowspan="${row.termRowspan}">${escapeHtml(row.term)}</td>`;
    }
    if (row.term) {
      return `<td class="${col.className}">${escapeHtml(row.term)}</td>`;
    }
    return "";
  }

  function renderProductSections() {
    const container = document.getElementById("product-sections");
    if (!container) return;

    container.innerHTML = PRODUCT_SECTIONS.map((section) => {
      const thead = TABLE_COLUMNS.map(
        (c) => `<th class="${c.className}">${escapeHtml(c.label)}</th>`
      ).join("");

      const tbody = section.products
        .map((row) => {
          const tds = TABLE_COLUMNS.map((col) => {
            if (col.key === "term") return termCellHtml(col, row);
            return cellHtml(col, row);
          }).join("");
          return `<tr>${tds}</tr>`;
        })
        .join("");

      return (
        `<article class="card" id="${escapeHtml(section.id)}">` +
        `<h2 class="card__title">${escapeHtml(section.title)}</h2>` +
        `<div class="card__body">` +
        `__CARD_BODY__` +
        `</div></article>`
      )
        .replace(
          "__CARD_BODY__",
          `<div class="table-wrap">` +
            `<table class="product-table" aria-label="${escapeHtml(section.title)}">` +
            `<thead><tr>${thead}</tr></thead>` +
            `<tbody>${tbody}</tbody>` +
            `</table></div>` +
            `<p class="card__note">${escapeHtml(CARD_NOTE)}</p>`
        );
    }).join("");
  }

  function renderTips() {
    const list = document.getElementById("tips-list");
    if (!list) return;

    list.innerHTML = TIPS_ITEMS.map((item, index) => {
      const n = index + 1;
      if (typeof item === "string") {
        return `<li>${n}. ${escapeHtml(item)}</li>`;
      }
      return `<li>${n}. ${escapeHtml(item.text)}<span class="em-red">${escapeHtml(item.emphasis)}</span></li>`;
    }).join("");
  }

  function init() {
    renderHeader();
    renderProductSections();
    renderTips();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
