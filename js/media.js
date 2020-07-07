video = document.getElementById("video");
mute = document.getElementById("controlmute");
recording = document.getElementById("recording");
pause = document.getElementById("pause");
resume = document.getElementById("resume");
stop = document.getElementById("stop");
audiodownload = document.getElementById("download")
camera = document.getElementById("camera")


var mediastrem;
var audio_track;
var chunk = [];
var recorders;
var blob;
var video_track;
async function _init_() {
    contmute();
    await startcall();
}

async function contmute() {
    mute.addEventListener("click", () => {
        if (!audio_track) return;
        if (audio_track.enabled == false) {
            audio_track.enabled = true;
            mute.innerText = "mute"
        }
        else {
            audio_track.enabled = false;
            mute.innerText = "Unmute"
        }
        console.log(audio_track)

    }
    )
    recording.addEventListener("click", () => {
        mediarecorders(mediastrem)
        recorders.start(1000);
        console.log('onstart')
        pause.style.display = "block";
        stop.style.display = "block";
        resume.style.display = "none";
        recording.style.display = "none";
        audiodownload.style.display = "none";
    });
    pause.addEventListener("click", () => {
        recorders.pause()
        console.log("onpause")
        pause.style.display = "none";
        stop.style.display = "block";
        resume.style.display = "block";
        recording.style.display = "none";
        audiodownload.style.display = "none";

    });
    resume.addEventListener("click", () => {
        recorders.resume();
        console.log("onresume");
        pause.style.display = "block";
        stop.style.display = "block";
        resume.style.display = "none";
        recording.style.display = "none";
        audiodownload.style.display = "none";

    })
    stop.addEventListener("click", () => {
        recorders.stop();
        console.log("all recording is done");
        pause.style.display = "none";
        stop.style.display = "none";
        resume.style.display = "none";
        recording.style.display = "block";
        audiodownload.style.display = "block";

        blob = new Blob(chunk, { type: 'audio/webm ' })
        let url = window.URL.createObjectURL(blob)
        audiodownload.href = url;
        audiodownload.download = "test.weba"


    })

    async function mediarecorders(stream) {
        chunk = [];
        recorders = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        recorders.ondataavailable = (e) => {
            console.log(e.data.size);
            if (e.data.size > 0) {
                chunk.push(e.data);
                console.log(e.data);
            }
        }


    }
    camera.addEventListener("click", async () => {
        if (video_track) {
            video_track.stop();
            video_track = null;
            video.srcObject = null;
            camera.innerText = "start camera";

        }
        try {

            var startcamera = await navigator.mediaDevices.getUserMedia({ video: true })
            if (startcamera.getVideoTracks().length > 0) {
                video_track = startcamera.getVideoTracks()[0];
                video.srcObject = video_track;
                camera.innerText = "stop camera";
            }
        }
        catch (e) {
            console.log(e);
            return;
        }
    })
}




async function startcall() {
    try {
        mediastrem = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }
    catch (e) {
        console.log(e);
    }
    audio_track = mediastrem.getAudioTracks()[0];
    audio_track.onmute = function (e) {
        console.log(e);
    }
    audio_track.onunmute = function (e) {
        console.log(e)
    }
}



_init_()