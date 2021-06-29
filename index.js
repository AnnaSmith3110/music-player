const audio = document.querySelector("#audio");
const thumbnail = document.querySelector(".thumbnail");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const progress = document.querySelector("#progress");
const play = document.querySelector("#play");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const repeat = document.querySelector("#repeat");
const shuffle = document.querySelector("#shuffle");
const menu = document.querySelector("#menu");
const close = document.querySelector("#close");
const add = document.querySelector("#add");
const playlist = document.querySelector(".my-playlist");
const currentSong = document.querySelector("#currentSong");
const maxSong = document.querySelector("#maxSong");
const ct = document.querySelector("#ct");
const dt = document.querySelector("#dt");


var playing = true, songIndex=0, click=0;
let songSrc = ['https://pl.meln.top/mr/6931fc12fadea78972c9359108320166.mp3?session_key=c273d1ee2f9f3c4de6e14c9671c8baa9', 'https://pl.meln.top/mr/239db65a27c83d5cc38f9f7e5c6e3dd9.mp3?session_key=31eb1f6b83cf37077a2368609048170e', 'https://pl.meln.top/mr/11fba19912f3d43e173d6fe9f56bd0ed.mp3?session_key=fb53d808fab4328ab6f50864164af362', 'https://pl.meln.top/mr/ae71a7d590f10e81c5ea3bbd30017b54.mp3?session_key=092f37d273f4e089c2c8584c79bdad31'];
let songThumbnail = ['https://upload.wikimedia.org/wikipedia/ru/4/47/LanaDelRey_BornToDie.jpg', 'https://images-na.ssl-images-amazon.com/images/I/41-FKc%2Bp2oL._SY445_SX342_QL70_ML2_.jpg', 'https://i.pinimg.com/originals/fe/83/eb/fe83ebc7200f761fe514f74a3885d5a7.jpg','https://m.media-amazon.com/images/I/81NIbz4z0DL._SS500_.jpg'];

let songTitle = ['born to die', 'desire', 'feel it', 'parfait tirage'];

let songArtist = ['lana del ray', 'bob moses & zhu', 'michele morrone', 'paradis'];
  
let myPlayList = [];
  //on DOM loaded
  (function(){
    thumbnail.setAttribute("style", "background-image: url(" + songThumbnail[0] + ")");
    audio.src = songSrc[0];
    title.innerHTML = songTitle[0];
    artist.innerHTML = songArtist[0];
    currentSong.innerHTML = "1";
    maxSong.innerHTML = songSrc.length;
  })();
  
  //event handling
  play.addEventListener("click", playPause);
  previous.addEventListener("click", previousSong);
  next.addEventListener("click", nextSong);
  progress.addEventListener("change", changeProgress);
  repeat.addEventListener("click", repeatSong);
  shuffle.addEventListener("click", shuffleSong);
  add.addEventListener("click", addSong);
  menu.addEventListener("click", open);
  close.addEventListener("click", closePlaylist);
 
  //declare functions
  function playPause()
  {
    if(playing) {
      audio.play();
      play.setAttribute("name", "pause-circle");
      playing = false;
    } else {
      audio.pause();
      play.setAttribute("name", "play-circle");
      playing = true;
    }
  }


function previousSong()
{
  songIndex--;
  if(songIndex<0) {
    songIndex=1;
    currentSong = songIndex;
  }
     thumbnail.setAttribute("style", "background-image: url(" + songThumbnail[songIndex] + ")");
    title.innerHTML = songTitle[songIndex];
    artist.innerHTML = songArtist[songIndex];
   audio.src = songSrc[songIndex];
    currentSong.innerHTML = songIndex;
   
  playing = true;
  playPause();
}

function nextSong()
{
  songIndex++;
  if(songIndex>3) {
      songIndex = 0;
      currentSong = songIndex;
    }
  thumbnail.setAttribute("style", "background-image: url(" + songThumbnail[songIndex] + ")");
    title.innerHTML = songTitle[songIndex];
    artist.innerHTML = songArtist[songIndex];
     audio.src = songSrc[songIndex];
    currentSong.innerHTML = songIndex+1;
    
  playing = true;
  playPause();
}

function repeatSong() {
  click++;
  if((click%2) == 0) {
    repeat.style.color = "var(--play-icon)";
    audio.addEventListener("ended", function(){
      audio.play();
    });
  } else {
    repeat.style.color = "var(--icon)";
  }
}

function shuffleSong()
{
  
}

function open()
{
  if(playlist.style.display == "none") {
    playlist.style.display = "flex";
  } else {
    playlist.style.display = "none";
  }
}

function closePlaylist()
{
  playlist.style.display = "none";
}


function addSong()
{
  let choosenSong = audio.getAttribute("src");
  if(songSrc.includes(choosenSong)) {
    let index = songSrc.indexOf(choosenSong);
    let choosenThumbnail = songThumbnail[index];
    let choosenTitle = songTitle[index];
    let choosenArtist = songArtist[index];
    myPlayList.push(choosenSong);
    
        row.innerHTML = myPlayList;
      
    console.log(myPlayList);
    console.log(index);
  } else {
    console.log("no");
  }
}


function updateProgressValue()
{
  progress.value = audio.currentTime;
  progress.max = audio.duration;
  
  //pass arg to formatTime()
  ct.innerHTML = formatTime(Math.floor(audio.currentTime));
  if(dt.innerHTML === "NaN:NaN") {
    dt.innerHTML = "0:00";
  } else {
    dt.innerHTML = formatTime(Math.floor(audio.duration));
  }
}
setInterval(updateProgressValue, 500);

function changeProgress()
{
  audio.currentTime = progress.value;
}

function formatTime(seconds) {
  let min = Math.floor((seconds/60));
  let sec = Math.floor(seconds - (min*60));
  if(sec<10)
    {
      sec = `0${sec}`;
    };
  return `${min}:${sec}`;
}
