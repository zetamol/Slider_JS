
let position = 0;

const slidereContainer = document.querySelector(".slider-container");
const sliderTrack = document.querySelector(".slider-track");
const sliderItem = document.querySelectorAll(".slider-item");
const itemW = sliderItem[0].width;
const trackW = itemW * (sliderItem.length - 1);

const prev = document.querySelector(".arrow-left");
const next = document.querySelector(".arrow-right");

const controlPoints = Array.from(document.querySelectorAll(".point"));
const links = Array.from(document.querySelectorAll(".projects-nav-item a"));

function addSlideListener(arr) {
  arr.forEach((item, idx) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      position = -idx * itemW;
      slideByPointsLinks(position);
      addActiveClass(idx);
      renderContent(idx);
    });
  });
}

function addActiveClass(idx) {
  links[idx].classList.add("active");
  controlPoints[idx].classList.add("active");
}

function removeActiveClass(arr) {
  arr.forEach((item) => item.classList.remove("active"));
}

addSlideListener(controlPoints);
addSlideListener(links);
prev.addEventListener("click", slideArrowBack);
next.addEventListener("click", slideArrowNext);
mobilePrev.addEventListener("click", slideArrowBack);
mobileNext.addEventListener("click", slideArrowNext);

function slideArrowNext() {

  removeActiveClass([...controlPoints, ...links]);
  let idx = Math.abs(position) / itemW + 1;
  if (idx > controlPoints.length - 1) idx = 0;
  controlPoints[idx].classList.add("active");
  links[idx].classList.add("active");

  Math.abs(position) >= trackW ? (position = 0) : (position -= itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;

}

function slideArrowBack() {

  removeActiveClass([...controlPoints, ...links]);
  let idx = Math.abs(position) / itemW - 1;
  if (idx < 0) idx = controlPoints.length - 1;
  controlPoints[idx].classList.add("active");
  links[idx].classList.add("active");

  position === 0 ? (position = -trackW) : (position += itemW);
  sliderTrack.style.transform = `translateX(${position}px)`;

}

function slideByPointsLinks(position) {
  removeActiveClass([...controlPoints, ...links]);
  sliderTrack.style.transform = `translateX(${position}px)`;
}
