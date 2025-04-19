# Floating YouTube Music Player

A minimalist, floating desktop music player built using Electron, allowing you to search and play embeddable YouTube videos in a distraction-free window.


## Features

- Search any video using the YouTube Data API
- Play videos in an embedded mini player
- Automatically filters out non-embeddable or region-blocked content
- Auto-hides UI elements for a clean viewing experience
- Gracefully handles playback errors (e.g., "Watch on YouTube" restriction)
- Responsive resizing: video player adjusts to window size
- Minimalist design using plain HTML, CSS, and JavaScript
- Built entirely using Electron, making it cross-platform (Windows, macOS, Linux)




## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Saumya4321/music-player-app.git
cd music-player-app
```
### 2. Install dependencies
```bash
npm install
```
### 3. Replace Youtube Key
In ```renderer.js``` replace ```YOUR_API_KEY``` with your Youtube Key.
```renderer.js
const API_KEY = YOUR_API_KEY   // Replace with your API key
const searchInput = document.getElementById("search");
.....

```

### 4. Run the app
```bash
npm start
```
## Building the app
To turn this Electron app into a full-fledged app:
+ Install a packaging tool like Electron Builder.
+ Configure ```package.json``` for packaging and specify build options.
+ Run the build process for your target platform.
+ Test the packaged app.


## Demo


https://github.com/user-attachments/assets/e2b752ea-c588-411d-a383-b5651051b77d


