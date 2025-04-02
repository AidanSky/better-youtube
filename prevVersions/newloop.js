let videoElement, vidLength;

function timeToSeconds(timeStr) {
    if (timeStr.split(":").length === 2) {
        const [minutes, seconds] = timeStr.split(":").map(Number);
        return minutes * 60 + seconds;
    } else {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
}

function initializeLoop() {
    const videoElement = document.querySelector('video');
    const container = document.getElementById("title");
    const videoLength = document.querySelector('.ytp-time-duration');

    if (!videoElement || !container || !videoLength) {
        console.log("Required elements not found");
        return false;
    }

    const timeElement = videoElement.currentTime;
    const vidLength = videoLength.innerText;

    if (container.querySelector('.loop-button')) return true;

    // create button'
    console.log("the button creation here:");
    const button = document.createElement("button");
    button.innerText = "Loop";
    button.className = 'loop-button';
    button.style.backgroundColor = "#ff0000";
    button.style.color = "white";
    button.style.padding = "5px 10px";
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.addEventListener("click", () => {
        alert(`The video length is ${vidLength}`);
        let inputStart = prompt("Enter loop start time: (00:00)");
        let inputEnd = prompt("Enter loop end time: (00:00)");
        if (inputStart === null || inputStart === "") {
            inputStart = "00:00";
        }
        if (inputEnd === null || inputEnd === "") {
            inputEnd = vidLength;
        }
        if (inputEnd != inputStart) {
            console.log("loop is initiated here");
            loopVideo(inputEnd, inputStart);
        }
    });
    container.appendChild(button);
    return true;
}

function loopVideo(targetTime = vidLength, startTime = "0:00") {
    const startSeconds = timeToSeconds(startTime);
    const targetSeconds = timeToSeconds(targetTime);
    const lengthSeconds = timeToSeconds(vidLength);

    console.log(startSeconds);

    // error handling for if no video or if no time
    if (!timeElement || !videoElement) {
        console.log("Element not found");
        return;
    }
    // error if invalid time
    if ((targetSeconds > lengthSeconds) || (startSeconds > targetSeconds)) {
        console.Error("Invalid time selection");
        return;
    }

    // if valid, check for when time is reached, and if reached, loop to startTime
    let interval = setInterval(() => {
        let currentSeconds = videoElement.currentTime;
        if (currentSeconds >= targetSeconds) {
            videoElement.currentTime = startSeconds;
            console.log(`video reset at ${startSeconds}`);
        }
        if (!document.querySelector('video')) {
            clearInterval(interval);
        }
    }, 500);
}

let currentURL = window.location.href;
function monitorPage() {
    if (window.location.href !== currentURL) {
        currentURL = window.location.href;
        console.log("page has been updated");
    }
    if (!initializeLoop()) {
        setTimeout(monitorPage, 500);
    }
}

window.addEventListener("load", () => {
    console.log("YouTube Enhancer loaded on:", window.location.href);
    monitorPage();
});