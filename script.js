let myLead = []
const inputEl = document.getElementById("input-el")
const inputBtn  = document.getElementById("input-btn")
const clearLastBTN = document.getElementById("clearlast-btn")
let clearBtn = document.getElementById("clear-btn")
let ulEl = document.getElementById("ul-el")
let leadsLocalStoarge = JSON.parse(localStorage.getItem("myLeads"))

if(leadsLocalStoarge){
  myLead = leadsLocalStoarge
  render(myLead)
}

function render(leads){
  let orderList = ""
  for(i =  0 ; i < leads.length ; i ++){
  orderList +=
  `
  <li>
    <a target = '_blank' href='${leads[i]}' >
      ${leads[i]}
    </a>
  </li>
  `
  ulEl.innerHTML = orderList
  }}

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    inputEl.value=tabs[0].url
  })

inputBtn.addEventListener("click" ,function(){
  myLead.push(inputEl.value)
  localStorage.setItem("myLeads",JSON.stringify(myLead))
  if(inputEl.value === ""){myLead.pop()}
else{
  render(myLead)
}
  inputEl.value = ""
})

var clickCounter=0;
clearBtn.onclick=function() {
  clickCounter++;
  if(clickCounter===1){
    document.getElementById('clear-btn').setAttribute("id", "style1") //change attribute to change css for example
    clearBtn.textContent = "CLICK AGAIN"
    const interval = setInterval(function() {
    window.location.reload()
  }, 1800) //to reaload page is user dosen't click again
  }
  else if (clickCounter===2) {
    localStorage.clear()
    myLead = []
    window.location.reload()
}};// make action onsecon click

clearLastBTN.addEventListener("click",function(){
  myLead.pop()
  render(myLead)
  localStorage.setItem("myLeads",JSON.stringify(myLead))
})

// to download the urls
function download(filename, text) {
  let downloadEL = document.createElement('a');
  downloadEL.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  downloadEL.setAttribute('download', filename);
  downloadEL.style.display = 'none';
  document.body.appendChild(downloadEL);
  downloadEL.click();
  document.body.removeChild(downloadEL);
}
document.getElementById("download-btn").addEventListener("click", function(){
  let text=""
  for(n=0 ; n < myLead.length ; n++){
    text += myLead[n] + "\r\n"
  }
text = text + "\r\n" + "<--!Created By Ahmed Khalil!-->"
  let filename = "URLS File.txt";
  download(filename, text);
}, false);