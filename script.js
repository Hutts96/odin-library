function Book(title = "No title", author = "No author", nrOfPages = 0, isRead = true) {
    this.title = title;
    this.author = author;
    this.nrOfPages = nrOfPages;
    this.isRead = isRead;
}

function addBookToLibrary(library, book) {
    library.push(book);
    refresh(library);
}

function makeCard(book, id, library) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = id;

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = book.title;

    const author = document.createElement("div");
    author.className = "card-author";
    author.textContent = `by ${book.author}`;

    const nrOfPages = document.createElement("div");
    nrOfPages.className = "card-pages";
    nrOfPages.textContent = `${book.nrOfPages} pages`;

    const isRead = document.createElement("div");
    isRead.className = "card-read";
    isRead.textContent = (book.isRead ? "read" : "not yet read");

    const changeReadButton = document.createElement("button");
    changeReadButton.className = "change-read-button";
    changeReadButton.id = id;
    changeReadButton.textContent = "Change read status";
    changeReadButton.addEventListener("click", (event) => changeReadStatusOfBook(event.target.id, library));

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.id = id;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => deleteBook(event.target.id, library));

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(nrOfPages);
    card.appendChild(isRead);
    card.appendChild(changeReadButton);
    card.appendChild(deleteButton);
    return card;

}

function displayLibrary(library) {
    for (let i = 0; i < library.length; i++) {
        cards.appendChild(makeCard(library[i], i, library))
    }
}

function deleteBook(id, library) {
    library.splice(id, 1);
    refresh(library);
}

function changeReadStatusOfBook(id, library) {
    library[id].isRead = !library[id].isRead;
    refresh(library);
}

function refresh(library) {
    cards.innerHTML = "";
    displayLibrary(library);
}

let myLibrary = [];
const cards = document.querySelector(".cards-container");
const dialog = document.querySelector("dialog");
const createButton = document.querySelector(".create-button");
const closeButton = document.querySelector(".close-button");
const confirmButton = document.querySelector(".confirm-button");
const dialogTitle = document.querySelector(".dialog-book-title");
const dialogAuthor = document.querySelector(".dialog-book-author");
const dialogPages = document.querySelector(".dialog-book-pages");
const dialogRead = document.querySelector(".dialog-book-read");

createButton.addEventListener("click", () => { dialog.showModal(); });
closeButton.addEventListener("click", () => { dialog.close(); });
confirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    let temp = new Book(
        dialogTitle.value,
        dialogAuthor.value,
        dialogPages.value,
        dialogRead.value === "true"
    );
    addBookToLibrary(myLibrary, temp);
    dialog.close();
});