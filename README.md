# Better YouTube Chrome Extension

## Overview
Better YouTube is a Chrome extension designed to enhance the YouTube user experience by adding features such as video looping and playlist folder management.

## Features
- **Video Looping**: Allows users to loop a specific section of a YouTube video by setting start and end times.
- **Playlist Folders**: (Planned) Create and manage custom folders for organizing YouTube playlists.
- **Popup Interface**: A simple popup to interact with the extension and retrieve video titles.

## Installation
1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension should now be loaded and visible in your Chrome toolbar.

## Usage
- **Looping a Video**:
  - Navigate to a YouTube video page (`https://www.youtube.com/watch?v=...`).
  - A "Loop" button will appear below the video title.
  - Click the button, then enter the start and end times for the loop in the format `MM:SS`.
  - The video will automatically loop between the specified times.
- **Get Video Title**:
  - Click the extension icon in the Chrome toolbar to open the popup.
  - Click "Get Video Title" to display the title of the current YouTube video.

## Files
- `manifest.json`: Extension configuration file.
- `loop.js`: Handles video looping functionality on YouTube watch pages.
- `folders.js`: Placeholder for future playlist folder management features.
- `popup.js`: Manages the extension popup interactions.
- `popup.html`: HTML structure for the extension popup.
- `notes`: Development notes and next steps.

## Development Notes
- The extension currently runs on YouTube watch pages (`/watch`) and uses `setInterval` to monitor page changes. Consider using a `MutationObserver` for better performance.
- Planned features include playlist folder creation, video sorting, and adding videos to the queue.
- Future enhancements may include adjusting video playback rates dynamically.

## Requirements
- Google Chrome browser
- Permissions: `activeTab`, `scripting`, `storage`
- Host permissions: `https://www.youtube.com/*`

## Contributing
Feel free to fork this repository, make improvements, and submit pull requests. For major changes, please open an issue to discuss your ideas.
