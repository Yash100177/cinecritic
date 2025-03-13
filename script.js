const apiKey = "e36269ddfaede76eab53a3b5fec2ecfe";  // Replace with your actual TMDB API key
const baseUrl = "https://api.themoviedb.org/3";

async function searchMovie() {
    let query = document.getElementById("searchBox").value;
    if (query === "") return;

    let movieUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`;
    let tvUrl = `${baseUrl}/search/tv?api_key=${apiKey}&query=${query}`;

    try {
        let [movieResponse, tvResponse] = await Promise.all([
            fetch(movieUrl),
            fetch(tvUrl)
        ]);

        let movieData = await movieResponse.json();
        let tvData = await tvResponse.json();

        displayResults([...movieData.results, ...tvData.results]); // Combine movie & TV show results
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayResults(results) {
    let container = document.getElementById("movieContainer");
    container.innerHTML = "";

    if (results.length === 0) {
        container.innerHTML = `<p>No results found.</p>`;
        return;
    }

    results.forEach(item => {
        let type = item.media_type || (item.first_air_date ? "TV Show
