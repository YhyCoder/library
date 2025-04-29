const library = document.querySelector(".library");
const modalWrapper = document.querySelector(".modal-wrapper");
const newBookButton = document.querySelector(".header__button");
const modalCloseButton = document.querySelector(".modal__close");
const modalCancelButton = document.querySelector(".modal__cancel");
const modalAddButton = document.querySelector(".modal__add");
const modalInputs = document.querySelectorAll(".modal__input");
const switchCheckbox = document.querySelector(".switch__checkbox");

const myLibrary = [
  {
    id: crypto.randomUUID(),
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: 223,
    readStatus: "Not read yet",
  },
  {
    id: crypto.randomUUID(),
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 240,
    readStatus: "Read",
  },
  {
    id: crypto.randomUUID(),
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    readStatus: "Read",
  },
];

function Book(id, title, author, pages, readStatus) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, pages, readStatus);
  myLibrary.push(book);
}

function addNewBook() {
  let title;
  let author;
  let pages;
  let readStatus;

  modalInputs.forEach((input) => {
    if (input.id === "book-title") {
      title = input.value;
    } else if (input.id === "book-author") {
      author = input.value;
    } else if (input.id === "book-pages") {
      pages = Number(input.value);
    }
  });

  // check that the inputs are not empty
  if (!title || !author || !pages) {
    alert("Please fill all the fields!");
    return;
  }

  if (switchCheckbox.checked) {
    readStatus = "Read";
  } else {
    readStatus = "Not read yet";
  }

  addBookToLibrary(title, author, pages, readStatus);
  return true;
}

// create 3 book__info for Author, Pages and Status
function createBookInfo(heading, info, infoClass) {
  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book__info");

  const bookHeading = document.createElement("h3");
  bookHeading.textContent = heading;

  const bookInfoItem = document.createElement("span");
  bookInfoItem.classList.add(infoClass);
  bookInfoItem.textContent = info;

  bookInfo.appendChild(bookHeading);
  bookInfo.appendChild(bookInfoItem);

  return bookInfo;
}

function createBookCard(book) {
  // book
  const bookCard = document.createElement("section");
  bookCard.classList.add("book");
  bookCard.id = book.id;
  library.appendChild(bookCard);

  // book__title
  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("book__title");
  bookTitle.textContent = book.title;
  bookCard.appendChild(bookTitle);

  // book__info parent
  const bookInfoWrapper = document.createElement("div");
  bookCard.appendChild(bookInfoWrapper);

  // book__info
  bookInfoWrapper.appendChild(
    createBookInfo("Author:", book.author, "book__author")
  );
  bookInfoWrapper.appendChild(
    createBookInfo("Pages:", book.pages, "book__pages")
  );
  bookInfoWrapper.appendChild(
    createBookInfo("Status:", book.readStatus, "book__read")
  );

  // book__buttons
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("book__buttons");
  bookCard.appendChild(buttonWrapper);

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("button");
  deleteButton.classList.add("delete-book");
  deleteButton.textContent = "Delete";

  // read status button
  const readStatusButton = document.createElement("button");
  readStatusButton.type = "button";
  readStatusButton.classList.add("button");
  readStatusButton.classList.add("read-book");

  // Changes the content of the read status button to status heading.
  if (book.readStatus === "Read") {
    readStatusButton.textContent = "Not Read";
    readStatusButton.classList.add("button--error");
  } else {
    readStatusButton.textContent = "Read";
    readStatusButton.classList.add("button--success");
  }

  buttonWrapper.appendChild(deleteButton);
  buttonWrapper.appendChild(readStatusButton);
}

// reset modal input when use modal buttons
function resetModalInput() {
  modalInputs.forEach((input) => {
    input.value = "";
  });
  switchCheckbox.checked = false;
}

// close modal window when use modal buttons
function closeModal() {
  resetModalInput();
  modalWrapper.classList.add("hidden");
}

// delete book card
function handleDeleteButton(book, bookIndex) {
  myLibrary.splice(bookIndex, 1);
  library.removeChild(book);
}

// change book read status
function handleReadButton(book, bookIndex, button) {
  const readStatusSpan = book.querySelector(".book__read");
  const isRead = myLibrary[bookIndex].readStatus === "Read";

  button.textContent = isRead ? "Read" : "Not Read";
  button.classList.toggle("button--error", !isRead);
  button.classList.toggle("button--success", isRead);

  myLibrary[bookIndex].readStatus = isRead ? "Not read yet" : "Read";
  readStatusSpan.textContent = myLibrary[bookIndex].readStatus;
}

// display available book in the array
function displayBook() {
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}

// open and close modal window
newBookButton.addEventListener("click", () => {
  modalWrapper.classList.remove("hidden");
  const titleInput = document.querySelector("#book-title");
  titleInput.focus();
});

// use x icon to close modal window
modalCloseButton.addEventListener("click", closeModal);

// cancel adding book in modal window
modalCancelButton.addEventListener("click", closeModal);

// add new book to library
modalAddButton.addEventListener("click", (event) => {
  event.preventDefault();
  const isBookAdded = addNewBook();
  if (isBookAdded) {
    const newBook = myLibrary[myLibrary.length - 1];
    createBookCard(newBook);
    closeModal();
  }
});

// add delete and change reading status for book card
library.addEventListener("click", (event) => {
  const bookCard = event.target.closest(".book");
  const bookId = bookCard.id;
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

  if (event.target.classList.contains("delete-book")) {
    handleDeleteButton(bookCard, bookIndex);
  }
  if (event.target.classList.contains("read-book")) {
    handleReadButton(bookCard, bookIndex, event.target);
  }
});

displayBook();
