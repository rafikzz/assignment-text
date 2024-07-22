//For Closing Header Announcement
document.querySelectorAll(".header-close-js").forEach((closeButton) => {
  closeButton.addEventListener("click", function () {
    this.closest(".header-notification").style.display = "none";
    adjust_sidebar_height();
  });
});
const adjust_sidebar_height = () => {
  var sidebar_menu = document.querySelector("#sidebar-menu-js");
  if (sidebar_menu) {
    let header = document.getElementById("header-js");
    if (header) {
      let rect = header.getBoundingClientRect();
      sidebar_menu.style.height = "calc( 100vh - " + rect.bottom + "px )";
      document.documentElement.style.setProperty(
        "--current-header-height",
        `${rect.bottom}px`
      );
    }
  }
};

//For Toggling Side Menu
var header_button = document.querySelector("#head-burger-js");
if (header_button) {
  document
    .querySelector("#head-burger-js")
    .addEventListener("click", function () {
      var sidebar_menu = document.querySelector("#sidebar-menu-js");
      if (!this.classList.contains("open")) {
        this.classList.add("open");
        this.setAttribute("aria-expanded", "true");
        var sidebar_menu = document.querySelector("#sidebar-menu-js");
        if (sidebar_menu) {
          let header = document.getElementById("header-js");
          if (header) {
            let rect = header.getBoundingClientRect();
            sidebar_menu.style.height = "calc( 100vh - " + rect.bottom + "px )";
          }
          sidebar_menu.classList.add("header__mobile-sidemenu--open");
          document.documentElement.classList.add("overflow-md-y-hidden");
          document.body.classList.add("overflow-md-y-hidden");
        }
      } else {
        this.classList.remove("open");
        if (sidebar_menu) {
          sidebar_menu.classList.remove("header__mobile-sidemenu--open");
          document.documentElement.classList.remove("overflow-md-y-hidden");
          document.body.classList.remove("overflow-md-y-hidden");
          this.setAttribute("aria-expanded", "false");
        }
      }
    });
}
//For Fixing Submen Height
let header_height = document.querySelector("#header-js");
window.addEventListener("scroll", function () {
  let header = document.getElementById("header-js");
  let headerSpacer = document.getElementById("header-spacer-js");
  if (header) {
    if (window.scrollY > 150) {
      header.classList.add("header--sticky");
      adjust_sidebar_height();
    } else {
      header.classList.remove("header--sticky");
      adjust_sidebar_height();
    }
  }
});
//For Swiper
let swiperElements = document.querySelectorAll(".mobile-swiper-js");

swiperElements.forEach((swiperElement) => {
  new Swiper(swiperElement, {
    slidesPerView: "auto",
    spaceBetween: 10,
    navigation: false,
  });
});
//For Opening Sub menu
let menuLinks = document.querySelectorAll(".mobile-megamenu-js");

// Attach click event to each menu link
menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    let parentItem = link.closest(".menu__mobile-nav-item");
    parentItem.classList.add("open-submenu");
  });
});
//For Closing Sub menu
const closesubmenu = (link) => {
  let parentItem = link.closest(".menu__mobile-nav-item");
  parentItem.classList.add("here");
  parentItem.classList.remove("open-submenu");
};
let submenucloseButton = document.querySelectorAll(".close-submenu-js");
submenucloseButton.forEach(function (link) {
  link.addEventListener("click", function (e) {
    closesubmenu(link);
  });
});
//For Closing Menu and submenu
let closeallmenu = document.querySelectorAll(".close-mobilemenu-js");
closeallmenu.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const burgerButton = document.getElementById("head-burger-js");
    closesubmenu(link);
    if (burgerButton) {
      setTimeout(() => {
        burgerButton.click();
      }, 200);
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll(".tab-link-js");
  tabLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all links
      var parentItem = link.closest(".tab__nav-list");
      if (parentItem) {
        var closeLinks = parentItem.querySelectorAll(".tab-link-js");
        closeLinks.forEach((link) => link.classList.remove("tab-link__active"));
        closeLinks.forEach((link) => link.setAttribute("aria-selected",'false'));

        this.classList.add("tab-link__active");
        this.setAttribute("aria-selected",'true');

        var closetTabPanel = parentItem.nextElementSibling;
        var closetTabPanelItem = closetTabPanel.querySelectorAll(
          ".tab__content__item"
        );
        closetTabPanelItem.forEach((content) =>
          content.classList.remove("active")
        );
      }
      const target = this.getAttribute("data-target");
      if (target) {
        let targetEl = document.querySelector(target);
        if (targetEl) {
          targetEl.classList.add("active");
        }
      }
    });
  });
});

let largeSwiper = document.querySelectorAll(".swiper-js");
largeSwiper.forEach((swiperElement, index) => {
  const nextButton = swiperElement
    .closest(".slider-box")
    .querySelector(".swiper-button-next");
  const prevButton = swiperElement
    .closest(".slider-box")
    .querySelector(".swiper-button-prev");

  new Swiper(swiperElement, {
    slidesPerView: "auto",
    spaceBetween: 14,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
  });
});

// document
//   .querySelectorAll(".video-swiper-container")
//   .forEach((container, index) => {
//     const mySwiper = new Swiper(container.querySelector(".video-swiper"), {
//       autoplay: {
//         delay: 8000,
//       },
//       loop: false,
//       autoWidth: true,
//       slidesPerView: 1,
//       on: {
//         transitionStart: function () {
//           const videos = container.querySelectorAll("video");
//           const iframes = container.querySelectorAll("iframe");
//           videos.forEach((video) => video.pause());
//           iframes.forEach((iframe) => {
//             const src = iframe.src;
//             if (src.includes("vimeo.com")) {
//               const player = new Vimeo.Player(iframe);
//               player.pause();
//             }
//           });
//         },
//         transitionEnd: function () {
//           const activeIndex = this.activeIndex;
//           const activeSlide =
//             container.querySelectorAll(".swiper-slide")[activeIndex];
//           const activeSlideVideo = activeSlide.querySelector("video");
//           const activeSlideIframe = activeSlide.querySelector("iframe");
//           if (activeSlideVideo) {
//             activeSlideVideo.play();
//           }
//           if (activeSlideIframe) {
//             const src = activeSlideIframe.src;
//             if (src.includes("vimeo.com")) {
//               const player = new Vimeo.Player(activeSlideIframe);
//               player.play();
//             }
//           }
//         },
//         autoplayTimeLeft(s, time, progress) {
//           container
//             .querySelector(".go-to-buttons ")
//             .style.setProperty("--progress", 1-progress);
     
//         },
//       },
//     });
//     // Function to update active button
//     function updateActiveButton(index) {
//       container
//         .querySelectorAll(".go-to-buttons .slider-accordion-item")
//         .forEach((button) => {
//           button.classList.remove("active");
//         });
//       container
//         .querySelector(`.go-to-buttons button[data-slide="${index}"]`)
//         .parentElement.classList.add("active");
//     }
//     // Initial active button setup
//     updateActiveButton(mySwiper.realIndex);
//     // Add event listeners to "Go to" buttons
//     container.querySelectorAll(".go-to-buttons button").forEach((button) => {
//       button.addEventListener("click", function () {
//         const slideIndex = this.getAttribute("data-slide");
//         mySwiper.slideTo(slideIndex);
//       });
//     });
//     // Update active button on slide change
//     mySwiper.on("slideChange", function () {
//       updateActiveButton(mySwiper.realIndex);
//     });
//   });
// //For Accordian
// document.addEventListener("DOMContentLoaded", function () {
//   function initializeAccordion(accordionElement) {
//     const headers = accordionElement.querySelectorAll(".slider-accordion-header");

//     headers.forEach((header) => {
//       header.addEventListener("click", function () {
//         // Close all open accordion items within this accordion container
//         accordionElement.querySelectorAll(".slider-accordion-item").forEach((item) => {
//           item.classList.remove("active");
//           item.setAttribute("aria-expanded",'false');;
//         });
//         this.closest(".slider-accordion-item").classList.add("active");
//         this.closest(".slider-accordion-item").setAttribute("aria-expanded",'true');

//       });
//     });
//   }

//   const accordions = document.querySelectorAll(".slider-accordion");
//   accordions.forEach(initializeAccordion);
// });
