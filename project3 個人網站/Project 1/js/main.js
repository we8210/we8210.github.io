// 獲取DOM元素
const storyForm = document.getElementById("storyForm");
const storyContainer = document.getElementById("storyContainer");

// 清空所有現有故事
localStorage.removeItem("stories");
let stories = [];

// 顯示所有故事
function displayStories() {
  storyContainer.innerHTML = "";
  stories.forEach((story) => {
    const storyCard = document.createElement("div");
    storyCard.className = "story-card";
    storyCard.innerHTML = `
            <div class="date">${new Date(story.date).toLocaleDateString(
              "zh-TW"
            )}</div>
            <div class="author">${escapeHtml(story.author)}</div>
            <div class="content">${escapeHtml(story.content)}</div>
        `;
    storyContainer.prepend(storyCard);
  });
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 故事提交處理
document.getElementById("storyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // 獲取表單數據
  const name = document.getElementById("name").value;
  const country = document.getElementById("country").value;
  const storyContent = document.getElementById("story").value;

  // 獲取當前時間
  const now = new Date();
  const dateTime = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  // 創建新的故事卡片
  const storyCard = document.createElement("div");
  storyCard.className = "story-card";
  storyCard.innerHTML = `
        <div class="story-header">
            <h4 class="author-name">${name}</h4>
            <span class="story-country">${country}</span>
        </div>
        <p class="story-content">${storyContent}</p>
        <div class="story-date">${dateTime}</div>
    `;

  // 將新故事添加到最前面
  const container = document.getElementById("storyContainer");
  container.insertBefore(storyCard, container.firstChild);

  // 重置表單
  this.reset();

  // 添加動畫效果
  storyCard.style.opacity = "0";
  storyCard.style.transform = "translateY(20px)";
  setTimeout(() => {
    storyCard.style.transition = "all 0.5s ease";
    storyCard.style.opacity = "1";
    storyCard.style.transform = "translateY(0)";
  }, 10);
});

// 初始顯示故事
displayStories();

// 導航欄滾動效果
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// 獲取國家名稱
function getCountryName(countryCode) {
  const countries = {
    vietnam: "越南",
    indonesia: "印尼",
    thailand: "泰國",
    philippines: "菲律賓",
    other: "其他",
  };
  return countries[countryCode] || "未知";
}

// 添加示例故事
const sampleStories = [
  {
    author: "阿美",
    country: "vietnam",
    story:
      "每次聞到茉莉花香，就想起家鄉的早晨。媽媽總是會在院子裡摘下新開的茉莉，放在餐桌上。那香氣，是我最懷念的味道。",
  },
  {
    author: "小玉",
    country: "indonesia",
    story:
      "檀香的味道讓我想起家鄉的寺廟。每個週末，我都會和家人一起去祈福。現在在台灣工作，偶爾經過廟宇，聞到相似的香氣，就覺得特別親切。",
  },
];

// 示例故事
function loadSampleStories() {
  sampleStories.forEach((story) => {
    const storyCard = document.createElement("div");
    storyCard.className = "story-card";
    storyCard.innerHTML = `
      <div class="story-header">
        <h4>${story.author}</h4>
        <span class="country-tag">${getCountryName(story.country)}</span>
      </div>
      <p>${story.story}</p>
      <div class="story-footer">
        <span class="date">${new Date().toLocaleDateString("zh-TW")}</span>
      </div>
    `;
    storyContainer.appendChild(storyCard);
  });
}

// 故事表單提交處理
function handleStorySubmit(e) {
  e.preventDefault();

  const author = document.getElementById("author").value;
  const story = document.getElementById("story").value;
  const country = document.getElementById("country").value;

  // 創建新的故事卡片
  const storyCard = document.createElement("div");
  storyCard.className = "story-card";
  storyCard.innerHTML = `
    <div class="story-header">
      <h4>${author}</h4>
      <span class="country-tag">${getCountryName(country)}</span>
    </div>
    <p>${story}</p>
    <div class="story-footer">
      <span class="date">${new Date().toLocaleDateString("zh-TW")}</span>
    </div>
  `;

  // 添加到故事容器
  storyContainer.insertBefore(storyCard, storyContainer.firstChild);

  // 重置表單
  storyForm.reset();

  // 添加動畫效果
  storyCard.style.opacity = "0";
  storyCard.style.transform = "translateY(20px)";

  requestAnimationFrame(() => {
    storyCard.style.transition = "all 0.5s ease";
    storyCard.style.opacity = "1";
    storyCard.style.transform = "translateY(0)";
  });
}

// 產品卡片懸停效果
function initProductHoverEffects() {
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const overlay = card.querySelector(".product-overlay");
      overlay.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      const overlay = card.querySelector(".product-overlay");
      overlay.style.opacity = "0";
    });
  });
}

function initializeApp() {
  if (storyForm) {
    storyForm.addEventListener("submit", handleStorySubmit);
  }

  loadSampleStories();
  initProductHoverEffects();
}

document.addEventListener("DOMContentLoaded", initializeApp);

// 故事牆功能
document.addEventListener("DOMContentLoaded", function () {
  const storyForm = document.getElementById("storyForm");
  const storyContainer = document.querySelector(".story-container");

  // 處理故事提交
  storyForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("storyTitle").value;
    const content = document.getElementById("storyContent").value;
    const images = document.getElementById("storyImages").files;

    // 創建新故事卡片
    const storyCard = createStoryCard(title, content, images);
    storyContainer.prepend(storyCard);

    // 重置表單
    storyForm.reset();
  });

  // 創建故事卡片
  function createStoryCard(title, content, images) {
    const card = document.createElement("div");
    card.className = "story-card";

    const date = new Date().toLocaleDateString("zh-TW");

    card.innerHTML = `
            <div class="story-header">
                <h4>${title}</h4>
                <span class="story-date">${date}</span>
            </div>
            <div class="story-content">${content}</div>
            ${createImageGallery(images)}
        `;

    return card;
  }

  // 創建圖片畫廊
  function createImageGallery(images) {
    if (!images || images.length === 0) return "";

    let gallery = '<div class="story-gallery">';
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onload = function (e) {
        gallery += `<img src="${e.target.result}" alt="故事圖片 ${i + 1}">`;
      };
      reader.readAsDataURL(images[i]);
    }
    gallery += "</div>";
    return gallery;
  }

  // 初始化圖表
  initializeCharts();
});

// 數據圖表功能
function initializeCharts() {
  // 參與度分析圖表
  const participationCtx = document
    .getElementById("participationChart")
    .getContext("2d");
  new Chart(participationCtx, {
    type: "line",
    data: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
      datasets: [
        {
          label: "故事發布數",
          data: [12, 19, 15, 25, 22, 30],
          borderColor: "#4A90E2",
          tension: 0.4,
        },
        {
          label: "互動次數",
          data: [30, 45, 35, 60, 55, 80],
          borderColor: "#50E3C2",
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "平台參與度趨勢",
        },
      },
    },
  });

  // 情感分析圖表
  const sentimentCtx = document
    .getElementById("sentimentChart")
    .getContext("2d");
  new Chart(sentimentCtx, {
    type: "doughnut",
    data: {
      labels: ["正面", "中性", "負面"],
      datasets: [
        {
          data: [65, 25, 10],
          backgroundColor: ["#4A90E2", "#50E3C2", "#FF6B6B"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "故事情感分析",
        },
      },
    },
  });
}

// 時間範圍選擇器功能
document.getElementById("timeRange").addEventListener("change", function (e) {
  // 這裡可以根據選擇的時間範圍更新圖表數據
  console.log("選擇的時間範圍：", e.target.value);
});

// 工具包下載功能
document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const resourceType = this.parentElement.querySelector("h3").textContent;
    alert(`即將下載${resourceType}，請稍候...`);
    // 這裡可以添加實際的下載邏輯
  });
});
