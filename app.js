let myLibrary = [];

const BUTTON_NEW_BOOK = document.getElementById('button_new-book');
const FORM_NEW_BOOK = document.getElementById('form_new-book')
const BUTTON_LIST_BOOKS = document.getElementById('button_list-book');
const DIV_DISPLAY_BOOKS = document.getElementById('div_display-books')
const ICON_DELETE = "icons/delete_black_24dp.svg";
const ICON_BOOK_PLACEHOLDER = "icons/menu_book_black_24dp.svg"
FORM_NEW_BOOK.style.display = 'none';

class Book {
  constructor(author, title, pages, isRead) {
    this.author = author 
    this.title = title 
    this.pages = pages 
    this.isRead = isRead
  }
  toggleRead() {
    this.isRead == true ? this.isRead = false : this.isRead = true;
  }
}

const addBookToLibrary = book => myLibrary.push(book);

const displayBooks = () => {
  // clear div containing books
  while(DIV_DISPLAY_BOOKS.firstChild) {
    DIV_DISPLAY_BOOKS.firstChild.remove();
  }
  let book_div_frag = document.createDocumentFragment();
  myLibrary.forEach((book, bookIndex) => {
    let book_div = document.createElement('div');

    let book_read_button = document.createElement('button')
    book_read_button.value = bookIndex;
    let book_read_button_img = document.createElement('img');
    book_read_button_img.src = ICON_BOOK_PLACEHOLDER;
    book_read_button.append(book_read_button_img)

    let book_del_button = document.createElement('button');
    book_del_button.className = 'delete-buttons';
    book_del_button.value = bookIndex;
    let book_del_button_img = document.createElement('img');
    book_del_button_img.src = ICON_DELETE;
    book_del_button.append(book_del_button_img);

    book_div.append(book_del_button);
    book_div.append(book_read_button)
    book_div.append(`Author: ${book.author} Title: ${book.title} Pages: ${book.pages} Read: ${book.isRead}`);
    book_div_frag.append(book_div);

    book_read_button.addEventListener('click', toggleRead);
    book_del_button.addEventListener('click', deleteBook);
  })
  DIV_DISPLAY_BOOKS.appendChild(book_div_frag);
}

const toggleRead = (event) => {
  let bookIndex = event.currentTarget.value;
  myLibrary[bookIndex].toggleRead();
  displayBooks();
}

const deleteBook = (event) => {
  if (myLibrary.length == 1) myLibrary = []
  else myLibrary.splice(event.currentTarget.value, 1);
  displayBooks();
}

const displayNewBookForm = () => {
  FORM_NEW_BOOK.style.display == 'none' ? FORM_NEW_BOOK.style.display = 'block' : FORM_NEW_BOOK.style.display = 'none';
};
const handleAddNewBook = (event) => {
  console.log('handling submission of new book');
  let newBookAuthor = document.getElementById('newAuthor').value;
  let newBookTitle = document.getElementById('newTitle').value;
  let newBookPages = document.getElementById('newPages').value;
  let newBookIsRead = document.getElementById('newIsRead').checked;
  newBook = new Book(newBookAuthor, newBookTitle, newBookPages, newBookIsRead);
  addBookToLibrary(newBook)
  document.getElementById('newAuthor').value = null;
  document.getElementById('newTitle').value = null;
  document.getElementById('newPages').value = null;
  document.getElementById('newIsRead').checked = false;
  event.preventDefault();
  displayBooks();
}

BUTTON_NEW_BOOK.addEventListener('click', displayNewBookForm);
FORM_NEW_BOOK.addEventListener('submit', handleAddNewBook);

// Debug Initial State
let book = new Book('Joe', 'Cool Book Title', '123', true);
let book1 = new Book('Ace', 'Ace Book Title', '321', false);
addBookToLibrary(book);
addBookToLibrary(book1);
console.log(book1);
book1.toggleRead();
console.log(book1);
displayBooks();
