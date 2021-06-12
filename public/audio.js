let count;
function pause() {
    var audio = document.getElementById('audio');
    count = 0;
    audio.pause();
}
function play() {
    var audio = document.getElementById('audio');
    count = 1;
    audio.play();
}

