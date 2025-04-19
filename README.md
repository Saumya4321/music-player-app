# Floating YouTube Music Player

A minimalist, floating desktop music player built using Electron, allowing you to search and play embeddable YouTube videos in a distraction-free window.


## Features

- Search any video using the YouTube Data API
- Play videos in an embedded mini player
- Automatically filters out non-embeddable or region-blocked content
- Auto-hides UI elements for a clean viewing experience
- Gracefully handles playback errors (e.g., "Watch on YouTube" restriction)




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
In ```renderer.js``` add your youtube key, or use the existing one for a quick demo

### 4. Run the app
```bash
npm start
```
## Features

- Search and play YouTube videos directly within the app
- Embeds only videos that are allowed to be played externally (using `embeddable` and `regionRestriction` checks)
- Automatically hides search UI during playback for a distraction-free experience
- Restores UI elements on mouse movement near the top of the window
- Gracefully handles playback errors like "Video unavailable" or "Watch on YouTube"
- Responsive resizing: video player adjusts to window size
- Minimalist design using plain HTML, CSS, and JavaScript
- Lightweight — no unnecessary libraries or frameworks
- Built entirely using Electron, making it cross-platform (Windows, macOS, Linux)

## Demo


https://github.com/user-attachments/assets/e2b752ea-c588-411d-a383-b5651051b77d


