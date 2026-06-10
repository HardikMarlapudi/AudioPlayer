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

const songs = [
    {   
        songImage: "./ThreeDaysGrace.jpeg",
        songName: "Animal I have Become",
        songArtist: "Three Days Grace",
        songAudio: "./Three Days Grace - Animal I Have Become.mp3",
    },

    {
        songImage: "",
        songName: "song name",
        songArtist: "song artist",
        songAudio: "./",
    },
];

prevButton.addEventListener("click", function() {
    if(currentSongIndex > 0) {
        currentSongIndex--;
        loadSong();
        songAudio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

playButton.addEventListener("click", function() {
    if(songAudio.paused) {
        songAudio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

nextButton.addEventListener("click", function() {
    if(currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        loadSong();
        songAudio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
})

seekSlider.addEventListener("input", function() {
    songAudio.currentTime = seekSlider.value;
})

songAudio.addEventListener("timeupdate", function() {
    seekSlider.value = songAudio.currentTime;
})

songAudio.addEventListener("ended", function() {
    if(currentSongIndex === songs.length - 1) {
        currentSongIndex = 0;
    } else {
        currentSongIndex++;
    }
    loadSong();
    songAudio.play();
})

function loadSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.songImage;
    songName.textContent = song.songName;
    songArtist.textContent = song.songArtist;
    songAudio.src = song.songAudio;

    songAudio.onloadedmetadata = function () {
        seekSlider.max = Math.floor(songAudio.duration);
        seekSlider.min = 0;
        seekSlider.value = 0;
        endTime.textContent = `${Math.floor(songAudio.duration / 60)}:${Math.floor(songAudio.duration % 60)}`;
    }
}

setInterval(moveSlider, 1000);
loadSong();

function moveSlider() {
    if(songAudio.duration) {
        let endTime = parseInt(songAudio.currentTime % 60);
        let startTime = parseInt((songAudio.currentTime / 60) % 60);
        if(endTime < 10) {
            endTime = "0" + endTime;
        }
        startTime.textContent = `${endTime}:${startTime}`;
        endTime.textContent = `${startTime}:${endTime}`;
    }
}
