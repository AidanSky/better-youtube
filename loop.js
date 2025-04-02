let currentURL = window.location.href;
function monitorPage() {
    if (window.location.href !== currentURL) {
        currentURL = window.location.href;
        console.log("page has been updated");
        setupLoop();
    }
}

// function to grab total video length, also grab starting length, let client input loop length
const getVideoLength = () => {
    // create promise 
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 100;

        const videoLengthCheck = () => {
            const videoLength = document.querySelector('.ytp-time-duration');
            if (videoLength) {
                resolve(videoLength.textContent);
            } else if (attempts > maxAttempts) {
                reject(new Error("Maximum attempts to find length exceeded"));
            } else {
                setTimeout(videoLengthCheck, 500);
                attempts++;
            }
        }
        videoLengthCheck();
    });
};

// function to create button in container below title
const getContainer = () => {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        const maxAttempts = 100;

        const containerCheck = () => {
            const container = document.getElementById("title");
            if (container) {
                resolve(container);
            } else if (attempts > maxAttempts) {
                reject(new Error("max amount of attempts exceeded"));
            } else {
                attempts++;
                setTimeout(containerCheck, 500);
            }
        };
        containerCheck();
    });
};

// once full DOM is loaded, define vidLength and initialize button
let vidLength = "unknown";
let loopInterval = null;

function setupLoop() {
    const existingButton = document.querySelector('#loop-button');
    if (existingButton) {
        existingButton.remove();
    }
    Promise.all([getVideoLength(), getContainer()])
        .then(([length, container]) => {
            vidLength = length;
            console.log("Length of video:", vidLength);

            // create button'
            console.log("button creation here:");
            const button = document.createElement("button");
            button.innerText = "Loop";
            button.id = "loop-button";
            button.style.backgroundColor = "#ff0000";
            button.style.color = "white";
            button.style.padding = "5px 10px";
            button.style.border = "none";
            button.style.cursor = "pointer";

            button.addEventListener("click", () => {
                alert(`The video length is ${vidLength}`);
                let inputStart = prompt("Enter loop start time: (00:00)") || "00:00";
                let inputEnd = prompt("Enter loop end time: (00:00)") || vidLength;
                if (inputEnd != inputStart) {
                    if (loopInterval) {
                        clearInterval(loopInterval);
                    }
                    loopVideo(inputEnd, inputStart);
                }
            });
            // after button has been clicked and loop selection has been created, start loop function
            // setInterval(checkTime, 500);

            container.appendChild(button);
        })
        .catch((error) => {
            console.error("Error occured:", error.message);
            vidLength = "invalid";
        });
}

// function to convert given time to seconds
    // include hour long videos
function timeToSeconds(timeStr) {
    if (timeStr.split(":").length === 2) {
        const [minutes, seconds] = timeStr.split(":").map(Number);
        return minutes * 60 + seconds;
    } else {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }
}

// function to conver from seconds to minutes

// button/function that allows client to select ending time for repeat loop / pause
// must be less than length of video

// function to check current time and compare with target time
function loopVideo(targetTime = vidLength, startTime = "0:00") {
    const videoElement = document.querySelector('video');
    const timeElement = document.querySelector('.ytp-time-current');

    // const currentSeconds = timeToSeconds(timeElement.textContent.trim());
    const targetSeconds = timeToSeconds(targetTime);
    const startSeconds = timeToSeconds(startTime);
    const lengthSeconds = timeToSeconds(vidLength);

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
    loopInterval = setInterval(() => {
        let currentSeconds = videoElement.currentTime;
        if (currentSeconds >= targetSeconds) {
            videoElement.currentTime = startSeconds;
            console.log(`video reset at ${startSeconds}`);
        }
        if (!document.querySelector('video')) {
            clearInterval(loopInterval);
        }
    }, 500);
}

// grab current time, and check if it has passed client given time to determine if video should be restarted
// should stop checking if not on a video
    // <span class="ytp-time-current">0:11</span>

// function to clear loop

window.addEventListener("load", () => {
    console.log("function initiated", window.location.href);
    setupLoop();
    setInterval(monitorPage, 1000);
});