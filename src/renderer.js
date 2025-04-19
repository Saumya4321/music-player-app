const API_KEY = YOUR_API_KEY   // Replace with your API key
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const player = document.getElementById("player");
const close_button = document.getElementById("close-button");
const searchButton = document.getElementById("search-button");
const titleBar = document.getElementById("title-bar")
let isPlaying = false;
let firstTime = true;

document.addEventListener("mousemove", (event) => {
    if (event.clientY < 60) {
        searchInput.style.display = "";
        searchButton.style.display = "";
        titleBar.style.display = "";
    }
    else {
        if (!firstTime) {
            searchInput.style.display = "none";
            searchButton.style.display = "none";
            titleBar.style.display = "none";
        
        }
    }

})

searchButton.addEventListener("click", () =>
{
    searchInput.style.display = "";
    searchButton.style.display = "";
    titleBar.style.display = "";

})

// document.addEventListener("mouseout", () =>
// {
//     if (!firstTime) {
//             searchInput.style.display = "none";
//             searchButton.style.display = "none";
//             titleBar.style.display = "none";
        
//         }
// }
// )

async function searchMusic() {
    const query = searchInput.value;

    if (isPlaying) {
        player.style.display = "none";
    }

    resultsDiv.style.display = "";
    player.style.width = "";
    player.style.height = "";
    resultsDiv.innerHTML = "";

    // Step 1: Get video IDs from search
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    const videoIds = searchData.items.map(item => item.id.videoId).filter(Boolean);
    if (videoIds.length === 0) {
        resultsDiv.innerHTML = "<p>No videos found.</p>";
        return;
    }

    // Step 2: Get full video info for embeddability + restrictions
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,status,contentDetails&id=${videoIds.join(",")}&key=${API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();

    // Check each video
    const userCountry = "IN"; // change this if testing from elsewhere

    detailsData.items.forEach(video => {
        const videoId = video.id;
        const title = video.snippet?.title;
        const isEmbeddable = video.status?.embeddable;
        const regionBlocked = video.contentDetails?.regionRestriction?.blocked || [];

        console.log(`🎵 ${title} | Embeddable: ${isEmbeddable} | Blocked: ${regionBlocked.join(", ") || "None"}`);

        if (/official|mv|performance/i.test(title)) {
            console.warn(`🚫 Skipping "${title}" due to likely restrictions`);
            return;
        }        

        if (isEmbeddable && !regionBlocked.includes(userCountry)) {
            const button = document.createElement("button");
            button.innerText = title;
            button.onclick = () => {
                player.style.display = "block";
                playMusic(videoId);
            };
            resultsDiv.appendChild(button);
        } else {
            console.warn(`⛔ Skipped: "${title}" — Region blocked or not embeddable`);
        }
    });

    if (detailsData.items.length > 0) {
        isPlaying = false;
        pause();
    }
}

function pause() {
    player.src=""
}

function playMusic(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    resultsDiv.style.display = "none";  // Hide search results
    searchInput.style.display = "none";
    searchButton.style.display = "none";
    titleBar.style.display = "none";

    player.style.width = "100%";  // Expand player
    player.style.height = "100vh";  // Make it fill the window

    isPlaying = true;
    firstTime = false;
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
