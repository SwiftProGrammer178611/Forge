import Kanban from "./api/view/Kanban.js";

new Kanban(
    document.querySelector(".kanban")
);

(function() {
    const fehBody = document.body;
    const workDurationInput = document.getElementById('work-duration');
    const restDurationInput = document.getElementById('rest-duration');
    const timerTime = document.getElementById('feh-timer-time');
    const circleProgress = document.getElementById('circle-progress');
    let workDuration = parseInt(workDurationInput.value) * 60;
    let restDuration = parseInt(restDurationInput.value) * 60;
    let remainingTime = workDuration;
    let isPaused = true;
    let isWorking = true;
    let intervalId;

    window.addEventListener('load', () => {
        fehBody.classList.add('page-loaded');
    });

    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        isPaused = false;

        fehBody.classList.add('timer-running');

        if(isWorking){
            fehBody.classList.remove('timer-paused');
        }
        else{
            fehBody.classList.add('timer-paused');
            fehBody.classList.remove('timer-paused');
        }

        if(!intervalId){
            intervalId = setInterval(updateTimer, 1000);
        }
    });

    function updateTimer() {
        if(!isPaused){
            remainingTime--;

            if(remainingTime<=0){
                isWorking = !isWorking;
                remainingTime = isWorking ? workDuration:restDuration;
                
                if(!isWorking){
                    fehBody.classList.add('rest-mode');
                    fehBody.classList.remove('timer-running');
                }
                else{
                    fehBody.classList.remove('rest-mode');
                    fehBody.classList.remove("timer-running")
                }

                isPaused=false;
                fehBody.classList.remove('timer-work-active');
            }

            updateProgress();
        }
    }

    function updateProgress() {
        const radius = 45;
        const circum =  2*Math.PI*radius;

        console.log(circumference);

        const totalDuration = isWorking ? workDuration : restDuration;
        const dashOffset = circumference * remainingTime / totalDuration;
        
        circleProgress.style.strokeDashoffset = dashOffset;
        timerTime.textContent = formatTime(remainingTime);
    }
    function formatTime(seconds){
        const minutes = Math.floor(seconds /60);
        const remainingSeconds = seconds & 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    updateProgress();
});