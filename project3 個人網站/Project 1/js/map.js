// 創建故事卡片
function createStoryCard(name, country, story, date) {
  if (!name || !country || !story) return null;

  const storyCard = document.createElement("div");
  storyCard.className = "story-card";
  storyCard.innerHTML = `
    <div class="story-card-header">
      <h4 class="author-name">${name}</h4>
      <span class="story-country">${country}</span>
    </div>
    <p class="story-content">${story}</p>
    <div class="story-date">${date || new Date().toLocaleString("zh-TW")}</div>
  `;
  return storyCard;
}

// 保存故事到 localStorage
function saveStory(storyData) {
  const stories = JSON.parse(localStorage.getItem("stories") || "[]");
  stories.unshift(storyData);
  localStorage.setItem("stories", JSON.stringify(stories));
}

// 載入已有的故事
function loadStories() {
  const stories = JSON.parse(localStorage.getItem("stories") || "[]");
  const container = document.getElementById("storyContainer");
  if (container) {
    container.innerHTML = ""; // 清空容器
    stories.forEach((storyData) => {
      const card = createStoryCard(
        storyData.name,
        storyData.country,
        storyData.story,
        new Date(storyData.date).toLocaleString("zh-TW")
      );
      if (card) {
        container.appendChild(card);
      }
    });
  }
}

// 監聽表單提交
document.getElementById("storyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const countrySelect = document.getElementById("country");
  const nameInput = document.getElementById("name");
  const storyInput = document.getElementById("story");

  if (!countrySelect || !nameInput || !storyInput) {
    console.error("找不到必要的表單元素");
    return;
  }

  const country = countrySelect.value;
  const name = nameInput.value.trim();
  const story = storyInput.value.trim();

  if (!country || !name || !story) {
    console.error("請填寫所有必要欄位");
    return;
  }

  // 保存故事
  const storyData = {
    name,
    country,
    story,
    date: new Date().toISOString(),
  };
  saveStory(storyData);

  // 創建並添加故事卡片
  const storyCard = createStoryCard(name, country, story);
  if (storyCard) {
    const storyContainer = document.getElementById("storyContainer");
    if (storyContainer) {
      storyContainer.insertBefore(storyCard, storyContainer.firstChild);
    }
  }

  // 重置表單
  e.target.reset();
});

// 頁面加載時初始化
document.addEventListener("DOMContentLoaded", function () {
  loadStories();
});
