var SoundButton = document.getElementById("sound-button");
var SoundDescription = document.getElementById("audio-description");
var SoundIcon = SoundButton.getElementsByClassName("bi")[0];
var audio = new Audio('/static/audio/audio_file.mp3');

var enableMusic = function() {
    console.log("enabled");
    SoundIcon.classList.remove('bi-volume-mute');
    SoundIcon.classList.add('bi-volume-up');
    SoundButton.removeEventListener('click', enableMusic, false);
    SoundButton.addEventListener('click', disableMusic, false);

    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
    audio.volume = 0.01;

    SoundDescription.innerHTML = "retroTV | Amusement Park (Chiptune cover)"
}
var disableMusic = function() {
    console.log("disabled");
    SoundIcon.classList.remove('bi-volume-up');
    SoundIcon.classList.add('bi-volume-mute');
    SoundButton.removeEventListener('click', disableMusic, false);
    SoundButton.addEventListener('click', enableMusic, false);

    audio.pause();

    SoundDescription.innerHTML = ""
}

if (SoundIcon.classList.contains('bi-volume-mute')) {
    SoundButton.addEventListener('click', enableMusic, false);
}
else {
    SoundButton.addEventListener('click', disableMusic, false);
}