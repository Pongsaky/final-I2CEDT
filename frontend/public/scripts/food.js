// JavaScript code for the next and previous page buttons
const foodTableBody = document.getElementById("food-table-body");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");

const foods = [
  { name: "Apple", calories: 95, image: "https://via.placeholder.com/150" },
  { name: "Banana", calories: 105, image: "https://via.placeholder.com/150" },
  { name: "Carrot", calories: 25, image: "https://via.placeholder.com/150" },
  { name: "Orange", calories: 62, image: "https://via.placeholder.com/150" },
  { name: "Grapes", calories: 52, image: "https://via.placeholder.com/150" },
  { name: "Broccoli", calories: 55, image: "https://via.placeholder.com/150" },
  { name: "Potato", calories: 130, image: "https://via.placeholder.com/150" },
  { name: "Tomato", calories: 22, image: "https://via.placeholder.com/150" },
  { name: "Spinach", calories: 23, image: "https://via.placeholder.com/150" },
  { name: "Chicken", calories: 335, image: "https://via.placeholder.com/150" },
  { name: "Beef", calories: 250, image: "https://via.placeholder.com/150" },
  { name: "Salmon", calories: 206, image: "https://via.placeholder.com/150" },
  { name: "Tuna", calories: 184, image: "https://via.placeholder.com/150" },
  { name: "Egg", calories: 78, image: "https://via.placeholder.com/150" },
  { name: "Cheese", calories: 113, image: "https://via.placeholder.com/150" },
  { name: "Yogurt", calories: 150, image: "https://via.placeholder.com/150" },
];

const itemsPerPage = 8;
let currentPage = 1;

function updateTable() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const foodsToShow = foods.slice(startIndex, endIndex);

  let tableHtml = "";
  for (let i = 0; i < foodsToShow.length; i += 4) {
    tableHtml += `<tr>`;
    for (let j = 0; j < 4; j++) {
      const foodIndex = i + j;
      if (foodIndex < foodsToShow.length) {
        const food = foodsToShow[foodIndex];
        tableHtml += `
          <td class="food-block-td">
            <div class="food-block-div">
              <img class="food-image" src="${food.image}" alt="${food.name}">
              <p class="food-block-name">${food.name}</p>
            </div>
          </td>
        `;
      } else {
        tableHtml += `<td class="food-block-td"></td>`;
      }
    }
    tableHtml += "</tr>";
  }
  foodTableBody.innerHTML = tableHtml;

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = endIndex >= foods.length;

  // Add click event listeners to food images
  const foodImages = document.getElementsByClassName("food-image");
  for (const foodImage of foodImages) {
    foodImage.addEventListener("click", () => {
      const foodName = foodImage.alt;
      const food = foods.find((f) => f.name === foodName);
      document.getElementById("food-details-name").textContent = food.name;
      document.getElementById("food-details-image").src = food.image;
      document.getElementById(
        "food-details-calories"
      ).textContent = `Calories: ${food.calories}`;
      document.getElementById("food-details-modal").classList.add("show");
    });
  }

  // Add click event listener to close button in food details modal
  document.getElementsByClassName("close")[0].addEventListener("click", () => {
    console.log("hello");
    document.getElementById("food-details-modal").classList.remove("show");
  });

  // Add click event listener to modal container
  document
    .getElementById("food-details-modal")
    .addEventListener("click", (event) => {
      if (event.target === document.getElementById("food-details-modal")) {
        document.getElementById("food-details-modal").classList.remove("show");
      }
    });
}

prevPageBtn.addEventListener("click", () => {
  currentPage--;
  updateTable();
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

// Add click event listener to close button in food details modal
document.getElementsByClassName("close")[0].addEventListener("click", () => {
  document.getElementById("food-details-modal").style.display = "none";
});

updateTable();
