// Todo
/* 
1. Store all the data in local storage
2. give another column to delete book
3. add scroll bar to vew books
*/
showAllBooks();

// Constructor

function Book(name, author, category) {
  this.name = name;
  this.author = author;
  this.category = category;
}

// Display Constructor
function Display() {}

// function to clear forms field after a successful entry

Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

// function to validate the input values before storing them in Local Storage

Display.prototype.validate = function (book) {
  if (
    book.name.length < 2 ||
    book.author.length < 2 ||
    book.category.length < 2
  ) {
    return false;
  } else {
    return true;
  }
};

// function to add books in browser local storage

Display.prototype.addBooksToLocalStorage = function (book) {
  let collection = localStorage.getItem("collection");

  if (collection == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(collection);
  }

  booksObj.push(book);
  localStorage.setItem("collection", JSON.stringify(booksObj));
};

// function to show alert for successful and invalid operation

Display.prototype.show = function (message) {
  let parent = document.getElementById("customNavbar");
  parent.removeChild(parent.lastChild);

  let className = message === "Success" ? "alert-success" : "alert-danger";

  let message2 =
    message === "Success"
      ? "Book has been added successfully!"
      : "Invalid Input!";
  let div = document.createElement("div");

  div.innerHTML = `<div class="alert ${className} alert-dismissible" role="alert">
                      <strong> ${message} : </strong> ${message2}
                      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;

  parent.insertBefore(div, parent.lastElementChild.nextSibling);

  setTimeout(() => {
    div.innerHTML = "";
  }, 2000);
};

// Function to show all books from browser local storage

function showAllBooks() {
  let collection = localStorage.getItem("collection");
  if (collection == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(collection);
  }
  let html = "";
  booksObj.forEach(function (book, index) {
    html += `<tr>
    <td scope="row">${index + 1}</td>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.category}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBooks(this.id)">Remove</button><td>
  </tr>`;
  });
  let booksElem = document.getElementById("tableBody");
  if (booksObj.length != 0) {
    booksElem.innerHTML = html;
  } else {
    booksElem.innerHTML = `<h6>Nothing to show !</h6>`;
  }
}

function deleteBooks(index) {
  let collection = localStorage.getItem("collection");
  if (collection == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(collection);
  }
  booksObj.splice(index, 1);
  localStorage.setItem("collection", JSON.stringify(booksObj));
  showAllBooks();
}

//Add submit event listener to AddBookButton

let addBtn = document.getElementById("AddBook");

addBtn.addEventListener("click", (event) => {
  let bookName = document.getElementById("bookName");
  let bookAuthor = document.getElementById("bookAuthor");
  let bookCategory = document.getElementById("bookCategory");
  let book = new Book(bookName.value, bookAuthor.value, bookCategory.value);
  let display = new Display(book);

  if (display.validate(book)) {
    display.addBooksToLocalStorage(book);
    showAllBooks();
    display.clear();
    display.show("Success");
  } else {
    display.show("Error");
  }

  event.preventDefault();
});

let deleteButton = document.getElementById("DeleteBook");
deleteButton.addEventListener("click", (event) => {
  let input = confirm("Are you sure to delete all books?");
  if (input === true) {
    localStorage.clear();
    showAllBooks();
    event.preventDefault();
  } else {
    event.preventDefault();
  }
});
