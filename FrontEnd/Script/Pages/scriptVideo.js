const video = document.getElementById('video');
let reversing = false;

video.addEventListener('ended', () => {
    reversing = !reversing; 
    if (reversing) {
        video.pause();
        reversePlayback(video);
    } 
    else {
        video.currentTime = 0;
        video.play();
        }
    });

    function reversePlayback(video) {
    const interval = setInterval(() => {
    if (video.currentTime <= 0) {
        clearInterval(interval);
        video.play();
    } 
    else {
        video.currentTime -= 0.04; 
    }
    }, 40);}