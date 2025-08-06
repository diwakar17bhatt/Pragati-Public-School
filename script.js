

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


if(document.body.id !== "admin-page"){
  document.getElementById("doubleDropdownButton-two").addEventListener("click", ()=>{
  
  document.getElementById("doubleDropdown-two").classList.toggle("hidden")
    document.getElementById("doubleDropdown").classList.add("hidden")
})

document.getElementById("doubleDropdownButton").addEventListener("click", ()=>{
  
  document.getElementById("doubleDropdown-two").classList.add("hidden")
 
})
}


if(document.body.id === "index-page"){
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
}





if(document.body.id != "admin-page"){
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 700,
    effect: "fade",  // or "fade"
    slidesPerView: 1,
    spaceBetween: 0,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
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
}

if(document.body.id === "admin-page"){
document.getElementById("addTeacherForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // prevent page reload

  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch("http://localhost:3000/add-teacher", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  alert(data.message);
  form.reset();
});

}



async function deleteTeacher(e) {
  e.preventDefault();
  const contact = document.getElementById("contactDelete").value;
  const res = await fetch("http://localhost:3000/delete-teacher", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contact })
  });
  const data = await res.json();
  alert(data.message);
  location.reload();
}

if (document.getElementById("teachersGrid")) {
  fetch("http://localhost:3000/u-teachers")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("teachersGrid");
      data.forEach(teacher => {
        grid.innerHTML += 
          `<div class="flex items-start gap-3 flex-col md:flex-row bg-gray-100 md:w-[60%]  p-2">
                    <img src="http://localhost:3000${teacher.profile_image_url}" alt="Profile"
                        class="h-36 w-32 object-cover mb-4 border-4 border-[#00000]">
                    <div class="flex flex-col ">
                        <h3 class="text-xl font-semibold text-[#5a4a3c]">Name: ${teacher.name}</h3>
                        <p class="text-sm text-gray-600 ">Teaching level: ${teacher.qualification}</p>
                        <p class="text-sm text-gray-600 mt-1">Contact: +91 ${teacher.contact}</p>
                    </div>
                </div>
                 <div class="h-[0.5px] bg-gray-500 shadow my-3 md:w-[80%]"></div>`
      });
    });
}

// Populate the delete list
// Load teacher list on admin panel
