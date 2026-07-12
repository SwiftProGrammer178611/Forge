const addHabits = document.querySelector(".add-habit");
const habitsList = document.querySelector(".habits");
const habits = [];

function addHabit(e) {
    e.preventDefault();

    const text = this.querySelector('[name="habit"]').value;
    console.log(text);
    const totalCounts = this.querySelector('[name="reps"]').value;
    const timeframe = this.querySelector('[name="timeframe"]').value;
    const habit = {
        text: text,
        reps: 0,
        totalCounts: totalCounts,
        timeframe: timeframe,
        completed: false,
    };

    habits.push(habit);
    listHabits();
    this.reset();
}

function listHabits(){
    habitsList.innerHTML = habits.map((habit,i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="habit${i}" ${habit.completed ? "checked" : ""} />  
                <label for="habit${i}">${habit.reps}/${habit.totalCounts} ${habit.timeframe}<span>${habit.text}</span></label>
            </li>
        `
    }).join("");
}

addHabits.addEventListener("submit", addHabit);