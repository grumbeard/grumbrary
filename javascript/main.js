let myLibrary = [];

let book1 = Object.create(Book.prototype);
book1.title = "It's Not You, It's the Soil";
book1.author = "Jermi, Nate";
book1.pages = 600;
book1.read = false;

let book2 = Object.create(Book.prototype);
book2.title = "The Square Orange Curtain";
book2.author = "Ghravati, Pooles";
book2.pages = 51;
book2.read = false;

let book3 = Object.create(Book.prototype);
book3.title = "Why, The Rain Itches";
book3.author = "Multiple Authors";
book3.pages = 5510;
book3.read = true;


myLibrary.push(book1);
myLibrary.push(book2);
addBookToLibrary(book3);

function Book(title, author, pages, read) {
  // Book constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
}

function addBookToLibrary(book) {
  // Add book to storage and display
  myLibrary.push(book);
  updateDisplay();
}

function removeBookFromLibrary(library, index) {
  // Remove book from library
  delete library[index];
  updateDisplay();
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
    read.setAttribute("name", "read");
    read.addEventListener("change", handleReadSliderChange);
    if (book.read) read.setAttribute("checked", true);
    bookCard.appendChild(read);

    // Add remove button
    let remove = document.createElement("div");
    remove.classList.add("remove-btn");
    remove.innerText = "Remove"
    remove.addEventListener("click", handleRemoveBtnClick);
    bookCard.appendChild(remove);

    books.prepend(bookCard);
    index++;
  });
}


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


// TOGGLE READ FUNCTIONALITY
function handleReadSliderChange(e) {
  let bookIndex = e.target.parentNode.dataset.index;
  myLibrary[bookIndex].toggleRead();
}


// REMOVE BOOK FUNCTIONALITY
function handleRemoveBtnClick(e) {
  let bookIndex = e.target.parentNode.dataset.index;
  removeBookFromLibrary(myLibrary, bookIndex);
}
