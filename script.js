exerciseOptions = [];
calories = [];
total = 0;
var weight = 72;
var theasold;
/*
    1. 59 kg
    2. 70 kg
    3. 81 kg
    4. 92 kg
*/
if (weight <= 59) {
    theasold = 1;
} else if (weight > 59 && weight <= 65) {
    theasold = 1;
} else if (weight > 65 && weight <= 75) {
    theasold = 2;
} else if (weight > 75 && weight <= 85) {
    theasold = 3;
} else if (weight > 85 && weight <= 92) {
    theasold = 4;
}else if(weight > 92){
    theasold = 4;
}

async function loadNames() {
    const response = await fetch('/assets/calories burned.json');
    const names = await response.json();
    const exerciseInput = document.getElementById("exercise-input");
    var activity = names['exercise 1 hour'];

    for(const x in activity){
        exerciseOptions.push(activity[x]['exercise']);
        calories.push(activity[x]['calories']);
    }

    exerciseOptions.forEach((exercise) => {
        const option = document.createElement("option");
        option.text = exercise;
        option.value = exercise; 
        exerciseInput.appendChild(option);
    });

    var totalrow = document.getElementById('total-output');
    totalrow.innerText = "Total Calories: " + total;

}

loadNames();

function addExercise() {
    var input1 = document.getElementById('exercise-input');
    var exercise = input1.value;
    var input2 = document.getElementById('duration-input');
    var duration = input2.value.trim();
    var input3 = document.getElementById('day-selector');
    var day = input3.value;

    if (exercise !== '' && duration !== '' && day != '') {
        var tableBody = document.getElementById('exercise-table-body');
        var newRow = document.createElement('tr');

        var Cell1 = document.createElement('td');
        Cell1.textContent = exercise;
        var Cell2 = document.createElement('td');
        Cell2.textContent = duration;
        var Cell3 = document.createElement('td');
        Cell3.textContent = day;

        var sum;
        for(const i in exerciseOptions){
            if(exercise == exerciseOptions[i]){
                cal = calories[i][theasold-1];
                sum = ((parseInt(cal) * parseInt(duration))/60) *parseInt(day);
                sum = Math.round(sum);
                total = total + sum;
            }
        }

        var Cell4 = document.createElement('td');
        Cell4.textContent = sum;

        var noteCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteRow(this);
        };

        noteCell.appendChild(deleteButton);
        newRow.appendChild(Cell1);
        newRow.appendChild(Cell2);
        newRow.appendChild(Cell3);
        newRow.appendChild(Cell4);
        newRow.appendChild(noteCell);
        tableBody.appendChild(newRow);

        input1.value = '';
        input2.value = '';
        input3.value = '';

        var totalrow = document.getElementById('total-output');
        totalrow.innerText = "Total Calories: " + total;

    }
}

function deleteRow(button) {
    var row = button.parentElement.parentElement;
    var rd = row.getElementsByTagName("td");
    var caldel = rd[3].innerText;

    total = total - parseInt(caldel);
    var totalrow = document.getElementById('total-output');
    totalrow.innerText = "Total Calories: " + total;

    row.remove();
}