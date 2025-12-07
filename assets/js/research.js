// Simple client-side "research hub" state using localStorage

const STORAGE_KEY_NOTES = "research_notes_v1";
const STORAGE_KEY_STATUS = "research_status_v1";

// Example initial data - bạn có thể chỉnh sửa / thêm theo ý
const initialArticles = [
  {
    id: "paper-1",
    title: "Understanding the Event Loop in JavaScript",
    author: "MDN / JS Community",
    type: "blog",
    status: "reading",
    tags: ["JavaScript", "Concurrency", "Runtime"],
  },
  {
    id: "paper-2",
    title: "A Brief Introduction to Neural Networks",
    author: "Research Blog",
    type: "paper",
    status: "queue",
    tags: ["AI", "Machine Learning", "Theory"],
  },
  {
    id: "paper-3",
    title: "REST vs GraphQL for Web APIs",
    author: "Technical Article",
    type: "blog",
    status: "queue",
    tags: ["API", "Backend", "Architecture"],
  },
  {
    id: "paper-4",
    title: "Clean Architecture for Web Applications",
    author: "Software Engineering Notes",
    type: "doc",
    status: "done",
    tags: ["Architecture", "Best Practices"],
  },
];

let articles = [...initialArticles];
let notes = {};
let activeStatusFilter = "all";
let activeTypeFilter = null;
let activeArticleId = null;

function loadFromStorage() {
  try {
    const notesRaw = localStorage.getItem(STORAGE_KEY_NOTES);
    const statusRaw = localStorage.getItem(STORAGE_KEY_STATUS);
    if (notesRaw) {
      notes = JSON.parse(notesRaw);
    }
    if (statusRaw) {
      const statusMap = JSON.parse(statusRaw);
      articles = articles.map((a) =>
        statusMap[a.id] ? { ...a, status: statusMap[a.id] } : a
      );
    }
  } catch (e) {
    console.warn("Cannot load research data from localStorage", e);
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
  } catch (e) {
    console.warn("Cannot save notes", e);
  }
}

function saveStatus() {
  try {
    const map = {};
    articles.forEach((a) => {
      map[a.id] = a.status;
    });
    localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(map));
  } catch (e) {
    console.warn("Cannot save status", e);
  }
}

function render() {
  const queueList = document.getElementById("queueList");
  const readingList = document.getElementById("readingList");
  const doneList = document.getElementById("doneList");
  const searchValue = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  queueList.innerHTML = "";
  readingList.innerHTML = "";
  doneList.innerHTML = "";

  articles.forEach((article) => {
    // status filter
    if (activeStatusFilter !== "all" && article.status !== activeStatusFilter) {
      return;
    }
    // type filter
    if (activeTypeFilter && article.type !== activeTypeFilter) {
      return;
    }
    // search filter
    if (searchValue) {
      const haystack = (
        article.title +
        " " +
        article.author +
        " " +
        article.tags.join(" ")
      ).toLowerCase();
      if (!haystack.includes(searchValue)) return;
    }

    const card = document.createElement("article");
    card.className = "research-card";
    card.dataset.id = article.id;
    card.innerHTML = `
      <div class="research-card-title">${article.title}</div>
      <div class="research-card-meta">
        ${article.author} · ${article.type.toUpperCase()}
      </div>
      <div class="research-tags">
        <span class="research-tag tag-type-${article.type}">${article.type}</span>
        ${article.tags
          .map((tag) => `<span class="research-tag">${tag}</span>`)
          .join("")}
      </div>
    `;

    card.addEventListener("click", () => {
      activeArticleId = article.id;
      const titleEl = document.getElementById("notesArticleTitle");
      const textarea = document.getElementById("notesTextarea");
      titleEl.textContent = `${article.title} — ${article.author}`;
      textarea.value = notes[article.id] || "";
    });

    if (article.status === "queue") queueList.appendChild(card);
    if (article.status === "reading") readingList.appendChild(card);
    if (article.status === "done") doneList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();

  // Filters
  const statusButtons = document.querySelectorAll(".filter-pill[data-status]");
  statusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      statusButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatusFilter = btn.dataset.status;
      render();
    });
  });

  const typeButtons = document.querySelectorAll(".filter-pill[data-type]");
  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (activeTypeFilter === btn.dataset.type) {
        // toggle off
        activeTypeFilter = null;
        typeButtons.forEach((b) => b.classList.remove("active"));
      } else {
        activeTypeFilter = btn.dataset.type;
        typeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
      render();
    });
  });

  // Search
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    render();
  });

  // Save notes
  const saveBtn = document.getElementById("saveNotesButton");
  const notesStatus = document.getElementById("notesSavedStatus");
  saveBtn.addEventListener("click", () => {
    if (!activeArticleId) {
      notesStatus.textContent = "Chọn một bài trước khi lưu ghi chú.";
      return;
    }
    const textarea = document.getElementById("notesTextarea");
    notes[activeArticleId] = textarea.value || "";
    saveNotes();
    notesStatus.textContent = "Đã lưu ghi chú (local).";
    setTimeout(() => {
      notesStatus.textContent = "";
    }, 2000);
  });

  // Initial render
  render();
});


