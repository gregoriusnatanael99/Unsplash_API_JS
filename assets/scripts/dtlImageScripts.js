function capitalizeFirstLetter(string) {
  	return string.charAt(0).toUpperCase() + string.slice(1);
}

function insertInnerNode(string,value){
	let insertedNode = [];
	for (var i = 0; i < 3; i++) {
		insertedNode[i] = document.createElement("td")
		if(i===0){
			insertedNode[i].innerText = string
		}else if(i===1){
			insertedNode[i].innerText = " : "
		}else{
			insertedNode[i].innerText = value
		}
	}return insertedNode
}

function downloadImage(url){
	let link = document.createElement('a');
	link.href = url;
	link.download = 'Download.jpg';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function openUserDetailsPage(username){
	localStorage.setItem("dtlUsername",username)
	var dtlWindow = window.open("user_details.html","_self");
}

window.onload = function(){
	let receiveData = localStorage.getItem("dtlImgData")
	let imgId = localStorage.getItem("dtlImgId")
	let clientId = "EBUQJ1ongbANwTfQ5sWNKXqLtY5jm_KDumF9uABj-20";
	const url = "https://api.unsplash.com/photos/"+imgId+"/?client_id="+clientId;
	const displayedImage = document.createElement("img"); 
	data = JSON.parse(receiveData)
	console.log(JSON.parse(receiveData))
	displayedImage.src = data.results[imgId].urls.raw
	displayedImage.id = "displayedImage"
	displayedImage.style = "width:100%; position: relative;display: block"
	document.getElementById("resultDtlImg").insertAdjacentElement("beforeend",displayedImage);
	const displayedImageDtl = [];
	if (data.results[imgId].alt_description !== null) {
		console.log(capitalizeFirstLetter(data.results[imgId].alt_description))
		displayedImageDtl[0] = document.createElement("tr")
		displayedImageDtl[0].id = "alt_description"
		document.getElementById("dtlImgInfo").insertAdjacentElement("beforeend",displayedImageDtl[0]);
		descNode = insertInnerNode("Description",capitalizeFirstLetter(data.results[imgId].alt_description))
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("alt_description").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.results[imgId].likes !== null) {
		displayedImageDtl[0] = document.createElement("tr")
		displayedImageDtl[0].id = "likes"
		document.getElementById("dtlImgInfo").insertAdjacentElement("beforeend",displayedImageDtl[0]);
		descNode = insertInnerNode("Likes",data.results[imgId].likes)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("likes").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.results[imgId].user.first_name !== null || data.results[imgId].user.last_name !== null) {
		displayedImageDtl[0] = document.createElement("tr")
		displayedImageDtl[0].id = "userName"
		document.getElementById("dtlImgInfo").insertAdjacentElement("beforeend",displayedImageDtl[0]);
		let name = ""
		if (data.results[imgId].user.first_name !== null)
			name += capitalizeFirstLetter(data.results[imgId].user.first_name)
		if (name !== "") 
			name += " "
		if (data.results[imgId].user.last_name !== null) 
			name += capitalizeFirstLetter(data.results[imgId].user.last_name)
		descNode = insertInnerNode("Uploaded by",name)
		descNode[2].style.textDecoration = "underline";
		const username = data.results[imgId].user.username
		descNode[2].addEventListener("click",function(){
			openUserDetailsPage(username)
			// console.log()
		})
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("userName").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.results[imgId].created_at !== null) {
		displayedImageDtl[0] = document.createElement("tr")
		displayedImageDtl[0].id = "creationDate"
		document.getElementById("dtlImgInfo").insertAdjacentElement("beforeend",displayedImageDtl[0]);
		let displayDate = Date(data.results[imgId].created_at)
		descNode = insertInnerNode("Created at",displayDate)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("creationDate").insertAdjacentElement("beforeend",descNode[i])
		}
	}displayedImageDtl[0] = document.createElement("button")
	displayedImageDtl[0].id = "downloadBtn"
	displayedImageDtl[0].className = "btn btn-primary"
	displayedImageDtl[0].innerText = "Download Image"
}

function getFileName(str) {
    return str.substring(str.lastIndexOf('/') + 1)
}

const btnNode = document.createElement("button")
btnNode.id = "downloadBtn"
btnNode.className = "btn btn-primary"
btnNode.innerText = "Download Image"
document.getElementById("dtlContainer").insertAdjacentElement("beforeend",btnNode);

const downloadBtn = document.getElementById("downloadBtn")

downloadBtn.addEventListener("click",function(){
	const dpImg = document.getElementById("displayedImage")
	let imagePath = dpImg.getAttribute("src")
	let fileName = getFileName(imagePath)
	saveAs(imagePath,fileName)
})

const siteLogo = document.getElementById("siteLogo")
siteLogo.addEventListener("click",function(){
	window.open("index.html","_self")
})