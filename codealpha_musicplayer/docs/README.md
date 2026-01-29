# 🎵 Music Player - Premium Spotify-Style Player

A modern, fully-featured web-based music player with a sleek dark/red theme inspired by Spotify. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Core Functionality
- ▶️ **Play/Pause** - Control playback with smooth animations
- ⏮️ **Previous/Next** - Navigate through your playlist
- 🔁 **Repeat Modes** - Off → Repeat All → Repeat One
- 🔊 **Volume Control** - Adjust volume from 0-100%
- ⏱️ **Progress Bar** - Seek to any part of a song
- ▶️ **Autoplay** - Automatically play next song when current ends

### Playlist Management
- ➕ **Add Songs** - Add new songs to the playlist with a modal form
- ✏️ **Edit Songs** - Modify existing song details
- 🗑️ **Delete Songs** - Remove songs from playlist
- 🔍 **Search Bar** - Search songs by title or artist name in real-time
- 📋 **Collapse/Expand** - Toggle playlist visibility

### UI/UX
- 🎨 **Modern Design** - Dark black and red gradient theme
- 🌟 **Hover Effects** - Dynamic animations on all buttons
- 📱 **Responsive** - Works on desktop and mobile devices
- 🎶 **Music Symbols** - Decorative musical note backgrounds
- 💫 **Smooth Animations** - Professional transitions and effects

### Display Information
- 🎵 **Song Title & Artist** - Current song information
- 🖼️ **Album Art** - Beautiful music-themed cover images
- ⏱️ **Duration Display** - Current time and total duration
- 📊 **Progress Visualization** - Visual progress bar with fill

## 🎨 Design Highlights

- **Dark Theme** - Black and red color scheme for premium feel
- **Sharp Contrast** - High visibility and professional appearance
- **Music Decorations** - Subtle musical note symbols throughout
- **Glow Effects** - Red and green accents with shadow effects
- **Smooth Transitions** - Cubic bezier animations for natural motion
- **Wide Layout** - 600px max-width for spacious interface

## 🎼 Default Playlist

12 diverse royalty-free songs included:
1. Electric Dreams - Lee Rosevere
2. Upbeat Energy - Anno Domini Beats
3. Midnight Jazz - Chris Zabriskie
4. Summer Vibes - The Passion HiFi
5. Chill Beats - Ambient Records
6. Focus Mode - Lofi Beats
7. Night Drive - Synthwave Dreams
8. Feel Good - Happy Indie
9. Electronic Sunrise - Digital Wave
10. Acoustic Reflection - Folk Stories
11. Urban Beats - City Sounds
12. Serene Moments - Peaceful Mind

## 📂 File Structure

```
music-player/
├── index.html       # Main HTML file
├── style.css        # All CSS styles and animations
├── script.js        # JavaScript functionality
└── README.md        # Documentation
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/music-player.git
   cd music-player
   ```

2. **Open in browser**
   - Double-click `index.html` or
   - Use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```
   - Visit `http://localhost:8000`

## 💻 How to Use

### Playing Music
1. Click the **Play** button (green in center)
2. Click any song in the playlist to jump to it
3. Use Previous/Next buttons to navigate

### Managing Playlist
1. **Add Song** - Click the green `+` button next to "Playlist"
2. **Edit Song** - Hover over a song and click the edit icon (pencil)
3. **Delete Song** - Hover over a song and click the delete icon (trash)
4. **Search** - Type in the search bar to filter songs

### Customization
- **Change Volume** - Use the volume slider
- **Adjust Playback** - Drag the progress bar
- **Toggle Repeat** - Click the repeat button to cycle through modes
- **Enable Autoplay** - Check the autoplay checkbox

## 🔧 Customization Guide

### Adding Your Own Songs
1. Click the **+** button next to "Playlist"
2. Fill in the form:
   - **Song Title** - Name of the song
   - **Artist Name** - Artist or creator
   - **Duration** - Length in seconds
   - **Audio URL** - Link to the audio file
   - **Cover Image URL** - Link to album art image
3. Click **Save Song**

### Changing Colors
Edit the CSS variables in `style.css`:
- `#0a0a0a` - Dark black
- `#1a0000`, `#330000` - Dark red
- `#1db954` - Green accent (Spotify green)
- `#ff6464` - Hover red accent

### Modifying Layout
- Change `max-width: 600px` in `.music-player` for different sizes
- Adjust `border-radius: 30px` for more/less rounded corners
- Modify padding values for spacing changes

## 🌐 Browser Support

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All songs are royalty-free for use
- Album artwork is from Unsplash (CC0 License)
- No external dependencies required (vanilla JS)
- Uses Font Awesome for icons (CDN)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

For issues or suggestions, please open an issue on GitHub.

---

**Enjoy your music! 🎵**
