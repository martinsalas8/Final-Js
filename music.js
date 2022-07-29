const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist")
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMoreBtn = musicList.querySelector("#close");


let musicIndex = 4;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex); //calling load music function once window loaded
})



//Load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb-1].img}.jpg`;// alt + 96 -> ``
    mainAudio.src = `musica/${allMusic[indexNumb-1].src}.mp3`;
}


//play music function
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    
}

//pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//next music function 
function nextMusic(){
    //here we´ll just increment of index by 1
    musicIndex++;
    //if musicIndex is greater than array length then musicIndex will be 1 so the first song will play
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//prev music function
//here we´ll just decrement of index by 1
function prevMusic(){
    musicIndex--;
    //if musicIndex is less than array length then musicIndex will be 1 so the first song will play
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// // play or music button event
// playPauseBtn.addEventListener("click", ()=>{
//     const isMusicPaused = wrapper.classList.contains("paused");
//     //if isMusicPaused is true then call pauseMusic else call play
//     isMusicPaused ? pauseMusic : playMusic();
// });

// play or pause button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPlay = wrapper.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

//next music btn event
nextBtn.addEventListener("click", ()=>{
    nextMusic(); //calling next music function
})

//prev music btn event
prevBtn.addEventListener("click", ()=>{
    prevMusic(); //calling next music function
})

//update time bar according to music current time
mainAudio.addEventListener("timeupdate", (e)=> {
    const currentTime = e.target.currentTime; //current time of song
    const duration = e.target.duration; // total duration of song
    let progressWidth = (currentTime/duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    
    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");
    
    mainAudio.addEventListener("loadeddata", ()=>{
        

        //update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10){ //adding 0 if sec is less than 10
            totalSec = `0${totalSec}`;
        }

        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
        
        //update playing song current time
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);

        if(currentSec < 10){ //adding 0 if sec is less than 10
            currentSec = `0${currentSec}`;
        }

        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

//lets update playing song current time on according to the progress bar width
progressArea.addEventListener("click", (e) =>{
    let progressWidthval = progressArea.clientWidth; //getting width of progress bar
    let clickedOffSetX = e.offsetX; //getting offset x value
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
    playMusic();
    playingSong();
});

//repeat shuffle song according to the icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", () => {
    let getText = repeatBtn.innerText;
    switch (getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped")
            break;
        case "repeat_one": //if icon is shuffle then change it to repeat
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback shuffle")
            break;
        case "shuffle": //if icon is shuffle then change it to repeat
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped")
            break;
}
});

//above we just change the icon, once the song ended
mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
    switch (getText){
        case "repeat": 
            nextMusic();
            break;
        case "repeat_one": //if icon is shuffle then change it to repeat
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": //if icon is shuffle then change it to repeat
            //generating random index between the max range of array length
            let randIndex = Math.floor((math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((math.random() * allMusic.length) + 1);
            }while (musicIndex = randIndex);
            musicIndex = randIndex; //passing randomIndex to musicIndez so the random song will play
            loadMusic(musicIndex);
            playMusic();
            break;
}
});

//able and unable playlist
showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
})

hideMoreBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
})

const ulTag = wrapper.querySelector("ul");
for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].name}" src="./musica/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].name}" class="audio-duration">3:40</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    
}

