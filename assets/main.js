// global variables for time functions

let timer
let deleteFirstPhotoDelay





// async before function 


async function start() {
	//try 
	try {

		//await creates asynchronous action fetch resolves its promise once resolved
		const response = await fetch("https://dog.ceo/api/breeds/list/all")
		//parse into json format so readable
		const data = await response.json();
		//  
		createBreedList(data.message)




	}
	//catch for error (e) for older browsers
	catch (e) {

		console.log("error! Breed List not fetched")


	}



	//await creates asynchronous action fetch resolves its promise once resolved
	const response = await fetch("https://dog.ceo/api/breeds/list/all")
	//parse into json format so readable
	const data = await response.json();
	createBreedList(data.message)


}
//call start function here
start();

// takes data and creates drop down of dogs info
//object function .keys to get properties in object / use map to dynamically create new options and use join to separate 
//template literals to get html 
function createBreedList(breedList) {

	document.getElementById("breed").innerHTML = `
	<select onchange="loadByBreed(this.value)">
	<option>choose a dog breed</option>
	
${Object.keys(breedList).map(function (breed) {
		return `<option>${breed}</option>`
	}).join('')}
	</select>
`}
//async function to load breed objects
async function loadByBreed(breed) {
	// condition set to disable choose a dog breed choice

	if (breed != "choose a dog breed") {
		// response  is await  fetch function to get breed images objects

		const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
		//await response parsed as json
		const data = await response.json()
		//function takes 2 arguments data and message from api object
		createSlideShow(data.message)

	}

}
// function for images to appear
function createSlideShow(images) {
	//get the length of images 
	console.log(images.length)
	// counter for current position of image array
	let currentPosition = 0;



	//  if more than one image increase current image counter by 2
	if (images.length > 1) {

		// get slideshow element / innerhtml is slide element/ use back ticks to dynamically render images to url 2 photos loaded to transition
		document.getElementById('slideShow').innerHTML =

			` <div class="slide" style=" background-image: url(${images[0]}); "id="slide"></div> 

			<div class="slide" style="background-image: url(${images[1]}); "id="slide"></div> `
		currentPosition += 2

		// set interval timer next image function every 5 seconds
		timer = setInterval(nextSlide, 5000);







	}

	if (images.length == 2) currentPosition = 0




	else {
		document.getElementById('slideShow').innerHTML =

			` <div class="slide" style=" background-image: url(${images[0]}); "id="slide"></div> 

			<div class="slide" </div> `



		currentPosition++;



	}
	function nextSlide() {
		document.getElementById("slideShow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url(${images[currentPosition]}); "id="slide"></div>`)
		setTimeout(function () {
			document.querySelector(".slide").remove()

		}, 1000)
		if (currentPosition + 1 >= images.length) {
			currentPosition = 0
		} else {
			currentPosition++;
		}



	}

}

