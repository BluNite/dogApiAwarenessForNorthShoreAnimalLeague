// global variables for time functions
let timer;
let deletePhotoPause;

// fetch function (async)

async function startFetch() {
	//try 
	try {
		// await creates asynchronous action fetch resolves its promise once resolved
		const response = await fetch("https://dog.ceo/api/breeds/list/all")
		//parse into json format so readable
		const data = await response.json();
		//  function takes data and property message
		getBreedList(data.message)
	}
	//catch for error (e) for older browsers
	catch (e) {

		console.log("error! Breed List not fetched")
	};
};
//call start function here
startFetch();

// takes data and creates drop down of dogs info
//object function .keys to get properties in object / use map to dynamically create new options and use join to separate 
//template literals to get html 
//object function takes keys method parameter then map function to cover entire array creates select element with option element to list different breeds
// join method to separate commas between strings/arrays returns list of breeds for selection 
f


function getBreedList(breedList) {
	// dynamically create html to be rendered 
	document.getElementById("breed").innerHTML = `
	<select onchange="loadByBreed(this.value)">
	<option>Choose A Dog Breed</option>

${Object.keys(breedList).map(function (breed) {
		//in  backticks
		return `<option>${breed}</option>`
		// convert the array into one single line of text
	}).join('')}
	
	</select> `
}
//async function to load breed array
async function loadByBreed(breed) {
	// condition set to disable choose a dog breed choice

	if (breed != "Choose A Dog Breed") {
		// response  is await  fetch function to get breed images array

		const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
		//await response parsed as json
		const data = await response.json()
		//function takes 2 arguments data and message from api object
		createSlideShow(data.message)
	};

}
// function for images to appear
function createSlideShow(images) {
	//get the length of images 
	console.log(images.length)
	// counter for current position of image array
	let currentPosition = 0;
	clearInterval(timer)
	clearTimeout(deletePhotoPause)



	// get slideshow element / innerhtml is slide element/ use back ticks to dynamically render images to url 2 photos loaded to transition
	document.getElementById('slideShow').innerHTML =
		//template literals surround div elements use backticks for url/ images argument for two photos for loading
		` <div class="slide" style=" background-image: url('${images[0]}'); "id="slide"></div> 

			<div class="slide" style="background-image: url('${images[1]}'); "id="slide"></div> `
	currentPosition += 2

	// set interval timer next image function every 5 seconds
	timer = setInterval(nextSlide, 2500);


	if (images.length == 2) currentPosition = 0

	else {
		document.getElementById('slideShow').innerHTML =

			` <div class="slide" style=" background-image: url(${images[0]}); "id="slide"></div> 

			<div class="slide" </div> `

		currentPosition++;
	}

	//function to change to next slide 
	function nextSlide() {
		// insert adjacent HTML to add 
		document.getElementById("slideShow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}'); "id="slideShow"></div>`)
		deletePhotoPause = setTimeout(function () {
			document.querySelector(".slide").remove();

		}, 1000)
		//when only one image left in a collection set currentPosition to = 0 or add one 
		if (currentPosition + 1 >= images.length) {
			currentPosition = 0
		} else {
			currentPosition++;
		}



	}

}

