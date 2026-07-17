
(function() {
    const fehBody = document.body;
    const workDurationInput = document.getElementById('work-duration');
    const restDurationInput = document.getElementById('rest-duration');
    const timerTime = document.getElementById('feh-timer-time');
    const circleProgress = document.querySelector('.circle-progress');
    let workDuration = parseInt(workDurationInput.value) * 60;
    let restDuration = parseInt(restDurationInput.value) * 60;
    let remainingTime = workDuration;
    let isPaused = true;
    let isWorking = true;
    let intervalId;
    const completedSessiosEl = document.getElementById('feh-completed-sessions');
    let completedSessions = 0;

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

    const pauseBtn = document.getElementById('pause-btn');
    pauseBtn.addEventListener('click', () => {
        isPaused = true;

        fehBody.classList.remove('timer-running');
        fehBody.classList.add('timer-paused');
    });

    const btnToggleSettings = document.getElementById('feh-toggle-settings');
    const btnCloseSettings = document.getElementById('feh-close-settings');

    function setBodySettings() {
        fehBody.classList.contains('settings-active') ? fehBody.classList.remove('settings-active') : fehBody.classList.add('settings-active');
    }

    function toggleSettings() {
        if(event.type === 'click'){
            setBodySettings();
        } else if(event.type === 'keydown' && event.keyCode === 27){
            fehBody.classList.remove('settings-active');
        }
    }

    btnToggleSettings.addEventListener('click', toggleSettings);
    btnCloseSettings.addEventListener('click', toggleSettings);
    document.addEventListener('keydown', toggleSettings);

    workDurationInput.addEventListener('change', ()=>{
        workDuration = parseInt(workDurationInput.value) * 60;
        if(isWorking) {
            remainingTime = workDuration;
            updateProgress();
        }
    });
    restDurationInput.addEventListener('change',()=>{
        restDuration = parseInt(restDurationInput.value) * 60;
        if(isWorking){
            remainingTime = workDuration;
            updateProgress();
        }
    })

    function updateTimer() {

        let playAlarm;
        const workFinished = new Audio("/music/success-fanfare-trumpets-6185.mp3");
        const restFinished = new Audio("/music/error-when-entering-the-game-menu-132111.mp3"); 

        if(!isPaused){
            remainingTime--;

            if(remainingTime<=0){
                isWorking = !isWorking;
                remainingTime = isWorking ? workDuration:restDuration;
                
                if(!isWorking){
                    fehBody.classList.add('rest-mode');
                    fehBody.classList.remove('timer-running');
                    completedSessions++;
                    completedSessiosEl.textContent = completedSessions
                }
                else{
                    fehBody.classList.remove('rest-mode');
                    fehBody.classList.remove("timer-running")
                }

                playAlarm = isWorking ? restFinished : workFinished;
                playAlarm.play();

                isPaused=false;
                fehBody.classList.remove('timer-work-active');
            }
            document.title = timerTime.textContent = formatTime(remainingTime);

            updateProgress();
        }
    }

    function updateProgress() {
        const radius = 45;
        const circum =  2*Math.PI*radius;

        console.log(circum);

        const totalDuration = isWorking ? workDuration : restDuration;
        const dashOffset = circum * remainingTime / totalDuration;
        
        circleProgress.style.strokeDashoffset = dashOffset;
        timerTime.textContent = formatTime(remainingTime);
    }
    function formatTime(seconds){
        const minutes = Math.floor(seconds /60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    updateProgress();
})();