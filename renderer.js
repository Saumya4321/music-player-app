const API_KEY = "AIzaSyBrw9ZFaVxvOhZrW7cj_QhFytaCkwdBSPc"// Replace with your API key
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const player = document.getElementById("player");
const close_button = document.getElementById("close-button");
const searchButton = document.getElementById("search-button");
const titleBar = document.getElementById("title-bar")
let isPlaying = false;

async function searchMusic() {
    const query = searchInput.value;

    if (isPlaying) {
        player.style.display = "none";
    }

    resultsDiv.style.display = "";  // Show results again
    player.style.width = "";  // Reset player size
    player.style.height = "";  // Reset player size
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    

    resultsDiv.innerHTML = "";
    data.items.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        
        const button = document.createElement("button");
        button.innerText = title;
        button.onclick = () => {
            player.style.display="block";
            playMusic(videoId)
            
        };
        
        resultsDiv.appendChild(button);
    });


    if (data.items.length > 0) {
        isPlaying = false;  
    }
}

function playMusic(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        resultsDiv.style.display = "none";  // Hide search results
        searchInput.style.display = "none";
        searchButton.style.display= "none";

    player.style.width = "100%";  // Expand player
    player.style.height = "100vh";  // Make it fill the window

    isPlaying = true;
}


close_button.addEventListener("click", () => {
    window.electronAPI.closeApp();
});

searchInput.addEventListener("keydown", (event) =>
    {   
        if(event.key == "Enter"){
            searchMusic();
        }
    
    });