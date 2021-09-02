/* global variable declaration */

const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('searchInput');
const booksContainer = document.getElementById("books-container");
const errorContainer = document.getElementById('error')
const showResult = document.getElementById('result-number')

searchButton.addEventListener('click', function(){
    
    const searchText = searchInput.value;

    /* error handling */

    if(searchText === ""){
        errorContainer.innerText = "Please write a book name.";

        /* clearing previous result */

        booksContainer.innerHTML = "";
        showResult.innerHTML = "";
        return;
    };

    /* clearing previous result */

    booksContainer.innerHTML = "";
    showResult.innerHTML = "";
    errorContainer.innerHTML= "";

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showBooks(data.docs))
     
    .finally(() => {

      /* clearing search input field */

        searchInput.value = "";
        
      });
      errorContainer.innerHTML = "";
});

/* loop through books and showing on UI */

const showBooks = (booksArray) =>{

  /* filtering books which has valid information only and showing it on UI */

   const books = booksArray.filter(filtered => filtered.cover_i !== undefined && filtered.title !== undefined && filtered.author_name !== undefined && filtered.first_publish_year !== undefined && filtered.publisher  !== undefined ) ;
  /* error handling */
   if(books.length === 0){
    
    errorContainer.innerHTML = "No Result Found"
   }
   else{

     /* showing how much books user got */

   const resultNumber = document.createElement('h5')
   resultNumber.innerHTML = `You are seeing ${books.length} books of ${booksArray.length}`
   showResult.appendChild(resultNumber);

   /* loop through filtered books using forEach method */

    books.forEach(book =>{
        
        const div = document.createElement("div");
        div.classList.add("col-4");
        
        /* books card */
        div.innerHTML =`
        <div class="card mb-3 bg-secondary" style="max-width: 440px; max-height-500px">
        <div class="row g-0">
          
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid card-img-top" alt="...">
          
          
            <div class="card-body">
              <h3 class="card-title text-white">${book.title}</h3>
              <h5 class="card-text text-warning fst-italic">Author: ${book.author_name[0]} </h5>
              <p class="card-text text-white">First Publish: ${book.first_publish_year}</p>
              <p class="card-text text-white">Publisher: ${book.publisher[0]}</p>
            
            </div>
        </div>
        </div>
        `;
        booksContainer.appendChild(div);
    });
   };
    
};