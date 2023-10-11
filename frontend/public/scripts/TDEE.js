//Global var
exerciseOptions = [];
calories = [];
total = 0;
var theasold;
var weight = 0;
var caloriesDificitTotal = 0;
var TDEE = 0;
var bodyFatPercentage;

function calculateTDEE() {
  weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseFloat(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  bodyFatPercentage = parseFloat(
    document.getElementById("bodyFatPercentage").value
  );
  const activityLevel = parseFloat(
    document.getElementById("activityLevel").value
  );

  if (bodyFatPercentage) {
    // Using Katch-McArdle formula
    const LBM = weight * (1 - bodyFatPercentage / 100);
    TDEE = 370 + 21.6 * LBM * activityLevel;
  } else {
    // Using Mifflin-St Jeor formula
    if (gender === "male") {
      TDEE = (10 * weight + 6.25 * height - 5 * age + 5) * activityLevel;
    } else if (gender === "female") {
      TDEE = (10 * weight + 6.25 * height - 5 * age - 161) * activityLevel;
    }

    bodyFatPercentage = weight / (height / 100) ** 2;

    // I want to show Calories per Day and peer week after calculate TDEE
  }

  const resultCaloriePerDay = document.getElementById("resultCaloriePerDay");
  const resultCaloriePerWeek = document.getElementById("resultCaloriePerWeek");

  resultCaloriePerDay.innerHTML = `${TDEE.toFixed(2)} `;
  resultCaloriePerWeek.innerHTML = `${(TDEE*7).toFixed(2)} `;

  const startWeight = document.getElementById("startWeight");
  startWeight.innerHTML = `Start weight: ${weight.toFixed(2)} kg`;

  const weightChange = document.getElementById("weightChange");
  weightChange.innerHTML = `Weight change: 0 kg`;

  const currentWeight = document.getElementById("currentWeight");
  currentWeight.innerHTML = `Current weight: ${weight.toFixed(2)} kg`;

  document.getElementById("caloriePerDay").style.visibility = "visible";
  document.getElementById("caloriePerWeek").style.visibility = "visible";

  updatePhoto(bodyFatPercentage);

  document.getElementById("TDEE-wait-input").style.display = "none";
}

function updatePhoto(bodyFatPercentage) {
  // change photo based on body fat percentage of man and women by arrray of them and selected by form
  const photoElement = document.getElementById("userImage");
  const gender = document.getElementById("gender").value;

  if (gender == "male") {
    if (bodyFatPercentage > 35) photoElement.src = "/frontend/public/assets/img/man/35-man.jpg";
    else if (bodyFatPercentage > 30)
      photoElement.src = "/frontend/public/assets/img/man/30-man.jpg";
    else if (bodyFatPercentage > 25)
      photoElement.src = "/frontend/public/assets/img/man/25-man.jpg";
    else if (bodyFatPercentage > 20)
      photoElement.src = "/frontend/public/assets/img/man/20-man.jpg";
    else if (bodyFatPercentage > 15)
      photoElement.src = "/frontend/public/assets/img/man/15-man.jpg";
    else if (bodyFatPercentage > 12)
      photoElement.src = "/frontend/public/assets/img/man/12-man.jpg";
    else photoElement.src = "/frontend/public/assets/img/man/8-man.jpg";
  } else {
    if (bodyFatPercentage > 45)
      photoElement.src = "/frontend/public/assets/img/woman/45-man.jpg";
    else if (bodyFatPercentage > 40)
      photoElement.src = "/frontend/public/assets/img/man/40-man.jpg";
    else if (bodyFatPercentage > 35)
      photoElement.src = "/frontend/public/assets/img/man/35-man.jpg";
    else if (bodyFatPercentage > 30)
      photoElement.src = "/frontend/public/assets/img/man/30-man.jpg";
    else if (bodyFatPercentage > 25)
      photoElement.src = "/assets/img/man/25-man.jpg";
    else if (bodyFatPercentage > 20)
      photoElement.src = "/frontend/public/assets/img/man/20-man.jpg";
    else photoElement.src = "/frontend/public/assets/img/man/15-man.jpg";
  }
}

function updateWeight(weightChangeKg) {
  // This is where you would implement the logic to update the user's weight, photo, and details based on the weight change
  // For simplicity, let's just display a message
  const weightChangeElement = document.getElementById("weightChange");
  if (weightChangeKg > 0) {
    weightChangeElement.innerHTML = `You gained ${weightChangeKg.toFixed(
      2
    )} kg.`;
  } else if (weightChangeKg < 0) {
    weightChangeElement.innerHTML = `You lost ${Math.abs(
      weightChangeKg
    ).toFixed(2)} kg.`;
  } else {
    weightChangeElement.innerHTML = `Your weight remained unchanged.`;
  }

  const currentWeightElement = document.getElementById("currentWeight");
  currentWeightElement.innerHTML = `Current weight: ${(weight + weightChangeKg).toFixed(2)} kg`;
}

function calculateWeightChangeAndSimulate() {
  let weeklyCalories = 0;

  weeklyCalories = parseFloat(
    document.getElementById("weeklyCalories").value
  );
  caloriesDificitTotal += weeklyCalories - TDEE * 7;

  const weightChangeKg = caloriesDificitTotal / 7700;
  // weight += weightChangeKg;

  updateWeight(weightChangeKg);
  updatePhoto(bodyFatPercentage + weightChangeKg / 2);
  addHistoryConsumed(weeklyCalories, weightChangeKg);
}

// Adding History consuming after click calories consumed button
function addHistoryConsumed(calorie, weightChangeKg) {
  const tableBody = document.getElementById("historyConsumedTableBody");
  const newRow = document.createElement("tr");

  const weekCell = document.createElement("td");
  const calorieCell = document.createElement("td");
  const weightCell = document.createElement("td");
  
  weekCell.textContent = "Week " + (tableBody.childElementCount + 1);
  calorieCell.textContent = calorie;
  weightCell.textContent = (weight + weightChangeKg).toFixed(2);

  newRow.appendChild(weekCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(weightCell);

  tableBody.appendChild(newRow);
}