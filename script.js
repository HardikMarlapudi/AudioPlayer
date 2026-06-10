const prevButton = document.getElementById("previousSong");
const playButton = document.getElementById("playSong");
const nextButton = document.getElementById("nextSong");
const seekSlider = document.getElementById("seekRange");
const songImage = document.getElementById("songImage");
const songName = document.getElementById("songName");
const songArtist = document.getElementById("songArtist");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const songAudio = document.createElement("audio");
let currentSongIndex = 0;

// Array of songs that are being used.
const songs = [
    {   
        songImage: "./ThreeDaysGrace.jpeg",
        songName: "Animal I Have Become",
        songArtist: "Three Days Grace",
        songAudio: "./Animal_I_Have_Become.mp3",
    },
    {
        songImage: "./SR-71.jpeg",
        songName: "Goodbye",
        songArtist: "SR-71",
        songAudio: "",
    }
];

// Loads the current song along with the songImage, songName, songArtist, and songAudio.
function loadSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.songImage;
    songName.textContent = song.songName;
    songArtist.textContent = song.songArtist;
    songAudio.src = song.songAudio;

    songAudio.onloadedmetadata = function() {
        seekSlider.max = Math.floor(songAudio.duration);
        seekSlider.value = 0;

        let durationMinute = Math.floor(songAudio.duration / 60);
        let durationSecond = Math.floor(songAudio.duration % 60);
        if(durationSecond < 10) {
            durationSecond = "0" + durationSecond;
        }
        endTime.textContent = `${durationMinute}:${durationSecond}`;
    }
}

// Previous Button
prevButton.addEventListener("click", function() {
    if(currentSongIndex > 0) {
        currentSongIndex--;
        loadSong();
        songAudio.play();
        playButton.innerHTML = '⏸️';
    }
});

// Play Button
playButton.addEventListener("click", function() {
    if(songAudio.paused) {
        songAudio.play();
        playButton.textContent = '⏸️';
    } else {
        songAudio.pause();
        playButton.innerHTML = '▶️';
    }
});

// Next Button
nextButton.addEventListener("click", function() {
    if(currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        loadSong();
        songAudio.play();
        playButton.innerHTML = '▶️';
    }
})

// SongSlider to adjust the songs limit
seekSlider.addEventListener("input", function() {
    songAudio.currentTime = seekSlider.value;
})

// Audio that plays the song and updates the song's time limit.
songAudio.addEventListener("timeupdate", function() {
    seekSlider.value = songAudio.currentTime;

    let currentMinute = Math.floor(songAudio.currentTime / 60);
    let currentSecond = Math.floor(songAudio.currentTime % 60);
    if(currentSecond < 10) {
        currentSecond = "0" + currentSecond;
    }
    startTime.textContent = `${currentMinute}:${currentSecond}`;
});

songAudio.addEventListener("ended", function() {
   currentSongIndex = (currentSongIndex + 1) % songs.length;
   loadSong();
   songAudio.play();
});

// Automatically loads the song once the page is loaded.
loadSong();
