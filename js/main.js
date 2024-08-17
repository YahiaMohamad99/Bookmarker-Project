var sites
localStorage.getItem("sites")== null ? sites = [] : sites= JSON.parse(localStorage.getItem("sites"))
displaySite()


var siteNameInput = document.querySelector("#siteNameInput")
var siteUrlInput = document.querySelector("#siteUrlInput")
var submitBtn = document.querySelector(".input-section button")
var lightBoxContainer = document.querySelector("#lightBoxContainer")
var closeIcon = document.querySelector("#closeIcon")

submitBtn.addEventListener("click", addUrl)
closeIcon.addEventListener("click",closeLightBoxContainer)
siteNameInput.addEventListener("input",function(event){
validateSiteName(event.target.value)
})
siteUrlInput.addEventListener("input",function(event){
    validateSiteUrl(event.target.value)
})




function addUrl(){
    if(validateSiteName(siteNameInput.value))
    {
         var site={
        name:siteNameInput.value,
        url:siteUrlInput.value
    }
    sites.push(site)
    updateLocalStorage()
    clearInputs()
    displaySite ()   
    }
    else{
    lightBoxContainer.classList.replace("d-none","d-flex")
      
    }

    
}
function displaySite (){
    var holder =''
    for(var i = 0 ; i<sites.length ; i++){

        holder += `  <tr>
              <td>${i+1}</td>
              <td>${sites[i].name}</td>
              <td>
                <button onclick=" visitSite(${i})" class="btn btn-success">
                  <i class="fa-solid fa-eye"></i> Visit
                </button>
              </td>
              <td>
                <button  onclick="deleteSite(${i})" class="btn btn-danger">
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
        `

    }
    document.querySelector("tbody").innerHTML = holder
}
function clearInputs(){
    siteNameInput.value =''
    siteUrlInput.value =''
}
function updateLocalStorage(){
    localStorage.setItem("sites" , JSON.stringify(sites))

}
function deleteSite(index){
sites.splice(index,1)
updateLocalStorage()
displaySite()

}
function visitSite(index){
window.open(sites[index].url)

}
function validateSiteName(data){
    var regex = /^[A-Z].*/g
    if(regex.test(data)){
        siteNameInput.classList.remove("is-invalid")
        siteNameInput.classList.add("is-valid")
      
      
        return true
    }
    else {
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        return false 
        

    }
}
function validateSiteUrl(data){
    // /^(ftp|http|https):\/\/[^ "]+$/
    var regex = /^(ftp|http|https):\/\/[^ "]+$/
    if(regex.test(data)){
        siteUrlInput.classList.remove("is-invalid")
        siteUrlInput.classList.add("is-valid")
      
      
        return true
    }
    else {
        siteUrlInput.classList.add("is-invalid")
        siteUrlInput.classList.remove("is-valid")
        return false 
        

    }
}
function closeLightBoxContainer(){
    lightBoxContainer.classList.replace("d-flex","d-none")
}
