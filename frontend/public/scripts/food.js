// JavaScript code for the next and previous page buttons
const foodTableBody = document.getElementById("food-table-body");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");

const foods = [
  {
    name: "หมูทอดกระเทียม",
    calories: 200,
    image: "../assets/img/food/01_หมูทอดกระเทียม.jpg",
  },
  {
    name: "ข้าวมันไก่",
    calories: 515,
    image: "../assets/img/food/02_ข้าวมันไก่.jpg",
  },
  {
    name: "ข้าวหมูแดง",
    calories: 438,
    image: "../assets/img/food/03_ข้าวหมูแดง.jpg",
  },
  {
    name: "ข้าวผัดกระเพราไก่",
    calories: 554,
    image: "../assets/img/food/04_ข้าวผัดกระเพราไก่.jpg",
  },
  {
    name: "ผัดผักบุ้ง",
    calories: 210,
    image: "../assets/img/food/05_ผัดผักบุ้ง.jpg",
  },
  {
    name: "แกงจืดเต้าหู้หมูสับ",
    calories: 110,
    image: "../assets/img/food/06_แกงจืดเต้าหู้หมูสับ.jpg",
  },
  { name: "ผัดไท", calories: 303, image: "../assets/img/food/07_ผัดไท.jpg" },
  {
    name: "เต้าหู้ทรงเครื่อง",
    calories: 164,
    image: "../assets/img/food/08_เต้าหู้ทรงเครื่อง.jpg",
  },
  {
    name: "ต้มยำกุ้ง",
    calories: 65,
    image: "../assets/img/food/09_ต้มยำกุ้ง.jpg",
  },
  {
    name: "ไข่พะโล้",
    calories: 460,
    image: "./assets/img/food/10_ไข่พะโล้.jpg",
  },
  {
    name: "ต้มยำปลากรอบ",
    calories: 152,
    image: "../assets/img/food/11_ต้มยำปลากรอบ.jpg",
  },
  {
    name: "แกงจืดรวมมิตรทะเล",
    calories: 185,
    image: "../assets/img/food/12_แกงจืดรวมมิตรทะเล.jpg",
  },
  {
    name: "ข้าวต้มปลา",
    calories: 220,
    image: "../assets/img/food/13_ข้าวต้มปลา.jpg",
  },
  {
    name: "ยำปลาดุกฟู",
    calories: 323,
    image: "../assets/img/food/14_ยำปลาดุกฟู.jpg",
  },
  {
    name: "ทอดมันปลา",
    calories: 220,
    image: "../assets/img/food/15_ทอดมันปลา.jpg",
  },
  {
    name: "น้ำพริกอ่อง",
    calories: 520,
    image: "../assets/img/food/16_น้ำพริกอ่อง.jpg",
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
    tableHtml += "<tr>";
    for (let j = 0; j < 4; j++) {
      const foodIndex = i + j;
      if (foodIndex < foodsToShow.length) {
        const food = foodsToShow[foodIndex];
        tableHtml += `
          <td>
            <img class="food-image" src="${food.image}" alt="${food.name}">
            <p>${food.name}</p>
          </td>
        `;
      } else {
        tableHtml += "<td></td>";
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
