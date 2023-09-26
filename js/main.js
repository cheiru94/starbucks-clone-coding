/* 1. SUB-MENU : 돋보기 클릭 화면 넓히기 */
/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});
// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});
// 검색창 요소 내부 실제 input 요소에서 포커스가 해제(블러)되면 실행.
searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

/* 2. BADGE : 500 이상이면 투명하게 (숨기기) */
const badgeEl =
  document.querySelector("header .badges"); /* document는 HTML 자체 */
const toToEl = document.querySelector("#to-top");

window.addEventListener(
  "scroll",
  _.throttle(function () {
    /* window -> 우리가 보고있는 화면 자체  */ console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      gsap.to(badgeEl, 0.6, {
        opacity: 0,
        display: "none",
      });
      //버튼 보기
      gsap.to(toToEl, 0.2, {
        x: 0,
      });
    } else {
      // 배지 보이기
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      //버튼 숨기기
      gsap.to(toToEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
); /* 300 = 0.3초를 의미  - 밀리세컨트 ,  1000ms = 1초   */

toToEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

// 3. VISUAL : 시간차 나타나기 (순차적 애니메이션)
const fadeEls = document.querySelectorAll(".visual .fade-in");

fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, // 0.7 , 1.4 , 2.1 ,  2.7  초
    opacity: 1,
  });
});

/* 4. NOTICE : 수직 슬라이드(Swiper)  */
/*   new Swiper ( 선택자 , 옵션)  */
new Swiper(".notice-line .swiper-container", {
  direction: "vertical", // 수직 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
});

/* 5. PROMOTION : 프로모션 이미지 슬라이드(Swiper)  */
new Swiper(".promotion .swiper-container", {
  // direction: 'horizontal', // 수평 슬라이드
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    // 자동 재생 여부
    delay: 5000, // 5초마다 슬라이드 바뀜
  },

  pagination: {
    // 페이지 번호 사용 여부
    el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
    clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
  },

  navigation: {
    prevEl: ".promotion .swiper-prev", // 이전 슬라이드
    nextEl: ".promotion .swiper-next", // 다음 슬라이드
  },
});

new Swiper(".awards .swiper-container", {
  // direction: 'horizontal', // 수평 슬라이드
  autoplay: true, // 자동 재생 여부
  loop: true, // 반복 재생 여부
  spaceBetween: 30, // 슬라이드 사이 여백
  slidesPerView: 5, // 한 번에 보여줄 슬라이드 개수
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});

/* 6. Promotion 슬라이드 토글 기능  */
const promotionEl = document.querySelector(".promotion"); // 슬라이드 영역 요소 검색!
const promotionToggleBtn = document.querySelector(".toggle-promotion"); // 슬라이드 영역를 토글하는 버튼 검색!
let isHidePromotion = false; // 기본 값은 false  , boolean 값으로 설정

promotionToggleBtn.addEventListener("click", function () {
  // 토글 버튼을 클릭하면,
  isHidePromotion = !isHidePromotion; // 슬라이드 영역 숨김 여부를 반댓값으로 할당

  // 숨김 처리
  if (isHidePromotion) {
    promotionEl.classList.add("hide");
    // 보임 처리
  } else {
    promotionEl.classList.remove("hide");
  }
});

/* 7. 랜덤 함수를 사용 */
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, y_size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: y_size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay),
  });
}
floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// 8. scrollMagic cdn
const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});
