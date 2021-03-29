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

async function fetch_from_url(url){
	const response = await fetch(url)
	if(response.ok){
		const response_json = await response.json()
		console.log(response_json)
		return response_json
	}else
		console.log(response.status);
}

function loadUserData(data){
	const displayedImage = document.createElement("img"); 
	displayedImage.src = data.profile_image.large
	displayedImage.id = "displayedImage"
	displayedImage.style = "width:100%; position: relative;display: block"
	document.getElementById("resultDtlUser").insertAdjacentElement("beforeend",displayedImage);

	const displayedUserDtl = [];
	if (data.first_name !== null || data.last_name !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "usersFullName"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		let name = ""
		if (data.first_name !== null)
			name += capitalizeFirstLetter(data.first_name)
		if (name !== "") 
			name += " "
		if (data.last_name !== null) 
			name += capitalizeFirstLetter(data.last_name)
		descNode = insertInnerNode("Name",name)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("usersFullName").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.total_photos !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "totalPhotos"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		descNode = insertInnerNode("Total photos",data.total_photos)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("totalPhotos").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.location !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "userLoc"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		descNode = insertInnerNode("Location",data.location)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("userLoc").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.twitter_username !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "twitterUsername"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		descNode = insertInnerNode("Twitter",data.twitter_username)
		descNode[2].style.textDecoration = "underline";
		descNode[2].addEventListener("click",function(){
			window.open("https://twitter.com/"+data.twitter_username)
		})
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("twitterUsername").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.instagram_username !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "igUsername"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		descNode = insertInnerNode("Instagram",data.instagram_username)
		descNode[2].style.textDecoration = "underline";
		descNode[2].addEventListener("click",function(){
			window.open("https://www.instagram.com/"+data.instagram_username)
		})
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("igUsername").insertAdjacentElement("beforeend",descNode[i])
		}
	}if (data.tags !== null) {
		displayedUserDtl[0] = document.createElement("tr")
		displayedUserDtl[0].id = "userTags"
		document.getElementById("dtlUserInfo").insertAdjacentElement("beforeend",displayedUserDtl[0]);
		let tagList = ""
		for (let i = 0; i < data.tags.aggregated.length; i++) {
			tagList += data.tags.aggregated[i].title
			if (i<data.tags.aggregated.length-1) {
				tagList += ", "
			}
		}
		descNode = insertInnerNode("Tags",tagList)
		for (let i = 0; i < descNode.length; i++) {
			document.getElementById("userTags").insertAdjacentElement("beforeend",descNode[i])
		}
	}
}

window.onload = function(){
	let userName = localStorage.getItem("dtlUsername")
	let clientId = "EBUQJ1ongbANwTfQ5sWNKXqLtY5jm_KDumF9uABj-20";
	const url = "https://api.unsplash.com/users/"+userName+"/?client_id="+clientId;
	fetch_from_url(url).then(data=>{
		loadUserData(data)
	})
}

const siteLogo = document.getElementById("siteLogo")
siteLogo.addEventListener("click",function(){
	window.open("index.html","_self")
})