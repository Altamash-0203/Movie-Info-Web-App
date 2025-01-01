let searchForm = document.querySelector('form')
let movieContainer = document.querySelector('.main-container')
let inputBox = document.querySelector('.inputBox')

// funtion to fetch movie data using API


const getMovieinfo = async (movie) => {
    try {
   
    const myAPI = "e2b2db74"
    const url = `http://www.omdbapi.com/?apikey=${myAPI}&t=${movie}`;

    const response = await fetch(url);

    if (!response.ok)
    {
        throw new Error ("Unable To Fetch Data")
    }
    const data = await response.json();

    showMoviedata(data)
         
} catch (error) {
    showErr("No Movie Found")
        
}
}


// function to show movie data 
const showMoviedata = (data) => {
    movieContainer.innerHTML="";
    movieContainer.classList.add('bg-enb')
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2> ${Title} </h2>
                            <p><strong>Rating: &#11088; </strong> ${imdbRating} </p>`


    const movieGenreElement = document.createElement('div')
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p')
        p.innerText = element
        movieGenreElement.appendChild(p)
    });

    movieElement.appendChild(movieGenreElement)
 

    movieElement.innerHTML +=  `<p><strong>Relesed: </strong> ${Released} </p>
                             <p><strong>Runtime:</strong> ${Runtime} </p>
                            <p><strong>Actors:</strong> ${Actors} </p>
                            <p><strong>Plot:</strong> ${Plot} </p>`
                            


  const moviePosterelement=document.createElement('div')
  moviePosterelement.classList.add('movie-poster')
  moviePosterelement.innerHTML=`<img src=${Poster}>`

    movieContainer.appendChild(moviePosterelement)   
    movieContainer.appendChild(movieElement);



}

//function to show error message 
const showErr=(message) =>
{
    movieContainer.innerHTML=`<h4> ${message} </h4>`
    movieContainer.classList.add('main-containererror')

}


// adding event listner to serch form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const MovieName = inputBox.value.trim();
    if (MovieName !== " ") {
        getMovieinfo(MovieName)
    }
    else
    {
        showErr("Enter Movie Name For Get Details")
    }
})