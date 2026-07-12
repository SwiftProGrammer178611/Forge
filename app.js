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
    listHabits(habits, habitsList);
    this.reset();
    console.log(habit);
}

function listHabits(){
    habitsList.innerHTML = habits.map((habit,i) => {
        return `
            <li>
                <input type="checkbox" data-index="${i}" id="habit${i}" ${habit.completed ? "checked" : ""} />  
                <label for="habit${i}"><span>${habit.reps}/${habit.totalCounts} ${habit.timeframe}<span>${habit.text}</span></label>
            </li>
        `
    }).join("");
}

function toggleComplete(e) {
    console.log(e.target)

    if(!e.target.matches("input")) return;
    const el = e.target;
    const index = e.target;
    const index = el.dataset.index;
    habits[index].reps += 1;
    if(habits[index].reps === habits[index].totalCounts) {
        habits[index].completed = true;
    } else if(habits[index].reps > habits[index].totalCounts){
        habits[index].reps=0;
        habits[index].completed = false;
    }
}



addHabits.addEventListener("submit", addHabit);
habitsList.addEventListener("click", toggleCompleted);

listHabits(habits, habitsList());