
class Book{
    constructor(title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = "false"){
      this.title=title;
      this.author=author;
      this.pages=pages;
      this.isRead=isRead;
    }
  }
  let myLibrary=[];

  function addToLibrary(newBook){
    if(myLibrary.some((book)=>book.title===newBook.title))return false;
    myLibrary.push(newBook);
    saveLocal();
    return true;
  }

  function removeFromLibrary(bookTitle){
    console.log("remove");
    myLibrary = myLibrary.filter((book) => book.title !== bookTitle);
    saveLocal(); 
  }
  function getBook(bookTitle){
    for(let book of myLibrary){
      if(book.title===bookTitle)
      {return book;}
    }
    return null;
  }

  const newBookButton=document.querySelector(".show-btn");
  const popup=document.querySelector(".card");
  const overlay=document.querySelector(".js-overlay");
  const closeBtn=document.querySelector('.close-btn');
  newBookButton.addEventListener('click',openPopup);
  closeBtn.addEventListener('click',closePopup)
  overlay.addEventListener('click',closePopup);
  window.addEventListener("keydown",(e)=>{
    console.log("www");
    if(e.key==='Escape')closePopup();
  });
  function openPopup(){
    form.reset();
    console.log('workinh');
    
    popup.classList.remove('dis-none');
  }
  function closePopup(){
    console.log("working")
    popup.classList.add('dis-none');
  }
const form=document.querySelector('.js-popup-form');
form.addEventListener('submit',addBook);

function addBook(e){
  e.preventDefault();
  if (addToLibrary(getBookFromInput())) {
    updateBooksGrid();
    closePopup();
  } else {
    alert("This book already exists in your library");
  }
}
function getBookFromInput(){
 ;const title = `Title: ${document.querySelector("#name").value}`;
 const author = `Author: ${document.querySelector("#author").value}`;
 const pages = `Total-Pages: ${document.querySelector("#pagesNo")}`;
 const isRead = document.querySelector("#isRead").checked;
 return new Book(title, author, pages, isRead);
}

const booksGrid = document.querySelector(".js-books-grid");
booksGrid.addEventListener("click", checkBooksGridInput);

function checkBooksGridInput(e){
  if (e.target.classList.contains("js-remove-button")) {
    //console.log(e.target.parentNode);
    removeFromLibrary(e.target.parentNode.firstChild.innerHTML);

    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    
    saveLocal();
    // updateBooksGrid();
  }else if(e.target.classList.contains("js-is-read-button")){
    if(e.target.innerHTML==='Read'){
      getBook(e.target.parentNode.firstChild.innerHTML).isRead=false;
      e.target.innerHTML="Not read";
      e.target.classList.remove("button--light-green");
      e.target.classList.add("button--light-red");
      saveLocal();
    }else{
      getBook(e.target.parentNode.firstChild.innerHTML).isRead = true;
      e.target.innerHTML = "Read";
      e.target.classList.remove("button--light-red");
      e.target.classList.add("button--light-green");
      saveLocal();
    }
  }
}
function updateBooksGrid() {
  resetGrid();
  for (let element of myLibrary) {
    createBookCard(element);
  }
}

function resetGrid() {
  booksGrid.innerHTML = "";
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const titleLabel = document.createElement("label");
  titleLabel.textContent="TITLE:"
  const title = document.createElement("h3");
  const authorLabel = document.createElement("label");
  authorLabel.textContent="AUTHOR";
  const author = document.createElement("h3");
  const pagesLabel = document.createElement("label");
  pagesLabel.textContent="Total-Pages";
  const pages = document.createElement("h3");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  bookCard.classList.add("books-grid__book-card");
  bookCard.style.display="flex"
  bookCard.style.flexDirection="column"
  bookCard.style.justifyContent="center"
  bookCard.style.alignItems="right"
  
  readButton.classList.add("button");
  readButton.classList.add("js-is-read-button");
  removeButton.classList.add("button");
  removeButton.classList.add("button--red");
  removeButton.classList.add("js-remove-button");
  
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeButton.textContent = "Remove";
  readButton.style.width = "120px";
  if (book.isRead) {
    readButton.textContent = "Read";
    readButton.classList.add("button--light-green");
  } else {
    readButton.textContent = "Not read";
    readButton.classList.add("button--light-red");
  }
  bookCard.style.border="2px solid sienna";
  bookCard.style.padding="50px";
  // bookCard.appendChild(titleLabel);
  bookCard.appendChild(title);
  // bookCard.appendChild(authorLabel);
  bookCard.appendChild(author);
  // bookCard.appendChild(pagesLabel);
  bookCard.appendChild(pages);
  bookCard.appendChild(readButton);
  bookCard.appendChild(removeButton);
  booksGrid.appendChild(bookCard);
}

function saveLocal(){
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
}
function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary === null) myLibrary = [];
  updateBooksGrid();
}
restoreLocal();
  