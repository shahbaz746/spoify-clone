
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
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  


const palyMusic = (track)=>{
//   let audio = new Audio("/songs/" + track)
currentSong.src = "/songs/" + track;
currentSong.play()
play.src = "paused.svg"
document.querySelector(".songinfo").innerHTML = track
document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}



async function main(){
    
    let songs = await getSongs();
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
})


}
main();