/**
 * Music Player Application - Main Script
 * 
 * Features:
 * - Play, pause, skip, and repeat songs
 * - Volume control with dynamic icons
 * - Search functionality for songs/artists
 * - Add, edit, and delete songs from playlist
 * - Autoplay toggle
 * - Persistent player state during session
 * 
 * Uses HTML5 Audio API and vanilla JavaScript (no frameworks)
 */

/**
 * Default playlist containing a diverse mix of royalty-free music
 * Each song object contains metadata needed for playback and display
 */
const playlist = [
    {
        id: 1,
        title: 'Electric Dreams',
        artist: 'Lee Rosevere',
        duration: 245,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    },
    {
        id: 2,
        title: 'Upbeat Energy',
        artist: 'Anno Domini Beats',
        duration: 210,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
        id: 3,
        title: 'Midnight Jazz',
        artist: 'Chris Zabriskie',
        duration: 235,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop'
    },
    {
        id: 4,
        title: 'Summer Vibes',
        artist: 'The Passion HiFi',
        duration: 198,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop'
    },
    {
        id: 5,
        title: 'Chill Beats',
        artist: 'Ambient Records',
        duration: 220,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        cover: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop'
    },
    {
        id: 6,
        title: 'Focus Mode',
        artist: 'Lofi Beats',
        duration: 215,
        src: 'https://www.freepd.com/music/Ocean%20To%20Sky.mp3',
        cover: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop'
    },
    {
        id: 7,
        title: 'Night Drive',
        artist: 'Synthwave Dreams',
        duration: 205,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=300&fit=crop'
    },
    {
        id: 8,
        title: 'Feel Good',
        artist: 'Happy Indie',
        duration: 228,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop'
    },
    {
        id: 9,
        title: 'Electronic Sunrise',
        artist: 'Digital Wave',
        duration: 242,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
    },
    {
        id: 10,
        title: 'Acoustic Reflection',
        artist: 'Folk Stories',
        duration: 195,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'
    },
    {
        id: 11,
        title: 'Urban Beats',
        artist: 'City Sounds',
        duration: 210,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop'
    },
    {
        id: 12,
        title: 'Serene Moments',
        artist: 'Peaceful Mind',
        duration: 225,
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop'
    }
];

/**
 * CACHE ALL DOM ELEMENTS FOR EFFICIENT ACCESS
 * Caching prevents repeated DOM queries during runtime
 * This improves performance and makes code more maintainable
 */

// Main player elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');

// Progress and time elements
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Song information display
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const albumArt = document.getElementById('albumArt');

// Volume control
const volumeSlider = document.getElementById('volumeSlider');
const volumeValue = document.getElementById('volumeValue');

// Playlist elements
const autoplayToggle = document.getElementById('autoplayToggle');
const playlistItems = document.getElementById('playlistItems');
const playlistToggleBtn = document.getElementById('playlistToggleBtn');

// Modal form elements for adding/editing songs
const addSongBtn = document.getElementById('addSongBtn');
const songModal = document.getElementById('songModal');
const songForm = document.getElementById('songForm');
const closeBtn = document.querySelector('.close-btn');
const cancelBtn = document.getElementById('cancelBtn');
const modalTitle = document.getElementById('modalTitle');

// Search elements
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

/**
 * APPLICATION STATE
 * These variables track the current state of the music player
 * They are updated based on user interactions and audio events
 */

// Currently selected song index in playlist array
let currentSongIndex = 0;

// Whether audio is currently playing
let isPlaying = false;

// Repeat mode: 0 = off, 1 = repeat all songs, 2 = repeat current song
let repeatMode = 0;

// Whether to automatically play next song when current song ends
let autoplay = true;

// Index of the song being edited (-1 means adding new song)
let editingIndex = -1;

// Songs matching current search query (empty = show all songs)
let filteredPlaylist = [];

/**
 * INITIALIZATION FUNCTION
 * Called when the page finishes loading
 * Sets up the initial state of the music player
 */
function init() {
    createPlaylist();
    loadSong(0);
    setupEventListeners();
    audioPlayer.volume = volumeSlider.value / 100;
}

/**
 * SETUP EVENT LISTENERS
 * Attaches click, input, and change events to UI controls
 * Also sets up audio element events for playback updates
 * 
 * By centralizing listener setup, code is easier to maintain
 * and we can see all interactions in one place
 */
function setupEventListeners() {
    // Playback controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    // Progress tracking and seeking
    progressBar.addEventListener('change', seek);
    progressBar.addEventListener('input', updateProgressBar);
    
    // Volume and playlist
    volumeSlider.addEventListener('input', changeVolume);
    autoplayToggle.addEventListener('change', toggleAutoplay);
    playlistToggleBtn.addEventListener('click', togglePlaylist);
    
    // Audio element events - update UI when audio state changes
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
    audioPlayer.addEventListener('ended', handleSongEnd);
    
    // Visual feedback for playing/paused state
    audioPlayer.addEventListener('playing', () => {
        albumArt.classList.add('playing');
        albumArt.classList.remove('paused');
    });
    audioPlayer.addEventListener('pause', () => {
        albumArt.classList.remove('playing');
        albumArt.classList.add('paused');
    });

    // Modal form controls
    addSongBtn.addEventListener('click', openAddSongModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    songForm.addEventListener('submit', saveSong);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    clearSearchBtn.addEventListener('click', clearSearch);
    
    // Close modal when clicking outside of form
    window.addEventListener('click', (e) => {
        if (e.target === songModal) {
            closeModal();
        }
    });
}

/**
 * CREATE AND RENDER PLAYLIST
 * Generates HTML for all songs and displays them in the playlist container
 * Handles filtered results when user is searching
 * 
 * @returns {void}
 */
function createPlaylist() {
    playlistItems.innerHTML = '';
    
    // Use filtered results if user is searching, otherwise show all songs
    const displayList = filteredPlaylist.length > 0 ? filteredPlaylist : playlist;
    
    // Show "no songs found" message if playlist is empty
    if (displayList.length === 0) {
        playlistItems.innerHTML = '<div style="text-align: center; color: #b3b3b3; padding: 20px; font-size: 12px;">No songs found</div>';
        return;
    }
    
    // Render each song in the playlist
    displayList.forEach((song, displayIndex) => {
        // Get the actual index in the original playlist array
        // This is important for maintaining correct song references during search
        const actualIndex = playlist.findIndex(s => s.id === song.id);
        
        const div = document.createElement('div');
        div.classList.add('playlist-item');
        
        // Highlight the currently playing song
        if (actualIndex === currentSongIndex) {
            div.classList.add('active');
        }
        
        // Create HTML for song item with title, artist, duration, and action buttons
        div.innerHTML = `
            <div class="playlist-item-info">
                <div class="playlist-item-title">${song.title}</div>
                <div class="playlist-item-artist">${song.artist}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div class="playlist-item-duration">${formatTime(song.duration)}</div>
                <div class="playlist-item-actions">
                    <button class="item-btn edit-btn" data-index="${actualIndex}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="item-btn delete-btn" data-index="${actualIndex}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        // Clicking on song info plays the selected song
        div.querySelector('.playlist-item-info').addEventListener('click', () => {
            currentSongIndex = actualIndex;
            loadSong(actualIndex);
            play();
        });

        // Edit and delete buttons with event delegation
        const editBtn = div.querySelector('.edit-btn');
        const deleteBtn = div.querySelector('.delete-btn');
        
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering parent click event
            openEditSongModal(actualIndex);
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSong(actualIndex);
        });
        
        playlistItems.appendChild(div);
    });
}

/**
 * LOAD SONG METADATA
 * Updates the player UI with the selected song's information
 * Called before playing to ensure correct metadata is displayed
 * 
 * @param {number} index - The index of the song in the playlist array
 * @returns {void}
 */
function loadSong(index) {
    try {
        const song = playlist[index];
        
        // Update song information display
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        
        // Set audio source and album art
        audioPlayer.src = song.src;
        albumArt.src = song.cover;
        
        // Update playlist UI to highlight currently playing song
        document.querySelectorAll('.playlist-item').forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    } catch (error) {
        console.error('Error loading song:', error);
        artistName.textContent = 'Error loading song';
    }
}

/**
 * PLAYBACK CONTROLS
 * Functions for basic audio playback operations
 */

/**
 * Play the currently loaded song
 * Updates UI and audio element state
 */
function play() {
    isPlaying = true;
    audioPlayer.play();
    updatePlayPauseButton();
}

/**
 * Pause the currently playing song
 */
function pause() {
    isPlaying = false;
    audioPlayer.pause();
    updatePlayPauseButton();
}

/**
 * Toggle between play and pause states
 * Called when user clicks the play/pause button
 */
function togglePlayPause() {
    if (isPlaying) {
        pause();
    } else {
        play();
    }
}

/**
 * UPDATE PLAY/PAUSE BUTTON
 * Changes the button icon and tooltip based on current playback state
 * Icon toggles between play (triangle) and pause (bars) symbols
 */
function updatePlayPauseButton() {
    const icon = playPauseBtn.querySelector('i');
    
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        playPauseBtn.title = 'Pause';
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        playPauseBtn.title = 'Play';
    }
}

/**
 * NAVIGATION CONTROLS
 * Functions for moving between songs in the playlist
 */

/**
 * Play the previous song in the playlist
 * Wraps around to the last song if currently on first song
 */
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    play();
}

/**
 * Play the next song in the playlist
 * Wraps around to the first song if currently on last song
 */
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    play();
}

/**
 * TOGGLE REPEAT MODE
 * Cycles through 3 states: off (0) → repeat all (1) → repeat one (2) → off
 * Updates button appearance and tooltip to show current mode
 * 
 * States:
 * 0 = No repeat - play through list once
 * 1 = Repeat all - return to first song after last
 * 2 = Repeat one - replay same song when it ends
 */
function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    
    if (repeatMode === 0) {
        // Repeat off
        repeatBtn.classList.remove('active', 'repeat-one');
        repeatBtn.title = 'Repeat Off';
    } else if (repeatMode === 1) {
        // Repeat all songs
        repeatBtn.classList.add('active');
        repeatBtn.classList.remove('repeat-one');
        repeatBtn.title = 'Repeat All';
    } else if (repeatMode === 2) {
        // Repeat current song
        repeatBtn.classList.add('active', 'repeat-one');
        repeatBtn.title = 'Repeat One';
    }
}

/**
 * HANDLE SONG END
 * Triggered when the current song finishes playing
 * Determines next action based on repeat mode and autoplay setting
 * 
 * Behavior varies based on current repeat mode:
 * - Mode 2 (repeat one): Restart the same song
 * - Mode 1 (repeat all): Skip to next song
 * - Mode 0 (no repeat): Play next if autoplay enabled, otherwise pause
 */
function handleSongEnd() {
    if (repeatMode === 2) {
        // Repeat one: play the same song again
        audioPlayer.currentTime = 0;
        play();
    } else if (repeatMode === 1) {
        // Repeat all: go to next song
        nextSong();
    } else {
        // No repeat: go to next song if autoplay is on
        if (autoplay) {
            nextSong();
        } else {
            pause();
        }
    }
}

/**
 * PROGRESS BAR FUNCTIONS
 * Manages playback progress display and user seeking
 */

/**
 * Update progress bar and time display during playback
 * Called frequently as audio plays (via 'timeupdate' event)
 * 
 * Calculation: (currentTime / totalDuration) * 100 = percentage
 */
function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = percent;
        progressFill.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    }
}

/**
 * Update progress bar fill while user is dragging the slider
 * Provides immediate visual feedback during seeking
 */
function updateProgressBar() {
    progressFill.style.width = progressBar.value + '%';
}

/**
 * SEEK TO SPECIFIC TIME
 * Convert slider position (0-100) back to audio time (0-duration)
 * Called when user releases the progress slider
 * 
 * Formula: (sliderValue / 100) * totalDuration = timeInSeconds
 */
function seek() {
    const time = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = time;
}

/**
 * Update duration display when song metadata loads
 * Called when audio 'loadedmetadata' event fires
 */
function updateDuration() {
    durationEl.textContent = formatTime(audioPlayer.duration);
}

/**
 * VOLUME CONTROL
 * Manages audio volume and updates the volume icon based on level
 * 
 * Icon states:
 * - Muted (0%): volume-mute icon
 * - Low volume (1-49%): volume-down icon  
 * - High volume (50-100%): volume-up icon
 */
function changeVolume() {
    const volume = volumeSlider.value;
    audioPlayer.volume = volume / 100;
    volumeValue.textContent = volume + '%';
    
    // Update volume icon based on current volume level
    const volumeIcon = document.querySelector('.volume-container i');
    
    if (volume == 0) {
        // Muted
        volumeIcon.classList.remove('fa-volume-down', 'fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else if (volume < 50) {
        // Low volume
        volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-up');
        volumeIcon.classList.add('fa-volume-down');
    } else {
        // High volume
        volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-down');
        volumeIcon.classList.add('fa-volume-up');
    }
}

/**
 * Toggle autoplay on/off
 * When enabled, plays next song automatically when current song ends
 */
function toggleAutoplay() {
    autoplay = autoplayToggle.checked;
}

/**
 * UI UTILITY FUNCTIONS
 */

/**
 * Toggle playlist visibility
 * Slides the playlist in/out and updates button appearance
 */
function togglePlaylist() {
    playlistItems.classList.toggle('collapsed');
    playlistToggleBtn.classList.toggle('collapsed');
}

/**
 * Format time in seconds to readable MM:SS format
 * Used for duration and current time displays
 * 
 * Examples:
 * 0 → "0:00"
 * 65 → "1:05"
 * 130 → "2:10"
 * 
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string "M:SS" or "MM:SS"
 */
function formatTime(seconds) {
    // Handle invalid values
    if (!seconds || isNaN(seconds)) {
        return '0:00';
    }
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    // Pad seconds with leading zero if needed
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * MODAL FORM FUNCTIONS
 * Handles the add/edit song modal dialog
 */

/**
 * Open modal to add a new song to the playlist
 * Resets form and sets title to "Add New Song"
 */
function openAddSongModal() {
    editingIndex = -1; // Indicate we're adding, not editing
    modalTitle.textContent = 'Add New Song';
    songForm.reset();
    songModal.classList.add('show');
}

/**
 * Open modal to edit an existing song
 * Pre-fills form with current song data
 * 
 * @param {number} index - Index of song to edit in playlist array
 */
function openEditSongModal(index) {
    editingIndex = index; // Track which song we're editing
    const song = playlist[index];
    
    modalTitle.textContent = 'Edit Song';
    
    // Pre-fill form with existing song data
    document.getElementById('songTitle').value = song.title;
    document.getElementById('songArtist').value = song.artist;
    document.getElementById('songDuration').value = song.duration;
    document.getElementById('songUrl').value = song.src;
    document.getElementById('songCover').value = song.cover;
    
    songModal.classList.add('show');
}

/**
 * Close the song modal and reset form state
 * Called when user clicks close button, cancel button, or clicks outside modal
 */
function closeModal() {
    songModal.classList.remove('show');
    songForm.reset();
    editingIndex = -1;
}

/**
 * SAVE SONG (Add or Update)
 * Form submission handler that adds new song or updates existing one
 * 
 * - If editingIndex is -1: Add new song to playlist array
 * - If editingIndex >= 0: Update existing song at that index
 * 
 * After saving, the playlist is re-rendered and modal is closed
 * 
 * @param {Event} e - Form submission event
 * @returns {void}
 */
function saveSong(e) {
    e.preventDefault(); // Prevent form submission page reload
    
    // Gather form data
    const newSong = {
        id: editingIndex === -1 ? playlist.length + 1 : playlist[editingIndex].id,
        title: document.getElementById('songTitle').value,
        artist: document.getElementById('songArtist').value,
        duration: parseInt(document.getElementById('songDuration').value),
        src: document.getElementById('songUrl').value,
        cover: document.getElementById('songCover').value
    };
    
    if (editingIndex === -1) {
        // Add new song to playlist
        playlist.push(newSong);
    } else {
        // Update existing song
        playlist[editingIndex] = newSong;
        
        // If editing the currently playing song, reload it
        if (editingIndex === currentSongIndex) {
            loadSong(currentSongIndex);
        }
    }
    
    // Refresh UI and close modal
    createPlaylist();
    closeModal();
}

/**
 * DELETE SONG
 * Removes a song from the playlist with confirmation
 * Adjusts currentSongIndex if needed to prevent index errors
 * 
 * @param {number} index - Index of song to delete
 * @returns {void}
 */
function deleteSong(index) {
    // Ask user to confirm deletion
    if (confirm('Are you sure you want to delete this song?')) {
        playlist.splice(index, 1); // Remove song from array
        
        // Handle currentSongIndex adjustment after deletion
        if (index === currentSongIndex) {
            // Deleted the currently playing song
            currentSongIndex = 0;
            if (playlist.length > 0) {
                loadSong(0);
                pause();
            }
        } else if (index < currentSongIndex) {
            // Deleted a song before current, shift index down
            currentSongIndex--;
        }
        // If deleted song was after current, no adjustment needed
        
        // Refresh UI
        createPlaylist();
    }
}

/**
 * SEARCH FUNCTIONS
 * Filters playlist based on user input (title or artist)
 */

/**
 * HANDLE SEARCH INPUT
 * Filters playlist in real-time as user types
 * Searches both song titles and artist names (case-insensitive)
 * 
 * Logic:
 * 1. Get search term and trim whitespace
 * 2. Show/hide clear button based on input length
 * 3. Filter playlist matching title or artist
 * 4. Re-render playlist with filtered results
 */
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Show/hide clear button based on whether there's input
    if (searchTerm.length > 0) {
        clearSearchBtn.classList.add('show');
    } else {
        clearSearchBtn.classList.remove('show');
    }
    
    // Clear filter if search box is empty
    if (searchTerm.length === 0) {
        filteredPlaylist = [];
    } else {
        // Filter songs matching search term in title or artist
        filteredPlaylist = playlist.filter(song => {
            return (
                song.title.toLowerCase().includes(searchTerm) ||
                song.artist.toLowerCase().includes(searchTerm)
            );
        });
    }
    
    // Update playlist display with filtered results
    createPlaylist();
}

/**
 * Clear search and show all songs
 * Called when user clicks the clear search button
 */
function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.classList.remove('show');
    filteredPlaylist = [];
    createPlaylist();
}

/**
 * INITIALIZATION ON PAGE LOAD
 * Sets up the music player when the HTML document is fully loaded
 * This ensures all DOM elements are available before accessing them
 */
document.addEventListener('DOMContentLoaded', init);
