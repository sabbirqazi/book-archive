const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('searchInput');
const booksContainer = document.getElementById("books-container");
const errorContainer = document.getElementById('error')
searchButton.addEventListener('click', function(){
    console.log("found")
    const searchText = searchInput.value;
    if(searchText === ""){
        errorContainer.innerText = "Please write a book name.";
        return;
    };
     
    console.log(searchText);
    //clear
    booksContainer.innerHTML = "";

    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => loadBooks(data.docs))
     
    .finally(() => {
        searchInput.value = "";
        
      });
})

// load books
const loadBooks = (booksArray) =>{
    console.log(booksArray)
   const books = booksArray.filter(filtered => filtered.book.author_name[0] !== undefined && filtered.book.author_name[0] !== undefined && filtered.book.first_publish_year !== undefined && filtered.book.publisher[0]);
   console.log(books)
   if(books.length === 0){
    
    errorContainer.innerHTML = "No Result Found"
   }
   else{


    books.forEach(book =>{
        
        const div = document.createElement("div");
        div.classList.add("col-4")
        div.innerHTML =`
        <div class="card mb-3 bg-info" style="max-width: 440px;">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h3 class="card-title">${book.title}</h3>
              <h5 class="card-text">Author: ${book.author_name[0]} </h5>
              <p class="card-text">First Publish: ${book.first_publish_year}</p>
              <p class="card-text">Publisher: ${book.publisher[0]}</p>
            </div>
          </div>
        </div>
      </div>
        `;
        booksContainer.appendChild(div);
    });
   };
    
};