
let currentSong = new Audio();


async function getSongs() {
    
    let a =  await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1])
        }
        
    }
    return songs;
}


function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds / 60);
    const paddedMins = mins.toString().padStart(2, '0');
    const paddedSecs = secs.toString().padStart(2, '0');
    return `${paddedMins}:${paddedSecs}`;
  }
  
  
  


const palyMusic = (track, Pause=false)=>{
//   let audio = new Audio("/songs/" + track)
currentSong.src = "/songs/" + track;
if(!Pause){
    currentSong.play()
    play.src = "paused.svg"
}
currentSong.play()
play.src = "paused.svg"
document.querySelector(".songinfo").innerHTML = decodeURI(track)
document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}



async function main(){
    
    let songs = await getSongs();
    palyMusic(songs[0], true)
    console.log(songs)
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0  ];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
        

         <i class="fa-solid fa-music"></i>
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div>
                  <div>Shahbaz</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <i class="fa-solid fa-play"></i>
                </div>
        </li>`;

        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
            e.addEventListener("click", element=>{

                console.log(e.querySelector(".info").firstElementChild.innerHTML)
                palyMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            })
        })
    }
    
// for (const song of songs) {
//         songUL.innerHTML += `<li>${song.replaceAll("%20", " ")}</li>`;
//     }
//     var audio = new Audio(songs[0]);
//     audio.play();

//     audio.addEventListener("loadeddata", () => {
//         // let duration = audio.duration;
//         // console.log(duration)
//         console.log(audio.duration, audio.currentSrc, audio.currentTime)
// //         // The duration variable now holds the duration (in seconds) of the audio clip
//       });
play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src = "paused.svg"
    }
    else{
        currentSong.Pause();
        play.src = "play.svg"
    }
})

currentSong.addEventListener("timeupdate", ()=>{
      console.log(currentSong.currentTime, currentSong.duration)
      document.querySelector(".songtime").innerHTML = `${formatSeconds(currentSong.currentTime)}/${formatSeconds(currentSong.duration)}`
      document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%";
})


document.querySelector(".seekbar").addEventListener("click", e=>{
    let persent = (e.offsetX/e.target.getBoundingClientRect().width) * 100 +"%";
    document.querySelector(".circle").style.left = persent
    currentSong.currentTime = ((currentSong.duration) * persent)/100;
})


}
main();