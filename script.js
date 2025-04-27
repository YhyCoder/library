const library = document.querySelector(".library");

const myLibrary = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J. K. Rowling",
    pages: 223,
    read: "Not read yet",
  },
  {
    id: 2,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 240,
    read: "Read",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    read: "Read",
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

myLibrary.forEach((book) => {
  // book
  const bookCard = document.createElement("section");
  bookCard.classList.add("book");
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
    createBookInfo("Status:", book.read, "book__read")
  );

  // book__buttons
  const buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("book__buttons");
  bookCard.appendChild(buttonWrapper);

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("button");
  deleteButton.textContent = "Delete";

  // read status button
  const readStatusButton = document.createElement("button");
  readStatusButton.type = "button";
  readStatusButton.classList.add("button");

  // Changes the content of the read status button to status heading.
  if(book.read === "Read") {
    readStatusButton.textContent = "Not Read";
    readStatusButton.classList.add("button--error");
  } else {
    readStatusButton.textContent = "Read";
    readStatusButton.classList.add("button--success");

  }

  buttonWrapper.appendChild(deleteButton);
  buttonWrapper.appendChild(readStatusButton);
});
