
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

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'limegreen',
    progressColor: 'green'
});

wavesurfer.load(tracks[0].url);

function makeTrackList(tracksArr) {

    tracksArr.forEach((item) => {
        let list = document.getElementById('track-list');
        let track = document.createElement('li');
        track.classList.add('track');
        track.innerHTML = `
            <span class="track-name">${item.name}</span> - <span class="track-artist">${item.artist} </span>
            <span class="track-length">${item.time}</span>
            `;
        list.appendChild(track);
    });
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
    wavesurfer.stop();
}

makeTrackList(tracks);