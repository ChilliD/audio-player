
const tracks = [
    {
        name: 'Feel Alright',
        artist: 'Chilli D',
        url: '/music/2020ChilliDFeelAlright.mp4',
        time: '2:10'
    },
    {
        name: `Runnin' Out`,
        artist: 'Chilli D',
        url: '/music/2020ChilliDRunninOut.mp4',
        time: '1:00'
    },
    {
        name: 'Slack',
        artist: 'Chilli D',
        url: '/music/2020ChilliDSlack.mp4',
        time: '2:42'
    },
    {
        name: 'Stalling',
        artist: 'Chilli D',
        url: '/music/2020ChilliDStalling.mp4',
        time: '2:24'
    },
    {
        name: 'Teath',
        artist: 'Chilli D',
        url: '/music/2020ChilliDTeath.mp4',
        time: '3:13'
    },
    {
        name: 'Walk Off',
        artist: 'Chilli D',
        url: '/music/2020ChilliDWalkOff.mp4',
        time: '3:17'
    },
    {
        name: 'World Tour',
        artist: 'Chilli D',
        url: '/music/2020ChilliDWorldTour.mp4',
        time: '1:54'
    },
    {
        name: 'Zesty',
        artist: 'Chilli D',
        url: '/music/2020ChilliDZesty.mp4',
        time: '2:03'
    }
];

let paused = true;
let initialLoad;
let duration;

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'limegreen',
    progressColor: 'green'
});

function makeTrackList(tracksArr) {

    tracksArr.forEach((item, index) => {
        let list = document.getElementById('track-list');
        let track = document.createElement('li');
        track.classList.add('track');
        track.innerHTML = `
            <span class="track-name">${item.name}</span>&nbsp; - &nbsp;<span class="track-length">${item.time} </span>
            <br /><span class="track-artist">${item.artist}</span>
            `;
        track.onclick = function() {selectTrack(item)};
        list.appendChild(track);
    });
}

function selectTrack(track) {
    let nowPlaying = document.getElementById('now-playing');
    duration = track.time;

    handleStop();
    wavesurfer.empty();

    nowPlaying.innerHTML = `Now Playing:&nbsp; ${track.name} by ${track.artist}
    `;

    wavesurfer.load(track.url);
    initialLoad = false;
}

function handlePlayPause() {
    let button = document.getElementById('play-btn');

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

function init() {
    selectTrack(tracks[0]);
    makeTrackList(tracks);
    wavesurfer.stop();
    initialLoad = true;
}

wavesurfer.on('ready', function() {
    let playButton = document.getElementById('play-btn');

    if (!initialLoad) {
    wavesurfer.play();
    playButton.innerHTML = `<i class="fas fa-pause"></i>`;
    }
});

wavesurfer.on('finish', function() {
    selectTrack(tracks[0]);
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

init();