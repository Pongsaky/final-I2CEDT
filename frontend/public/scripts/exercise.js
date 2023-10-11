//Auto Part
async function loadNames() {
  const response = await fetch("/frontend/public/assets/calories_burned.json");
  const names = await response.json();
  const exerciseInput = document.getElementById("exercise-input-value");
  var activity = names["exercise 1 hour"];

  for (const x in activity) {
    exerciseOptions.push(activity[x]["exercise"]);
    calories.push(activity[x]["calories"]);
  }

  exerciseOptions.forEach((exercise) => {
    const option = document.createElement("option");
    option.text = exercise;
    option.value = exercise;
    exerciseInput.appendChild(option);
  });

  var totalrow = document.getElementById("total-output");
  totalrow.innerText = "Total Calories: " + total;
}

loadNames();

function addExercise() {
  // /*
  //       1. 59 kg
  //       2. 70 kg
  //       3. 81 kg
  //       4. 92 kg
  //   */
  // if (weight <= 59) {
  //   theasold = 1;
  // } else if (weight > 59 && weight <= 65) {
  //   theasold = 1;
  // } else if (weight > 65 && weight <= 75) {
  //   theasold = 2;
  // } else if (weight > 75 && weight <= 85) {
  //   theasold = 3;
  // } else if (weight > 85 && weight <= 92) {
  //   theasold = 4;
  // } else if (weight > 92) {
  //   theasold = 4;
  // }

  var input1 = document.getElementById("exercise-input-value");
  var exercise = input1.value;
  var input2 = document.getElementById("duration-input-value");
  var duration = input2.value.trim();
  var output = document.getElementById("exercise-output");
  
  var sum;
  console.log(calories[1]);
  if (exercise !== "" && duration !== "") {
    for (const i in exerciseOptions) {
      if (exercise == exerciseOptions[i]) {
        cal = calories[i];
        sum = ((parseInt(cal) * parseInt(duration)) / 60);
        sum = Math.round(sum);
      }
    }
    output.innerText = "Calories Burned:  " + sum;


    var noteCell = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteRow(this);
    };

    // noteCell.appendChild(deleteButton);
    // newRow.appendChild(Cell1);
    // newRow.appendChild(Cell2);
    // newRow.appendChild(Cell3);
    // newRow.appendChild(Cell4);
    // newRow.appendChild(noteCell);
    // tableBody.appendChild(newRow);

    // input1.value = "";
    // input2.value = "";
    // input3.value = "";

    // var totalrow = document.getElementById("total-output");
    // totalrow.innerText = "Total Calories: " + total;
  }
}

function deleteRow(button) {
  var row = button.parentElement.parentElement;
  var rd = row.getElementsByTagName("td");
  var caldel = rd[3].innerText;

  total = total - parseInt(caldel);
  var totalrow = document.getElementById("total-output");
  totalrow.innerText = "Total Calories: " + total;

  row.remove();
}
//this is Auto part
