window.onload = function(){
	var searchKey = document.getElementById("searchedKeyword");
	if(searchKey !== null){
		searchKey.addEventListener("keydown",function(event){
			if(event.key == "Enter"){
				searchPhotos(1);
			}
		})
	}
	if(document.getElementsByClassName("searchBtn").length > 0){
		document.getElementsByClassName("searchBtn")[0].addEventListener("click",function(){
			searchPhotos(1)
		});
	}
}

var response_id = [];

function openImageDetailsPage(data,imgId){
	localStorage.setItem("dtlImgData",JSON.stringify(data))
	localStorage.setItem("dtlImgId",imgId)
	var dtlWindow = window.open("img_details.html","_self");
}

function createImageArray(data){
	const imageNodes = [];
	const cardNodes = [];
	const titleNodes = [];
	for(let i=0;i<data.results.length;i++){
		response_id[i] = data.results[i].id
		cardNodes[i] = document.createElement("div");
		cardNodes[i].className = "resCard";
		cardNodes[i].id="resultCard"+i;
		imageNodes[i] = document.createElement("div");
		imageNodes[i].className = "resImg";
		imageNodes[i].value = i
		imageNodes[i].style.display = "none";
		imageNodes[i].style.backgroundImage = "url("+data.results[i].urls.raw+")";
		imageNodes[i].addEventListener("click",function(){
			openImageDetailsPage(data,i)
		})
		imageNodes[i].style.display = "block";
		titleNodes[i] = document.createElement("div");
		titleNodes[i].className = "resUser"
		titleNodes[i].innerText = "Uploaded by : "+data.results[i].user.name;
		document.getElementById("result").insertAdjacentElement("beforeend",cardNodes[i]);
		document.getElementById("resultCard"+i).insertAdjacentElement("beforeend",imageNodes[i]);
		document.getElementById("resultCard"+i).insertAdjacentElement("beforeend",titleNodes[i]);
	}
}

function clearElement(){
	let i = 0;
	let list = document.getElementById("result");
	while(i < list.childNodes.length)
	{
		list.removeChild(list.childNodes[i]);
	}
	i = 0;
	list = document.getElementById("resCountField");
	while(i < list.childNodes.length)
	{
		list.removeChild(list.childNodes[i]);
	}
	i = 0;
	list = document.getElementById("pagination");
	while(i < list.childNodes.length)
	{
		list.removeChild(list.childNodes[i]);
	}
}

function createPagination(num_of_page,curr_page,dataLength){
	nodes =[]
	nodes[0] = document.createElement("div");
	nodes[0].className = "text-lg-left"
	nodes[0].innerText = "Showing results "+(((curr_page-1)*dataLength)+1)+" - "+ ((curr_page*dataLength)) +" from "+((15*num_of_page))+" results";
	document.getElementById("resCountField").insertAdjacentElement("beforeend",nodes[0]);
	nodes =[]
	if (curr_page>2) {
		nodes[0] = document.createElement("a");
		nodes[0].value=1
		nodes[0].innerText="\u00AB"
		nodes[0].onclick=function(){searchPhotos(this.value); return false;}
		document.getElementById("pagination").insertAdjacentElement("beforeend",nodes[0]);
	}if (curr_page>1) {
		nodes[0] = document.createElement("a");
		nodes[0].value=curr_page-1
		nodes[0].innerText="\u2039"
		nodes[0].onclick=function(){searchPhotos(this.value); return false;}
		document.getElementById("pagination").insertAdjacentElement("beforeend",nodes[0]);
	}
	for (var i = curr_page-3; i <= curr_page+3; i++) {
		if (i<1) {
			i=1
		}else if (i>num_of_page) {
			break;
		}
		nodes[i] = document.createElement("a");
		nodes[i].value = i
		if (i===curr_page) {
			nodes[i].className="active"
		}else{
			nodes[i].onclick=function(){searchPhotos(this.value); return false;}
		}
		
		nodes[i].innerText=i
		document.getElementById("pagination").insertAdjacentElement("beforeend",nodes[i]);
	}
	if (curr_page<num_of_page) {
		nodes[0] = document.createElement("a");
		nodes[0].value=curr_page+1
		nodes[0].innerText="\u203A"
		nodes[0].onclick=function(){searchPhotos(this.value); return false;}
		document.getElementById("pagination").insertAdjacentElement("beforeend",nodes[0]);
	}if (curr_page<num_of_page-1) {
		nodes[0] = document.createElement("a");
		nodes[0].value=num_of_page
		nodes[0].innerText="\u00BB"
		nodes[0].onclick=function(){searchPhotos(this.value); return false;}
		document.getElementById("pagination").insertAdjacentElement("beforeend",nodes[0]);
	}
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

function searchPhotos(page_num){
	clearElement()
	let clientId = "EBUQJ1ongbANwTfQ5sWNKXqLtY5jm_KDumF9uABj-20";
	let searchQuery = document.getElementById("searchedKeyword").value;
	const url = "https://api.unsplash.com/search/photos/?query='"+searchQuery+"'&per_page=15&client_id="+clientId+"&page="+page_num;
	fetch_from_url(url).then(data=>{
		createImageArray(data);
		createPagination(data.total_pages,page_num,data.results.length);
	})
}


