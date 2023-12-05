document.addEventListener("DOMContentLoaded", () => {
    const url = `https://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php`

    // debug statement 
    //localStorage.setItem("songsLocalCopy", null);
    let songsLocalCopy = JSON.parse(localStorage.getItem('songsLocalCopy'));

    //console.log(songsLocalCopy);

    // fetch, then from local storage > if = null, fetch url. else, continue. 
    if (songsLocalCopy != null && songsLocalCopy.length > 0 && songsLocalCopy[0] != null) {

        console.log("Local Copy Found.");

        buildPage(songsLocalCopy);

    }
    else {
        console.log('Local Copy Not Found, Fetching now.');
        fetch(url)
            .then((resp) => resp.json())
            .then((songs) => {


                // console.dir(songs);
                // sorting songs by title below
                const sorted = songs.sort((a, b) => a.title < b.title ? -1 : 1);
                 console.dir(sorted); 
                localStorage.setItem('songsLocalCopy', JSON.stringify(sorted));
                buildPage(sorted);

            });
    }
});


// loop through the sorted songs and output each as a table row. 
function buildPage(sorted) {
    const tableBody = document.getElementById('songsBody');
   // tableBody.innerHTML = '';

    const tbody = document.querySelector("#songsBody");
    // get in the habit of using 'let' when looping. 

    // make a table tag, add the row to the table tag, add the table tag to the TBody element 
    const table = document.createElement("table");
    const thead = document.createElement("thead");


    //thead.append("Browse / Search Results ");


    for (let s of sorted) {

        // create a table row 
        const tr = document.createElement("tr");

        // add song-id to the element's dataset 
        tr.dataset.song = s.song_id;

        // now, create the four table columns
        
       // const titleRow = document.createElement('tr');
       // titleRow.textContent = s.title;
      //  tr.appendChild(titleRow);


        tr.appendChild(creatTableColumn(s, "title"));
        tr.appendChild(creatTableColumn(s.artist, "name"));
        tr.appendChild(creatTableColumn(s, "year"));
        tr.appendChild(creatTableColumn(s.genre, "name"));


        // set event handling on this table row 
        tr.addEventListener("click", (e) => {
            // console.log("click happened on a row - but which row?")
            // instead - we are going to use the dataset collection. 
            const songid = e.target.parentNode.dataset.song;
            console.log(songid);
            // now, find the song object that corresponds to that ID
            const selectedSong = sorted.find((s)=> s.song_id == songid);
            console.log("This is row:"+s.title);
            


            if(selectedSong!=null){
                showIndividualSong(selectedSong);

            displaySongDetails(selectedSong);
            }
            else
            {
                console.log(sorted);
            }
        });

        // add row to table 
        table.appendChild(tr);
    }
    tbody.appendChild(table);


    
    // revealCredits; // not working troubleshoot later
}


// better JS programming paradigm - have your functions return elements 
function creatTableColumn(songid, fieldName) {
    const td = document.createElement("td");
    td.textContent = songid[fieldName];
    return td;
}


function displaySongDetails(song) {
    let bingbong = document.querySelector("#individualSongPopup");
    if(bingbong==null){
        let message = " song pop up ID check successful - proceed";
        throw new Error(message);
    }



    let pp = document.createElement("p");
    pp.textContent = "yuhhhhhhhhhhhhhhhhh";
    bingbong.appendChild(pp);
    return;
    // we need to; hide songs table using css styling 
    document.querySelector("#songTable").className = "hide"; // probably want to use class list / toggle for more functionality - randy in lecture 

    songTitleVar = document.querySelector("#songDetails");
    if(songTitleVar!=null){
        songTitleVar.className = "show"
        ;
    }
    
    songArtistNameVar = document.querySelector("#songDetails");
    if(songArtistNameVar!=null){
        songArtistNameVar.className = "show";
    }
    
    songYearVar = document.querySelector("#songDetails");
    if(songYearVar!=null){
        songYearVar.className = "show";
    }
    
    songGenreVar = document.querySelector("#songDetails");
    if(songGenreVar!=null){
        songGenreVar.className = "show";
    }
    

    // populate field data 
    document.querySelector("#title").textContent = song.title;
    document.querySelector("#energy").textContent = song.analytics.energy;
    document.querySelector("#title").textContent = song.year;
}


function revealCredits(){
    const creditName = document.getElementById('Credit_Name');
    const creditGithub = document.getElementById('Credit_Github');
    const buttonCredits = document.getElementById('buttonCredits');
    

    buttonCredits.addEventListener('mouseover',function(){
        setTimeout(function(){
            creditGithub.style.display='relative';
            creditName.style.display='relative';
        },5000);
    })
}

function showIndividualSong(song){
    /*
-- pop up a mini-window with; single song view 
-> This function changes the list view so that it only shows 1 song. 
0. trigger function >> pass selected songID
1. hide table
2. make popup window >> visible, has x icon for exit
-------- 
3. populate window >> song details of SongID that was clicked
4. icon on-click listener >> closes window 
    */
 let table = document.getElementById('songTable');
 let individualSongId = document.getElementById('individualSongPopup');

 if(table==null){
    let message = "table not null - proceed ";
    throw new Error(message);
 }
 else{
    table.style.display='none';
    console.log("successful")
    displaySongDetails(song);
    
    let anchVar = document.createElement('a');
    
    anchVar.textContent = "testing:";
    
    individualSongId.appendChild(anchVar);

    anchVar.onclick = hideIndividualSong();
    


 }

 

}

function hideIndividualSong(){
    console.log('yuhuhuhuhuhuh');
    
}