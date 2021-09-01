const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('searchInput');


searchButton.addEventListener('click', function(){
    console.log("found")
    const searchValue = searchInput.value; 
    console.log(searchValue);
})