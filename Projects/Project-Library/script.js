class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const displayController = (() => {
  const bookContainer = document.querySelector("#book-container");
  const btnAdd = document.querySelector("#btnAdd");
  const btnClose = document.querySelector("#btnClose");
  const formOverlay = document.querySelector("#form-overlay");

  btnAdd.addEventListener("click", (e) => {
    formOverlay.classList.remove("form-overlay-hidden");
    formOverlay.classList.add("form-overlay-visible");
  });

  btnClose.addEventListener("click", (e) => {
    formOverlay.classList.remove("form-overlay-visible");
    formOverlay.classList.add("form-overlay-hidden");
  });

  formOverlay.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(formOverlay);
    let formJSON = [];

    // Iterate over the form fields and log their names and values
    //Building the formJSON Obj with the key value pairs from the entries
    for (var pair of formData.entries()) {
      let fieldName = pair[0];
      let fieldValue = pair[1];

      formJSON[fieldName] = fieldValue;
    }

    if (formJSON.read == "on") {
      formJSON.read = true;
    } else {
      formJSON.read = false;
    }

    console.log(formJSON);
    let book = new Book(
      formJSON.title,
      formJSON.author,
      //convert string to int
      parseInt(formJSON.pages),
      formJSON.read
    );
    //Clears the form input
    formOverlay.reset();
    addBookToLibrary(book);

    //close the window
    formOverlay.classList.remove("form-overlay-visible");
    formOverlay.classList.add("form-overlay-hidden");
  });

  function addBookToLibrary(book) {
    let bookDiv = createBookDiv(book);
    bookContainer.appendChild(bookDiv);
    myLibrary.push(book);
  }

  //Helper function for addBookToLibrary
  function createBookDiv(book) {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    bookDiv.setAttribute("data-book", myLibrary.length);

    let bookName = document.createElement("p");
    bookName.textContent = `Name: ${book.title}`;

    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;

    let bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${book.pages}`;

    let btnRead = document.createElement("button");
    btnRead.classList.add("book-button");

    if (book.read) {
      btnRead.textContent = "Read";
      btnRead.classList.add("read");
    } else {
      btnRead.textContent = "Not Read";
      btnRead.classList.add("not-read");
    }

    //Toggles the Read/Not Read status and adjust mylibrary for that speecific book
    btnRead.addEventListener("click", (e) => {
      let btnRead = e.target;
      let bookDiv = e.target.parentElement;
      let bookID = bookDiv.getAttribute("data-book");
      if (myLibrary[bookID].read) {
        btnRead.textContent = "Not Read";
        btnRead.classList.remove("read");
        btnRead.classList.add("not-read");
      } else {
        btnRead.textContent = "Read";
        btnRead.classList.remove("not-read");
        btnRead.classList.add("read");
      }

      myLibrary[bookID].read = !myLibrary[bookID].read;
    });
    let btnRemove = document.createElement("button");
    btnRemove.classList.add("book-button");
    btnRemove.classList.add("book-remove");
    btnRemove.textContent = "Remove";

    btnRemove.addEventListener("click", (e) => {
      console.log(e.target);
      let bookDiv = e.target.parentElement;
      //Book id of the book to be removed
      let bookID = bookDiv.getAttribute("data-book");
      bookDiv.remove();
      myLibrary.splice(bookID, 1);

      //Must update all other data-book blocks past the book to be removed
      let bookDivs = document.querySelectorAll("[data-book]");

      bookDivs.forEach((book) => {
        let currID = book.getAttribute("data-book");
        if (currID > bookID) {
          book.setAttribute("data-book", currID - 1);
        }
      });
    });

    bookDiv.appendChild(bookName);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(btnRead);
    bookDiv.appendChild(btnRemove);
    return bookDiv;
  }

  return { addBookToLibrary };
})();

let myLibrary = [];

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);

displayController.addBookToLibrary(theHobbit);
displayController.addBookToLibrary(new Book("test1", "test", 10, true));
displayController.addBookToLibrary(new Book("test2", "test", 10, true));
displayController.addBookToLibrary(new Book("test3", "test", 10, true));
