async function getNewsAdmin() {
  const res = await fetch("http://localhost:3000/getnewsadmin")
  const data = await res.json()
 
  const news = document.getElementById("nae");
  if(data.length == 0){
    const row = document.createElement("tr")
      row.className = "border-t";
      row.innerHTML = `<td class="px-4 py-2 text-center">0</td>
      <td class="px-4 py-2">No news</td>`
      news.appendChild(row)
  }else{
    data.forEach(val=>{
      const row = document.createElement("tr")
      row.className = "border-t";
      row.innerHTML = `<td class="px-4 py-2 text-center">${val.id}</td>
      <td class="px-4 py-2">${val.newsandevents}</td>`
      news.appendChild(row)
    })
  }
  
}

getNewsAdmin();


document.getElementById("newsaddform").addEventListener("submit", async (e)=>{
  

  const news = document.getElementById("addnews").value
  console.log(news.length)
  if(news.length > 0){
    const res = fetch("http://localhost:3000/addnews",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({news})
    })
   
    alert("News Inserted")
    document.getElementById("addnews").value = ""
  }else{
  alert("Enter a news")
}
})

document.getElementById("newsdeleteform").addEventListener("submit", async (e)=>{
  

  const id = document.getElementById("deletenews").value
  const res = await fetch("http://localhost:3000/deletenews", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  })
  const data = await res.json();
  if(res.status === 404){
    alert("ID doesn't exist")
  }else if(res.ok){
    alert("News Deleted")
  document.getElementById("deletenews").value = "";
  }else{
    alert("Something went wrong")
  }

})
function loadTeacherListForDelete() {
  fetch("http://localhost:3000/teachers")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("teacherItems");
      list.innerHTML = ""; // clear previous list

      if (!data.length) {
        list.innerHTML = "<p class='text-gray-500'>No teachers found.</p>";
        return;
      }

      data.forEach(t => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="flex justify-between items-center border p-2 rounded hover:bg-gray-50">
            <div>
              <p class="font-semibold text-gray-800">${t.name}</p>
              <p class="text-sm text-gray-500">Contact: ${t.contact}</p>
            </div>
            <button onclick="fillContact('${t.contact}')" class="text-blue-600 underline text-sm cursor-pointer w-fit">Select</button>
          </div>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Error loading teacher list:", err);
    });
}

// Fill delete input when select is clicked
function fillContact(contact) {
  document.getElementById("contactDelete").value = contact;
}

// Call this when page loads
loadTeacherListForDelete();
