let myLibrary = [];

let book1 = {
  title: "It's Not You, It's the Soil",
  author: "Jermi, Nate",
  pages: 600,
  read: false
}

let book2 = {
  title: "The Square Orange Curtain",
  author: "Ghravati, Pooles",
  pages: 51,
  read: false
}

let book3 = {
  title: "Why, The Rain Itches",
  author: "Multiple Authors",
  pages: 5510,
  read: true
}

myLibrary.push(book1);
myLibrary.push(book2);

function Book(title, author, pages, read) {
  // Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = () => {
  this.read = !this.read;
}

function addBookToLibrary(book) {
  // Add book to storage and display
  myLibrary.push(book);
  updateDisplay();
}

function removeBookFromLibrary(book) {
  // Remove book from library
}

function updateDisplay() {
  const books = document.getElementById("books");
  let index = 0;
  books.innerHTML = "";

  // Re-rendering of library books allows index dataset to be refreshed
  myLibrary.forEach(book => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("data-index", index);

    // Add book details
    let title = "<p>" + book.title + "</p>"
    let author = "<p>" + book.author + "</p>"
    let pages = "<p>" + book.pages + "</p>"
    bookCard.innerHTML = title + author + pages;

    // Create read toggle
    let read = document.createElement("input");
    read.classList.add("slider");
    read.setAttribute("type", "checkbox");
    if (book.read) read.setAttribute("checked", true);
    bookCard.appendChild(read);

    books.prepend(bookCard);
    index++;
  });
}

addBookToLibrary(book3);

// ADD BOOK BUTTON FUNCTIONALITY
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", toggleDisplayForm);

const form = document.getElementById("add-form");
form.addEventListener("submit", handleFormSubmit);

function toggleDisplayForm() {
  // Display form
  form.classList.toggle("hide");
}

// Extract form data and add book to library
function handleFormSubmit(e) {
  e.preventDefault();
  let book = Object.create(Book.prototype);

  book.title = e.target.elements['title'].value;
  book.author = e.target.elements['author'].value;
  book.pages = e.target.elements['pages'].value;
  book.read = e.target.elements['read'].checked;

  // Add new book to library
  addBookToLibrary(book);
}
