var caloriesDificitTotal = 0;
var TDEE = 0;
var bodyFatPercentage;

function calculateTDEE() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    bodyFatPercentage = parseFloat(document.getElementById('bodyFatPercentage').value);
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);

    if (bodyFatPercentage) {
        // Using Katch-McArdle formula
        const LBM = weight * (1 - bodyFatPercentage / 100);
        TDEE = 370 + (21.6 * LBM) * activityLevel;
    } else {
        // Using Mifflin-St Jeor formula
        if (gender === 'male') {
            TDEE = (10 * weight + 6.25 * height - 5 * age + 5) * activityLevel;
        } else if (gender === 'female') {
            TDEE = (10 * weight + 6.25 * height - 5 * age - 161) * activityLevel;
        }

        bodyFatPercentage = weight / ((height/100)**2);

    }

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `TDEE: ${TDEE.toFixed(2)} calories per day\n Your weight: ${weight}`;
    updatePhoto(bodyFatPercentage);
}

function toggleInputMethod() {
    const inputMethod = document.getElementById('inputMethod').value;
    const caloriesPerWeekInput = document.getElementById('caloriesPerWeekInput');
    const selectFoodsInput = document.getElementById('selectFoodsInput');

    if (inputMethod === 'caloriesPerWeek') {
        caloriesPerWeekInput.style.display = 'block';
        selectFoodsInput.style.display = 'none';
    } else if (inputMethod === 'selectFoods') {
        caloriesPerWeekInput.style.display = 'none';
        selectFoodsInput.style.display = 'block';
    }
}

function updateWeight(weightChangeKg) {
    // This is where you would implement the logic to update the user's weight, photo, and details based on the weight change
    // For simplicity, let's just display a message
    const weightChangeInfoElement = document.getElementById('weightChangeInfo');
    if (weightChangeKg > 0) {
        weightChangeInfoElement.innerHTML = `You gained ${weightChangeKg.toFixed(2)} kg.`;
    } else if (weightChangeKg < 0) {
        weightChangeInfoElement.innerHTML = `You lost ${Math.abs(weightChangeKg).toFixed(2)} kg.`;
    } else {
        weightChangeInfoElement.innerHTML = `Your weight remained unchanged.`;
    }

}

function updatePhoto(bodyFatPercentage) {
  // change photo based on body fat percentage of man and women by arrray of them and selected by form
  const photoElement = document.getElementById("userImage");
  const gender = document.getElementById("gender").value;

  if (gender == "male") {
    if (bodyFatPercentage > 35) photoElement.src = "/assets/img/man/35-man.jpg";
    else if (bodyFatPercentage > 30)
      photoElement.src = "/assets/img/man/30-man.jpg";
    else if (bodyFatPercentage > 25)
      photoElement.src = "/assets/img/man/25-man.jpg";
    else if (bodyFatPercentage > 20)
      photoElement.src = "/assets/img/man/20-man.jpg";
    else if (bodyFatPercentage > 15)
      photoElement.src = "/assets/img/man/15-man.jpg";
    else if (bodyFatPercentage > 12)
      photoElement.src = "/assets/img/man/12-man.jpg";
    else photoElement.src = "/assets/img/man/8-man.jpg";
  } else {
    if (bodyFatPercentage > 45)
      photoElement.src = "/assets/img/woman/45-man.jpg";
    else if (bodyFatPercentage > 40)
      photoElement.src = "/assets/img/man/40-man.jpg";
    else if (bodyFatPercentage > 35)
      photoElement.src = "/assets/img/man/35-man.jpg";
    else if (bodyFatPercentage > 30)
      photoElement.src = "/assets/img/man/30-man.jpg";
    else if (bodyFatPercentage > 25)
      photoElement.src = "/assets/img/man/25-man.jpg";
    else if (bodyFatPercentage > 20)
      photoElement.src = "/assets/img/man/20-man.jpg";
    else photoElement.src = "/assets/img/man/15-man.jpg";
  }
}

function calculateWeightChangeAndSimulate() {
    const inputMethod = document.getElementById('inputMethod').value;
    let weeklyCalories = 0;

    if (inputMethod === 'caloriesPerWeek') {
        weeklyCalories = parseFloat(document.getElementById('weeklyCalories').value);
        caloriesDificitTotal += weeklyCalories - TDEE * 7
    } else if (inputMethod === 'selectFoods') {
        // Parse and calculate calories from selected foods
        const selectedFoods = document.getElementById('selectedFoods').value;
        const foodsArray = selectedFoods.split('\n');
        for (const food of foodsArray) {
            const [foodName, foodCalories] = food.split(',');
            if (!isNaN(foodCalories)) {
                weeklyCalories += parseFloat(foodCalories);
            }
        }
    }

    const weightChangeKg = caloriesDificitTotal / 7700;
    updateWeight(weightChangeKg);
    updatePhoto(bodyFatPercentage + weightChangeKg / 2);
}

