let createButton = document.getElementById("button")
let modalContainer = document.getElementById("modal-container")
let closeModalIcon = document.getElementById("close-modal-icon")
let form = document.getElementById("form")
let nameOfWebsite = document.getElementById("name-of-website")
let linkOfWebsite = document.getElementById("link-of-website")
let descriptionOfWebsite = document.getElementById("description-of-website")
let resourcesSection = document.getElementById("resources-section")

let resources = []

createButton.addEventListener("click", revelModalContainer)
function revelModalContainer(){
    if(modalContainer.classList.contains("modal-container")){
        modalContainer.classList.remove("modal-container")
        modalContainer.classList.add("modal-container-visible")
    }
}

closeModalIcon.addEventListener("click", hideModalContainer)
function hideModalContainer(){
    if(modalContainer.classList.contains("modal-container-visible")){
        modalContainer.classList.remove("modal-container-visible")
        modalContainer.classList.add("modal-container")
    }
}

form.addEventListener("submit", collectAndSaveResource)
function collectAndSaveResource(event){
    event.preventDefault()
    let websiteName = nameOfWebsite.value 
    let websiteLink = linkOfWebsite.value 
    let websiteDescription = descriptionOfWebsite.value

    const resourceObject = {
        nameForWebsite : websiteName,
        linkForWebsite : websiteLink,
        descriptionOfWebsite : websiteDescription
    }
    resources.push(resourceObject)
    localStorage.setItem("resources", JSON.stringify(resources))
    form.reset()
    hideModalContainer()
    fetchResources()
}


function fetchResources(){
    if(localStorage.getItem("resources")){
        resources = JSON.parse(localStorage.getItem("resources"))
    }
    showResourcesOnUI()
}
fetchResources()


function showResourcesOnUI(){
    resourcesSection.innerHTML = " "
    resources.forEach(function(resourceObject, index){
        let theWebsiteName = resourceObject.nameForWebsite
        let theWebsiteLink = resourceObject.linkForWebsite
        let theWebsiteDescription = resourceObject.descriptionOfWebsite

        let resourceDiv = document.createElement("div")
        resourceDiv.classList.add("resource")

        let nameOfWebsiteAndDeleteIconDiv = document.createElement("div")
        nameOfWebsiteAndDeleteIconDiv.classList.add("name-of-website-and-delete-icon")

        let nameOfWebsiteText = document.createElement("a")
        nameOfWebsiteText.setAttribute("href", `${theWebsiteLink}`)
        nameOfWebsiteText.textContent = theWebsiteName
        nameOfWebsiteText.setAttribute("target", "_blank")

        let deleteIcon = document.createElement("i")
        deleteIcon.classList.add("fa", "fa-trash")
        deleteIcon.setAttribute("id", "delete-icon")
        deleteIcon.setAttribute("onclick", `deleteResource('${theWebsiteLink}')`)

        let descriptionOfWebsiteDiv = document.createElement("div")
        descriptionOfWebsiteDiv.classList.add("description-of-website-container")

        let descriptionText = document.createElement("p")
        descriptionText.textContent = theWebsiteDescription


        // Appending Elements
        nameOfWebsiteAndDeleteIconDiv.append(nameOfWebsiteText, deleteIcon)
        descriptionOfWebsiteDiv.append(descriptionText)
        resourceDiv.append(nameOfWebsiteAndDeleteIconDiv, descriptionOfWebsiteDiv)
        resourcesSection.append(resourceDiv)
    })
}

function deleteResource(theWebsiteLink){
    resources.forEach(function(resourceObject, index){
        if (resourceObject.linkForWebsite === theWebsiteLink){
            resources.splice(index, 1)//read on it 
        }
    })

    localStorage.setItem("resources", JSON.stringify(resources))
    fetchResources()

}