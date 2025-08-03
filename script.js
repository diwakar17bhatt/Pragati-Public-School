

if(document.body.id === "index-page"){
  function animateValue(id, start, end, duration) {
      const obj = document.getElementById(id);
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }

    const counterEl = document.getElementById("counterone");
    const counterEa = document.getElementById("countertwo")
    const counterEs = document.getElementById("counterthree")
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue("counterone", 0, 17, 1000);
          animateValue("countertwo", 0, 150, 1000);
          animateValue("counterthree", 0, 10, 1000);
          hasAnimated = true;
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% visible
    });

    observer.observe(counterEl);
    observer.observe(counterEa)
    observer.observe(counterEs)



}


document.getElementById("doubleDropdownButton-two").addEventListener("click", ()=>{
  
  document.getElementById("doubleDropdown-two").classList.toggle("hidden")
    document.getElementById("doubleDropdown").classList.add("hidden")
})

document.getElementById("doubleDropdownButton").addEventListener("click", ()=>{
  
  document.getElementById("doubleDropdown-two").classList.add("hidden")
 
})



async function getNews() {
  const res = await fetch("http://localhost:3000/getnews")
  const data = await res.json()
  console.log(data)
  const news = document.getElementById("event");
  if(data.length == 0){
    const val = document.createElement("h1")
    val.innerText = "No current News"
    news.appendChild(val)
  }else{
    data.forEach(val=>{
      const event = document.createElement("h1")
      event.classList.add("flex", "items-center", "gap-5", "underline")
      event.innerHTML=`${val.newsandevents}`;
      news.appendChild(event)

    })
  }
}

getNews()


const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 700,
    effect: "fade",  // or "fade"
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const msp = new Swiper(".msP", {
    loop: true,
    speed: 700,
    effect: "slide",  // or "fade"
    slidesPerView: 1,
    spaceBetween: 0,
    
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });