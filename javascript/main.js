let myLibrary = [];

// CHECK FOR EXISTING DATA IN LOCAL STORAGE
if (!localStorage.getItem('localLibrary')
    || localStorage.getItem('localLibrary') == "[]") {
  // If library not present, create library in local storage
  // 1 -- Seed library with books
  seedLibrary();
  // 2 -- Convert to JSON as only string values can be stored
  localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
}


// INITIATE USER INTERFACE
// Load library from local storage
myLibrary = JSON.parse(localStorage.getItem('localLibrary'));
myLibrary = makeBooks(myLibrary);

// Display books in library
updateDisplay();


// CONSTRUCTORS
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

Book.prototype.remove = function () {
  myLibrary.splice(this.index, 1);
}


// FEATURES
function addBookToLibrary(book) {
  // Add book to storage and display
  myLibrary.push(book);
  saveToLocalLibrary();
  updateDisplay();
}

function saveToLocalLibrary() {
  localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
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
    book.index = index;

    // Add book details
    let title = "<p class='title'>" + book.title + "</p>"
    let author = "<p class='author'>by <i>" + book.author + "</i></p>"
    let pages = "<p class='pages'>Length: " + book.pages + " pages</p>"
    bookCard.innerHTML = title + author + pages;

    // Create read toggle
    let readLabel = document.createElement("label");
    readLabel.classList.add("slider-body");
    readLabel.setAttribute("for", ("read" + index));
    let readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.setAttribute("name", "read");
    readCheckbox.setAttribute("id", ("read" + index));
    readCheckbox.addEventListener("change", handleReadSliderChange);
    if (book.read) readCheckbox.setAttribute("checked", "checked")
    let readToggle = document.createElement("span");
    readToggle.classList.add("slider-toggle");
    let readText = document.createElement("p");
    readText.innerText = "(read)";
    readText.classList.add("read-text");
    readLabel.appendChild(readCheckbox);
    readLabel.appendChild(readToggle);
    bookCard.appendChild(readLabel);
    if (book.read) bookCard.appendChild(readText);

    // Add remove button
    let remove = document.createElement("div");
    remove.classList.add("remove-btn");
    remove.addEventListener("click", handleRemoveBtnClick);
    bookCard.appendChild(remove);

    books.prepend(bookCard);
    index++;
  });
}


// -- ADD BOOK BUTTON FUNCTIONALITY
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", toggleDisplayForm);

const form = document.getElementById("add-form");
form.addEventListener("submit", handleFormSubmit);

function toggleDisplayForm() {
  // Display form
  form.classList.toggle("hide");
}

function handleFormSubmit(e) {
  // Extract form data and add book to library
  e.preventDefault();
  let book = Object.create(Book.prototype);

  book.title = e.target.elements['title'].value;
  book.author = e.target.elements['author'].value;
  book.pages = e.target.elements['pages'].value;
  book.read = e.target.elements['read'].checked;

  addBookToLibrary(book);
  clearForm(e);
  toggleDisplayForm();
}

// Clear Add Book form after book is submitted
function clearForm(e) {
  e.target.elements['title'].value = null;
  e.target.elements['author'].value = null;
  e.target.elements['pages'].value = null;
  e.target.elements['read'].checked = false;
}


// -- TOGGLE READ FUNCTIONALITY
function handleReadSliderChange(e) {
  let book = e.target.parentNode.parentNode
  let bookIndex = book.dataset.index;
  myLibrary[bookIndex].toggleRead();
  if (myLibrary[bookIndex].read) {
    let readText = document.createElement("p");
    readText.classList.add("read-text");
    readText.innerText = "(read)";
    book.insertBefore(readText, book.childNodes[-1]);
  } else {
    book.removeChild(book.querySelector(".read-text"));
  }
  saveToLocalLibrary();
}


// -- REMOVE BOOK FUNCTIONALITY
function handleRemoveBtnClick(e) {
  let bookIndex = e.target.parentNode.dataset.index;
  // Remove book from library
  myLibrary.find(book => book.index == bookIndex).remove();
  saveToLocalLibrary();
  updateDisplay();
}


// -- SEED SOME BOOKS
function seedLibrary() {
  let book1 = Object.create(Book.prototype, {
    title: {
      value: "It's Not You, It's the Soil",
      enumerable: true
    },
    author: {
      value: "Jermi, Nate",
      enumerable: true
    },
    pages: {
      value: 600,
      enumerable: true
    },
    read: {
      value: false,
      enumerable: true
    }
  });

  let book2 = new Book(
    "The Square Orange Curtain",
    "Ghravati, Pooles",
    51,
    false
  );

  let book3 = Object.create(Book.prototype);
  book3.title = "Why, The Rain Itches";
  book3.author = "Multiple Authors";
  book3.pages = 5510;
  book3.read = true;

  addBookToLibrary(book1);
  addBookToLibrary(book2);
  addBookToLibrary(book3);
}


// CONVERT ARRAY OF OBJECTS INTO BOOKS
// This is necessary as JSON Stringify method does not preserve inherited properties
function makeBooks(bookArray) {
  let newArray = [];
  bookArray.forEach(book => {
    let newBook = Object.create(Book.prototype);
    for (attribute in book) {
      newBook[attribute] = book[attribute];
    }
    newArray.push(newBook);
  });
  return newArray;
}
