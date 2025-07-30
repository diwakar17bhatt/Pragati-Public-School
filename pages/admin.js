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
