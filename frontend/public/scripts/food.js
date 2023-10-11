// JavaScript code for the next and previous page buttons
const foodTableBody = document.getElementById("food-table-body");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");

const foodGridContainer = document.getElementById("food-grid-container");

const foods = [
  {
    name: "หมูทอดกระเทียม",
    calories: 200,
    image: "./assets/img/food/01_หมูทอดกระเทียม.jpg",
    carbonhydrate: 1,
    protein: 23,
    fat: 7.1,
  },
  {
    name: "ข้าวมันไก่",
    calories: 515,
    image: "./assets/img/food/02_ข้าวมันไก่.jpg",
    carbonhydrate: 89.1,
    protein: 27.5,
    fat: 32,
  },
  {
    name: "ข้าวหมูแดง",
    calories: 438,
    image: "./assets/img/food/03_ข้าวหมูแดง.jpg",
    carbonhydrate: 105.6,
    protein: 28.6,
    fat: 9.8,
  },
  {
    name: "ข้าวผัดกระเพราไก่",
    calories: 554,
    image: "./assets/img/food/04_ข้าวผัดกระเพราไก่.jpg",
    carbonhydrate: 43.9,
    protein: 37.7,
    fat: 8.5,
  },
  {
    name: "ผัดผักบุ้ง",
    calories: 210,
    image: "./assets/img/food/05_ผัดผักบุ้ง.jpg",
    carbonhydrate: 5,
    protein: 3.7,
    fat: 8.5,
  },
  {
    name: "แกงจืดเต้าหู้หมูสับ",
    calories: 110,
    image: "./assets/img/food/06_แกงจืดเต้าหู้หมูสับ.jpg",
    carbonhydrate: 5,
    protein: 43.8,
    fat: 4.6,
  },
  {
    name: "ผัดไท",
    calories: 303,
    image: "./assets/img/food/07_ผัดไท.jpg",
    carbonhydrate: 5,
    protein: 3.7,
    fat: 8.5,
  },
  {
    name: "เต้าหู้ทรงเครื่อง",
    calories: 164,
    image: "./assets/img/food/08_เต้าหู้ทรงเครื่อง.jpg",
    carbonhydrate: 5,
    protein: 37.6,
    fat: 7.3,
  },
  {
    name: "ต้มยำกุ้ง",
    calories: 65,
    image: "./assets/img/food/09_ต้มยำกุ้ง.jpg",
    carbonhydrate: 5,
    protein: 20,
    fat: 8.5,
  },
  {
    name: "ไข่พะโล้",
    calories: 460,
    image: "./assets/img/food/10_ไข่พะโล้.jpg",
    carbonhydrate: 10,
    protein: 30,
    fat: 15,
  },
  {
    name: "ต้มยำปลากรอบ",
    calories: 152,
    image: "./assets/img/food/11_ต้มยำปลากรอบ.jpg",
    carbonhydrate: 6,
    protein: 23,
    fat: 4,
  },
  {
    name: "แกงจืดรวมมิตรทะเล",
    calories: 185,
    image: "./assets/img/food/12_แกงจืดรวมมิตรทะเล.jpg",
    carbonhydrate: 10,
    protein: 22,
    fat: 6,
  },
  {
    name: "ข้าวต้มปลา",
    calories: 220,
    image: "./assets/img/food/13_ข้าวต้มปลา.jpg",
    carbonhydrate: 30,
    protein: 21,
    fat: 2,
  },
  {
    name: "ยำปลาดุกฟู",
    calories: 323,
    image: "./assets/img/food/14_ยำปลาดุกฟู.jpg",
    carbonhydrate: 0,
    protein: 11,
    fat: 31,
  },
  {
    name: "ทอดมันปลา",
    calories: 220,
    image: "./assets/img/food/15_ทอดมันปลา.jpg",
    carbonhydrate: 5,
    protein: 14,
    fat: 7,
  },
  {
    name: "น้ำพริกอ่อง",
    calories: 520,
    image: "./assets/img/food/16_น้ำพริกอ่อง.jpg",
    carbonhydrate: 58,
    protein: 50.4,
    fat: 9.1,
  },
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
              <div class="food-block-img">
                <img class="food-image" src="${food.image}" alt="${food.name}">
              </div>
              <div class="food-block-text">
                <p class="food-block-name">${food.name}</p>
                <p>${food.calories} Calories</p>
              </div>
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


  document.getElementsByClassName("close")[0].addEventListener("click", () => {
    console.log("hello");
    document.getElementById("food-details-modal").classList.remove("show");
  });


  document.getElementById("food-details-modal").addEventListener("click", (event) => {
      if (event.target === document.getElementById("food-details-modal")) {
        document.getElementById("food-details-modal").classList.remove("show");
      }
    });
}

// prevPageBtn.addEventListener("click", () => {
//   currentPage--;
//   updateTable();
// });

// nextPageBtn.addEventListener("click", () => {
//   currentPage++;
//   updateTable();
// });

// Add click event listener to close button in food details modal
// document.getElementsByClassName("close")[0].addEventListener("click", () => {
//   document.getElementById("food-details-modal").style.display = "none";
// });

// updateTable();


// Function to create a new food grid item
function createFoodGridItem(food) {
  const foodGridItem = document.createElement("div");
  
  foodGridItem.classList.add("food-grid-item");

  const foodImage = document.createElement("img");
  foodImage.classList.add("food-image");
  foodImage.src = food.image;
  foodImage.alt = food.name;
  foodGridItem.appendChild(foodImage);

  const foodtext = document.createElement("div");
  foodtext.classList.add("food-text");
  foodGridItem.appendChild(foodtext);

  const foodName = document.createElement("h3");
  foodName.textContent = food.name;
  foodtext.appendChild(foodName);

  const foodCalories = document.createElement("p");
  foodCalories.textContent = `Calories: ${food.calories}`;
  foodtext.appendChild(foodCalories);

  const foodProtein = document.createElement("p");
  foodProtein.textContent = `Protein: ${food.protein} g`;
  foodtext.appendChild(foodProtein);

  const foodCarbs = document.createElement("p");
  foodCarbs.textContent = `Carbs: ${food.carbonhydrate} g`;
  foodtext.appendChild(foodCarbs);

  const foodFat = document.createElement("p");
  foodFat.textContent = `Fat: ${food.fat} g`;
  foodtext.appendChild(foodFat);

  return foodGridItem;
}

// Function to populate the food grid container with food items
function populateFoodGrid(foodData, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const foodsToShow = foodData.slice(startIndex, endIndex);

  foodGridContainer.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const foodGridItem = createFoodGridItem(foodsToShow[i]);
    foodGridContainer.appendChild(foodGridItem);
  }
}

// Function to handle the click event of the previous page button
function handlePrevPageClick() {
  if (currentPage > 1) {
    currentPage--;
    populateFoodGrid(foods, currentPage);
  }
}

// Function to handle the click event of the next page button
function handleNextPageClick() {
  const totalPages = Math.ceil(foods.length / itemsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    populateFoodGrid(foods, currentPage);
  }
}

// Add event listeners to the previous and next page buttons
prevPageBtn.addEventListener("click", handlePrevPageClick);
nextPageBtn.addEventListener("click", handleNextPageClick);

// Populate the food grid container with the first page of food items
populateFoodGrid(foods, currentPage);