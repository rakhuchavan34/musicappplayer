

let audioElement;
let masterPlay;
let songIndex = 0;
let activeSongItem = null;

window.onload = function () {
    
    
    let allMusic = [
        {
            name: "Agar Tum Saath Ho",
            artist: "Arijit Singh",
            img: "images/image-1.jpg",
            src: "songs/music-1.mp3"
        },
        {
            name: "Chaleya",
            artist: "Arijit Singh",
            img: "images/image-2.jpeg",
            src: "songs/music-2.mp3"
        },
        {
            name: "Heeriye Heeriye",
            artist: "Arijit Singh",
            img: "images/image-3.jpeg",
            src: "songs/music-3.mp3"
        },
        {
            name: "Kesariya",
            artist: "Arijit Singh",
            img: "images/image-4.jpeg",
            src: "songs/music-4.mp3"
        },
        {
            name: "Jab Tak",
            artist: "Armaan Malik",
            img: "images/image-5.jpeg",
            src: "songs/music-5.mp3"
        },
        {
            name: "Phir Aur Kya Chahiye",
            artist: "Arijit Singh",
            img: "images/image-6.jpeg",
            src: "songs/music-6.mp3"
        },
        {
            name: "Raatan Lambiyan",
            artist: "Jubin Nautiyal",
            img: "images/image-7.jpeg",
            src: "songs/music-7.mp3"
        },
        {
            name: "Chup Mahi Chup Hai Ranjha",
            artist: "B Praak",
            img: "images/image-8.jpeg",
            src: "songs/music-8.mp3"
        },
        {
            name: "Maan Meri Jaan",
            artist: "King",
            img: "images/image-9.jpeg",
            src: "songs/music-9.mp3"
        },
        {
            name: "Mahiya Jina Sona",
            artist: "Darshan Raval",
            img: "images/image-10.jpeg",
            src: "songs/music-10.mp3"
        },
    ];



    console.log("welcome ");
    
    let audioElement = new Audio('songs/music-1.mp3');
    let masterPlay = document.getElementById("masterPlay");
    let myProgressBar = document.getElementById('myProgressBar');
    let songItems = Array.from(document.getElementsByClassName('songItem'));
    let playlists = []; // Add this line to store playlist names

    function playCurrentSong() {
        console.log("playCurrentSong function called")
        audioElement.src = allMusic[songIndex].src;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        console.log("Image: ", allMusic[songIndex].img);
        console.log("Name: ", allMusic[songIndex].name);
        console.log("Artist: ", allMusic[songIndex].artist);
        document.getElementById('nowPlayingImage').src = allMusic[songIndex].img;
        document.getElementById('nowPlayingSong').innerText = allMusic[songIndex].name;
        document.getElementById('nowPlayingArtist').innerText = allMusic[songIndex].artist;
        document.getElementById('currentplayingsongimage').src = allMusic[songIndex].img;
        document.getElementById('currentplayingsongname').innerText = allMusic[songIndex].name;
        document.getElementById('currentplayingartist').innerText = allMusic[songIndex].artist;
        currentlyplaying.style.opacity=1;
        setActiveSong();
    }

    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            playCurrentSong();
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            currentlyplaying.style.opacity=0;
        }
    });

    audioElement.addEventListener('timeupdate', () => {
        
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
    });

    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = allMusic[i].img;
        element.getElementsByClassName("songName")[0].innerText = allMusic[i].name;
    });

    const makeAllPlays = () => {
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        });
    };

    
    function setActiveSong() {
        songItems.forEach(item => {
            item.classList.remove('active');
        });
        songItems[songIndex].classList.add('active');
        
    }
    
    
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            makeAllPlays();
            const clickedIndex = parseInt(e.target.id);
    
            if (clickedIndex === songIndex) {
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    playCurrentSong();
                    element.classList.remove('fa-play-circle');
                    element.classList.add('fa-pause-circle');
                } else {
                    audioElement.pause();
                    masterPlay.classList.remove('fa-pause');
                    masterPlay.classList.add('fa-play');
                }
            } else {
                songIndex = clickedIndex;
                playCurrentSong();
            }
    
            setActiveSong();
        });
    });
    



    
    function getRandomIndex() {
        let newIndex = songIndex;
        while (newIndex === songIndex) {
            newIndex = Math.floor(Math.random() * allMusic.length);
        }
        console.log("New random index: ", newIndex);
        return newIndex;
    }
    
    let isShuffle = false;
let isRepeat = false;
let shuffleIcon = document.getElementById('shuffle');
let repeatIcon = document.getElementById('repeat');

shuffleIcon.addEventListener('click', () => {
    console.log("shuffle clicked");
    
    shuffleIcon.classList.toggle('active');
    isShuffle = !isShuffle; 
    if (isShuffle) {
        document.getElementById('shuffle').classList.add('active');
    } else {
        document.getElementById('shuffle').classList.remove('active');
    }

    
});

repeatIcon.addEventListener('click', () => {
    
    repeatIcon.classList.toggle('active');
    isRepeat = !isRepeat; 
    if (isRepeat) {
        document.getElementById('repeat').classList.add('active');
    } else {
        document.getElementById('repeat').classList.remove('active');
    }

   
});

document.getElementById('next').addEventListener('click', () => {
    if (isShuffle) {
        songIndex = getRandomIndex(); 
    }else{
         songIndex = (songIndex + 1) % allMusic.length;
    }
    playCurrentSong();
});



document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
   
    playCurrentSong();
   // masterSongName.innerText = songs[songIndex].songName;
    
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})



function handleSongEnd() {
    if (isRepeat) {
        
        playCurrentSong();
    } else if (isShuffle) {
        
        songIndex = getRandomIndex();
        playCurrentSong();
    } else {
       
        songIndex = (songIndex + 1) % allMusic.length;
        playCurrentSong();
    }

}

audioElement.addEventListener('ended', () => {
    handleSongEnd();
});

let volumeIcon = document.getElementById('volumeicon');
let volumeBar = document.getElementById('volumeBar');

volumeBar.addEventListener('input', () => {
    let volumeValue = volumeBar.value / 100; 
    audioElement.volume = volumeValue;

    
    if (volumeValue === 0) {
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-high');
    }
});

function updatePlaylistUI() {
    const playlistBox = document.querySelector('.playlistbox ul');
    playlistBox.innerHTML = ''; // Clear existing playlist items

    playlists.forEach((playlist, index) => {
        const playlistItem = document.createElement('li');
        playlistItem.innerText = playlist;

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa-solid', 'fa-trash');
        deleteIcon.addEventListener('click', () => deletePlaylist(index));

        playlistItem.appendChild(deleteIcon);
        playlistBox.appendChild(playlistItem);
    });
}

function deletePlaylist(index) {
    playlists.splice(index, 1);
    updatePlaylistUI();
}

document.getElementById('create').addEventListener('click', () => {
    const playlistInput = document.getElementById('playlistInput');
    const playlistName = playlistInput.value.trim();

    if (playlistName) {
        playlists.push(playlistName);
        updatePlaylistUI();
        playlistInput.value = ''; // Clear the input field
    }
});


 
};




