
const albums = [
    {   
        title: '2020',
        artist: 'Chilli D',
        image: 'graphics/ChilliD_2020_albumart.jpg', 
        tracks: [    
            {
                name: 'Feel Alright',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDFeelAlright.mp4',
                time: '2:10',
                number: 1
            },
            {
                name: `Runnin' Out`,
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDRunninOut.mp4',
                time: '1:00',
                number: 6
            },
            {
                name: 'Slack',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDSlack.mp4',
                time: '2:42',
                number: 3
            },
            {
                name: 'Stalling',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDStalling.mp4',
                time: '2:24',
                number: 5
            },
            {
                name: 'Teath',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDTeath.mp4',
                time: '3:13',
                number: 2
            },
            {
                name: 'Walk Off',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDWalkOff.mp4',
                time: '3:17',
                number: 4
            },
            {
                name: 'World Tour',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDWorldTour.mp4',
                time: '1:54',
                number: 7
            },
            {
                name: 'Zesty',
                artist: 'Chilli D',
                url: '/music/2020/2020ChilliDZesty.mp4',
                time: '2:03',
                number: 8
            }
        ]
    },
    {
        title: '2021',
        artist: 'Chilli D',
        image: 'graphics/2021.png',
        tracks: [
            {
                name: 'Jungle',
                artist: 'Chilli D',
                url: '/music/2021/01Jungle.mp3',
                time: '2:25',
                number: 1
            },
            {
                name: 'Sweetch',
                artist: 'Chilli D',
                url: '/music/2021/02Sweetch.mp3',
                time: '0:52',
                number: 2
            },
            {
                name: 'Can\'t Make Me',
                artist: 'Chilli D',
                url: '/music/2021/03CantMakeMe.mp3',
                time: '1:35',
                number: 3
            },
            {
                name: 'TricklDown',
                artist: 'Chilli D',
                url: '/music/2021/04TricklDown.mp3',
                time: '1:13',
                number: 4
            },
            {
                name: 'Boss Level',
                artist: 'Chilli D',
                url: '/music/2021/05BossLevel.mp3',
                time: '0:44',
                number: 5
            },
            {
                name: 'Spynnr',
                artist: 'Chilli D',
                url: '/music/2021/06Spynnr.mp3',
                time: '1:03',
                number: 6
            },
            {
                name: 'Dreamland',
                artist: 'Chilli D',
                url: '/music/2021/07Dreamland.mp3',
                time: '1:19',
                number: 7
            },
            {
                name: 'DriveN',
                artist: 'Chilli D',
                url: '/music/2021/08DriveN.mp3',
                time: '1:38',
                number: 8
            },
            {
                name: 'Find Me',
                artist: 'Chilli D',
                url: '/music/2021/09FindMe.mp3',
                time: '1:57',
                number: 9
            },
            {
                name: 'Leave Alone',
                artist: 'Chilli D',
                url: '/music/2021/10LeaveAlone.mp3',
                time: '1:15',
                number: 10
            },
        ]
    },
    {
        title: 'The Hue Project',
        artist: 'Chilli D',
        image: 'graphics/NEWhueTemp-01.jpg',
        tracks: [
            {
                name: 'The Downloading',
                artist: 'Chilli D',
                url: '/music/Hue/01TheDownloading.mp3',
                time: '1:55',
                number: 1
            },
            {
                name: 'It Lives',
                artist: 'Chilli D',
                url: '/music/Hue/02ItLives.mp3',
                time: '1:02',
                number: 2
            },
            {
                name: 'Belly of the Beast',
                artist: 'Chilli D',
                url: '/music/Hue/03BellyoftheBeast.mp3',
                time: '2:24',
                number: 3
            },
            {
                name: 'What Am I?',
                artist: 'Chilli D',
                url: '/music/Hue/04WhatAmI_.mp3',
                time: '1:30',
                number: 4
            },
            {
                name: 'End',
                artist: 'Chilli D',
                url: '/music/Hue/05End.mp3',
                time: '3:32',
                number: 5
            },
        ]
    }
];

let tracks = [];
let paused = true;
let initialLoad;
let duration;
let currentTrackNum;
let activeAlbum;
let navAlbum;
let activeTracklist = [];

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'limegreen',
    progressColor: 'green'
});

/* NAV FUNCS */

function clearPane() {
    let parent = document.getElementById('tracks-pane');
    
    while (parent.lastChild) {
        parent.removeChild(parent.firstChild);
    }
}

function makeAlbumList(albumsArr) {
    let path = document.getElementById('nav-title');
    path.innerText = 'Albums';

    clearPane();

    albumsArr.forEach((album) => {
        let wrapper = document.getElementById('tracks-pane');
        let child = document.createElement('div');
        child.classList.add('album-card');
        child.innerHTML = `
            <img class="album-thumb" src="${album.image}">
            <div class="album-card-text">
                <span class="album-card-title">${album.title}</span>
                <span class="album-card-artist">${album.artist}</span>
            </div>
        `;
        child.onclick = function() { 
            navAlbum = album;
            makeTrackList(album.tracks); 
        };
        wrapper.appendChild(child);
    });
}

function makeTrackList(tracksArr) {
    let path = document.getElementById('nav-title');
    path.innerText = `${navAlbum.title} - Tracks`;

    clearPane();

    let wrapper = document.getElementById('tracks-pane');
    let list = document.createElement('ol');
    list.id = 'track-list';
    list.classList.add('track-list');
    wrapper.appendChild(list);

    let orderedArr = tracksArr.sort((a, b) => (a.number > b.number) ? 1 : -1);

    orderedArr.forEach((item) => {
        let list = document.getElementById('track-list');
        let track = document.createElement('li');
        track.classList.add('track');
        track.innerHTML = `
            <span class="track-name">${item.name}</span>&nbsp; - &nbsp;<span class="track-length">${item.time} </span>
            <br /><span class="track-artist">${item.artist}</span>
            `;
        track.onclick = function() {
            activeAlbum = navAlbum; 
            selectTrack(item);
            activeTracklist = orderedArr;
        };
        list.appendChild(track);
    });

    tracks = tracksArr;
}

function selectTrack(track) {
    let nowPlaying = document.getElementById('now-playing');
    let visWindow = document.getElementById('visualizer');

    visWindow.style.backgroundImage = `url(${activeAlbum.image})`;

    duration = track.time;
    currentTrackNum = (track.number - 1);

    handleStop();
    wavesurfer.empty();

    nowPlaying.innerHTML = `Now Playing:&nbsp; 
    <span class="track-playing">${track.name}</span>
    <span class="artist-playing">by ${track.artist}</span>
    <span class="album-playing">${activeAlbum.title}</span>
    `;

    wavesurfer.load(track.url);
    initialLoad = false;
}

/* HANDLER FUNCS */

function handleBackNav() {
    clearPane();
    makeAlbumList(albums);
}

function handlePlayPause() {
    let button = document.getElementById('play-btn');
    initialLoad = false;

    if (paused) {
        button.innerHTML = `<i class="fas fa-pause"></i>`;
        paused = false;
    } else {
        button.innerHTML = `<i class="fas fa-play"></i>`;
        paused = true;
    }

    wavesurfer.playPause();

}

function handleStop() {
    let playButton = document.getElementById('play-btn');

    wavesurfer.stop();
    playButton.innerHTML = `<i class="fas fa-play"></i>`;
    paused = true;
}

function handleSkipForward() {
    selectTrack(activeTracklist[currentTrackNum + 1]);
}

function handleSkipBack() {
    selectTrack(activeTracklist[currentTrackNum - 1]);
}

function handleVolume() {
    let slider = document.getElementById('volume');
    wavesurfer.setVolume(slider.value);
}

/* WAVESURFER LISTENERS */

wavesurfer.on('ready', function() {
    let playButton = document.getElementById('play-btn');

    if (!initialLoad) {
    wavesurfer.play();
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    paused = false;
    } 
});

wavesurfer.on('finish', function() {
    currentTrackNum += 1;

    if (currentTrackNum >= tracks.length) {
        let timeline = document.getElementById('duration');
        let nowPlaying = document.getElementById('now-playing');
        let playButton = document.getElementById('play-btn');
        wavesurfer.empty();
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
        nowPlaying.innerHTML = `Now Playing:`;
        timeline.innerHTML = `0:00 / 0:00`;
    } else {
        selectTrack(tracks[currentTrackNum]);
    }
});

wavesurfer.on("audioprocess", function() {
    let timeline = document.getElementById('duration');
    let currentTime = wavesurfer.getCurrentTime();

    var s = parseInt(currentTime % 60);
    var m = parseInt((currentTime / 60) % 60);
    if (s < 10) {
        timeline.innerHTML = `${m}:0${s} / ${duration}`;
    }
    else {
        timeline.innerHTML = `${m}:${s} / ${duration}`;
    }
});

/* VISUALIZER */


/* KEY LISTENERS */

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            e.preventDefault();
            handlePlayPause();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            handleSkipBack();
            break;
        case 'ArrowRight':
            e.preventDefault();
            handleSkipForward();
            break;
        default:
            break;
    }
});

/* INIT */

function init() {
    //currentTrackNum = 0;
    makeAlbumList(albums);
    wavesurfer.stop();
    initialLoad = true;
    wavesurfer.setVolume(.75);
}

init();