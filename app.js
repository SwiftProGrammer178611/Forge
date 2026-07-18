const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");

//the || is a safeguard so we can still add habits even after localStorage is cleared
//Just in case
const habits = JSON.parse(localStorage.getItem("habits")) || [];

function addHabit(e) {
    e.preventDefault();
    const text = this.querySelector('[name="habit"]').value;
    console.log(text);
    const habit = {
        text: text,
        streak: 0,
        lastDate: "",
    }
    habits.push(habit);
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
    this.reset();
    console.log(habit);
}

const colorOps = ["bg-amber-300", "bg-pink-300", "bg-green-300", "bg-blue-300", "bg-indigo-300"];

function listHabits() {
    habitsList.innerHTML = habits.map((habit, i) => {
        return `
            <li class="${colorOps[i % colorOps.length]} rounded shadow p-4">
                <p class="font-bold mb-2 text-mist-800">${habit.text}</p>
                <p class="mb-2 text-mist-800">🔥 Streak: ${habit.streak}</p>
                <button class="streak-btn bg-green-900 text-white px-2 py-1 rounded mr-2" data-index="${i}">+1 Today</button>
                <button class="delete bg-red-500 text-white px-2 py-1 rounded" data-index="${i}">Delete</button>
            </li>
                `
    }).join("");
}

function checkStreak(e){
    if(!e.target.matches(".streak-btn")) return;
    const index = e.target.dataset.index;
    const habit = habits[index];

    const today = new Date().toDateString();
    //if checked -> then nothing
    if(habit.lastDate === today) return;

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    yesterday = yesterday.toDateString();

    if(habit.lastDate === yesterday){
        habit.streak = habit.streak+1;
    }else{
        habit.streak = 1;
    }

    habit.lastDate = today;

    listHabits();
    localStorage.setItem("habits", JSON.stringify(habits));
}
function deleteHabit(e) {
    if(!e.target.matches(".delete")) return;
    const el = e.target;
    const index = el.dataset.index;
    habits.splice(index, 1);
    listHabits(habits, habitsList);
    localStorage.setItem("habits", JSON.stringify(habits));
}
addHabits.addEventListener("submit", addHabit);
habitsList.addEventListener("click", checkStreak);
habitsList.addEventListener("click", deleteHabit);

listHabits(habits, habitsList);