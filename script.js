var hex1 = randomHex();
var hex2 = randomHex();
var hex3 = randomHex();
var degrees = false;
var gradientStyle = "linear-gradient";
var direction = "to right";
var prefixDirect = "left";
var box = 1;
var percent_square_1 = document.querySelector("#percent-square-1");
var percent_square_2 = document.querySelector("#percent-square-2");
var percent_range_1 = document.querySelector("#percent-range-1").value;
var percent_range_2 = document.querySelector("#percent-range-2").value;
var degree_square_1 = document.querySelector("#color-square-1");
var degree_square_2 = document.querySelector("#color-square-2");
var degree_square_3 = document.querySelector("#color-square-3");
var degree_range_1 = document.querySelector("#degree-range-1").value;
var degree_range_2 = document.querySelector("#degree-range-2").value;
var degree_range_3 = document.querySelector("#degree-range-3").value;
var gradient = document.querySelector(".gradient");
const sides = document.querySelectorAll(".side");
const translateAmount = 100; 
let translate = 0;

// LOAD RANDOM COLORS
window.onload = function exampleFunction() {
  h1 = document.querySelectorAll(".hex1");
  h1.forEach(i => i.value = hex1)
  h2 = document.querySelectorAll(".hex2");
  h2.forEach(i => i.value = hex2)
  document.querySelector(".hex3").value = hex3;

  percent_square_1.style.background = hex1;
  percent_square_2.style.background = hex2;

  degree_square_1.style.background = hex1;
  degree_square_2.style.background = hex2;
  degree_square_3.style.background = hex3;
  
  document.querySelector(".gradient").style.background = `${hex1}`;
  document.querySelector(".gradient").style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  document.querySelector(".gradient").style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  document.querySelector(".gradient").style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
}

// LINEAR SELECTOR BTN
document.querySelector(".linearBtn").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeStyleActive();
  document.querySelector(".circle").style.opacity = 0;
  document.querySelector(".linearBtn").className += " styleActive";
  if(direction === "ellipse at center"){
    removeActive();
    direction = "to right";
    prefixDirect = "left";
    document.querySelector(".left").className += " active";
  }
  gradientStyle = "linear-gradient";
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
})

// RADIAL SELECTOR BTN 
document.querySelector(".radialBtn").addEventListener("click", () => {
  removeStyleActive();
  document.querySelector(".circle").style.opacity = 1;
  document.querySelector(".radialBtn").className += " styleActive";    
  gradientStyle = "radial-gradient";
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
})

// SWITCH FROM ONE SIDE TO THE NEXT ( SELECTS DEGREES AUTOMATICALLY)
slide = (direction) => {
  if(direction === "next"){
    degrees = true;
    removeStyleActive();
    document.querySelector(".degreesBtn").className += " styleActive";
    translate -= translateAmount
    degreesActivate();
  }else{
    degrees = false;
    translate += translateAmount
    removeStyleActive();
    if(gradientStyle === "linear-gradient"){
      linearRadianActivate()
      document.querySelector(".linearBtn").className += " styleActive";
    }else{
      linearRadianActivate()
      document.querySelector(".radialBtn").className += " styleActive";
    }
  }
  sides.forEach(
    sides => (sides.style.transform = `translateX(${translate}%)`)
  );
}

// FUNCTION TO ACTIVATE THE LINEAR OR RADIAL GRADIENT 
function linearRadianActivate(){
  if(document.querySelector(".circle").className.includes('active')){
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  } else{
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
}
 
// FUNCTION TO ACTIVATE THE DEGREES GRADIENT 
function degreesActivate(){
  gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
}

// EVENT FOR COLOR SELECTION
h1 = document.querySelectorAll(".hex1");
h1.forEach(i => i.addEventListener("input", updateHex1, false));

h2 = document.querySelectorAll(".hex2");
h2.forEach(i => i.addEventListener("input", updateHex2, false));

document.querySelector(".hex3").addEventListener("input", updateHex3, false);

// UPDATE HEX1 VARIABLE COLOR IN REAL TIME
function updateHex1(event){
  if(gradient.style.background === `${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to right, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0% `  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom right, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
     if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top right, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(center top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(center top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(center bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(center bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top left, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom left, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }else if(gradient.style.background === `${gradientStyle}(to left, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`){
    if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to left, ${hex1}, ${hex2})`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else 
  {
     if(!degrees){
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `${gradientStyle}(at center center, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
    }else{
      hex1 = event.target.value;
      h1 = document.querySelectorAll(".hex1");
      h1.forEach(i => i.value = hex1)
      percent_square_1.style.background = hex1;
      degree_square_1.style.background = hex1;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
 }
}

// UPDATE HEX2 VARIABLE COLOR IN REAL TIME
function updateHex2(event){
  if(gradient.style.background === `${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to right, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0% `  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom right, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top right, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(center top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(center top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(center bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(center bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to left top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to top left, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else if(gradient.style.background === `${gradientStyle}(to left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to left bottom, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right top, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
   gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to bottom left, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }else if(gradient.style.background === `${gradientStyle}(to left, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `-webkit-${gradientStyle}(right center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` ||
  gradient.style.background === `rgba(0, 0, 0, 0) ${gradientStyle}(to right, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b})) repeat scroll 0% 0%`  ||
  gradient.style.background === `rgba(0, 0, 0, 0) -moz-${gradientStyle}(right center, rgb(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}), rgb(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}))` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`){
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
      gradient.style.background = `${gradientStyle}(to left, ${hex1}, ${hex2})`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
  }
  else 
  {
    if(!degrees){
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `${gradientStyle}(at center center, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
    }else{
      hex2 = event.target.value;
      h2 = document.querySelectorAll(".hex2");
      h2.forEach(i => i.value = hex2)
      percent_square_2.style.background = hex2;
      degree_square_2.style.background = hex2;
      gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    }
    
  }
}

// UPDATE HEX3 VARIABLE COLOR IN REAL TIME
function updateHex3(event){
  if(gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)` || 
  gradient.style.background === `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%) repeat scroll 0% 0%, linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%) repeat scroll 0% 0%, rgba(0, 0, 0, 0) linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%) repeat scroll 0% 0%`)
  {
    hex3 = event.target.value;
    document.querySelector(".hex3").value = hex3;
    degree_square_3.style.background = hex3;
    gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
    
  }
}

// HEX1 & HEX2 EVENTS TO SWITCH COLOR INPUT BOXES
document.querySelector(".hex1").addEventListener("click", () => {
  box = 1;
  document.querySelector(".hex2").style.border = "none";
  document.querySelector(".hex1").style.border = "2px solid lightgray";
})

document.querySelector(".hex2").addEventListener("click", () => {
  box = 2;
  document.querySelector(".hex1").style.border = "none";
  document.querySelector(".hex2").style.border = "2px solid lightgray";
})


// RANDOM GRADIENT GENERATOR BTN
document.querySelector("#randomGradientBtn").addEventListener("click", () => {
  document.querySelector(".hex1").value = randomHex();
  document.querySelector(".hex2").value = randomHex();
  document.querySelector(".hex3").value = randomHex();

  hex1 = document.querySelector(".hex1").value;
  hex2 = document.querySelector(".hex2").value;
  hex3 = document.querySelector(".hex3").value;

  h1 = document.querySelectorAll(".hex1");
  h1.forEach(i => i.value = hex1)
  h2 = document.querySelectorAll(".hex2");
  h2.forEach(i => i.value = hex2)
  document.querySelector(".hex3").value = hex3;

  percent_square_1.style.background = hex1;
  percent_square_2.style.background = hex2;

  degree_square_1.style.background = hex1;
  degree_square_2.style.background = hex2;
  degree_square_3.style.background = hex3;

  if(document.querySelector(".circle").className.includes('active')){
      gradient.style.background = `${hex1}`;
      gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
      gradient.style.background = `${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  } else{
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// RANDOM DEGREES GRADIENT GENERATOR BTN
document.querySelector("#randomDegreesGradientBtn").addEventListener("click", () => {
  document.querySelector(".hex1").value = randomHex();
  document.querySelector(".hex2").value = randomHex();
  document.querySelector(".hex3").value = randomHex();

  hex1 = document.querySelector(".hex1").value;
  hex2 = document.querySelector(".hex2").value;
  hex3 = document.querySelector(".hex3").value;

  h1 = document.querySelectorAll(".hex1");
  h1.forEach(i => i.value = hex1)
  h2 = document.querySelectorAll(".hex2");
  h2.forEach(i => i.value = hex2)
  document.querySelector(".hex3").value = hex3;

  percent_square_1.style.background = hex1;
  percent_square_2.style.background = hex2;

  degree_square_1.style.background = hex1;
  degree_square_2.style.background = hex2;
  degree_square_3.style.background = hex3;

  gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
})

// LEFT ARROW BUTTON
document.querySelector(".left").addEventListener("click", (event) => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".left").className += " active";

  if(box === 1){
    direction = "to right";
    prefixDirect = "left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to left";
    prefixDirect = "right";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  } 
})

// UPPER LEFT ARROW BUTTON
document.querySelector(".upperLeft").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".upperLeft").className += " active";

  if(box === 1){
    direction = "to bottom right";
    prefixDirect = "top left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to top left";
    prefixDirect = "bottom right";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  } 
})

// LOWER LEFT ARROW BUTTON
document.querySelector(".lowerLeft").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".lowerLeft").className += " active";
  
  if(box === 1){
    direction = "to top right";
    prefixDirect = "bottom left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to bottom left";
    prefixDirect = "top right";
    gradient.style.background = `${hex1}`;
     gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// UP ARROW BUTTON
document.querySelector(".up").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".up").className += " active";

  if(box === 1){
    direction = "to bottom";
    prefixDirect = "top";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to top";
    prefixDirect = "bottom";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// DOWN ARROW BUTTON
document.querySelector(".down").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".down").className += " active";
  
  if(box === 1){
    direction = "to top";
    prefixDirect = "bottom";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to bottom";
    prefixDirect = "top";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// LOWER RIGHT CORNER ARROW BUTTON
document.querySelector(".lowerRight").addEventListener("click", (event) => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".lowerRight").className += " active";
  
  if(box === 1){
    direction = "to top left";
    prefixDirect = "bottom right";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to bottom right";
    prefixDirect = "top left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// UPPER RIGHT CORNER ARROW BUTTON
document.querySelector(".upperRight").addEventListener("click", (event) => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".upperRight").className += " active";
  
  if(box === 1){
    direction = "to bottom left";
    prefixDirect = "top right";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to top right";
    prefixDirect = "bottom left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// RIGHT ARROW BUTTON
document.querySelector(".right").addEventListener("click", (event) => {
  if(document.querySelector(".circle").className.includes('active'))
    $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".right").className += " active";
  
  if(box === 1){
    direction = "to left";
    prefixDirect = "right";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
  else{
    direction = "to right";
    prefixDirect = "left";
    gradient.style.background = `${hex1}`;
    gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2})`;
    gradient.style.background = `${gradientStyle}(${direction}, ${hex1}, ${hex2})`;
  }
})

// CIRCLE BUTTON
document.querySelector(".circle").addEventListener("click", (event) => {
  $(".percent").slideToggle("500", "linear");
  removeActive();
  document.querySelector(".circle").className += " active";

  direction = "ellipse at center";
  prefixDirect = "center";
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
})

// COPY HEX CODE TO CLIPBOARD
document.querySelector("#getHexBtn").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active')){
    const hex = `background: ${hex1};\nbackground: -webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%);\nbackground: -moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%);\nbackground: ${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%);`;
    navigator.clipboard.writeText(hex);
  } else {
    const hex = `background: ${hex1};\nbackground: -webkit-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2});\nbackground: -moz-${gradientStyle}(${prefixDirect}, ${hex1}, ${hex2});\nbackground: ${gradientStyle}(${direction}, ${hex1}, ${hex2});`;
    navigator.clipboard.writeText(hex);
  }
  
})

// COPY RGBA CODE TO CLIPBOARD
document.querySelector("#getRgbaBtn").addEventListener("click", () => {
  if(document.querySelector(".circle").className.includes('active')){
    const rgba = `background: rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0);\nbackground: -webkit-${gradientStyle}(${prefixDirect}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0) ${percent_range_1}%, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0) ${percent_range_2}%);\nbackground: -moz-${gradientStyle}(${prefixDirect}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0) ${percent_range_1}%, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0) ${percent_range_2}%);\nbackground: ${gradientStyle}(${direction}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0) ${percent_range_1}%, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0) ${percent_range_2}%);`;
    navigator.clipboard.writeText(rgba);
  }else{
    const rgba = `background: rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0);\nbackground: -webkit-${gradientStyle}(${prefixDirect}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0));\nbackground: -moz-${gradientStyle}(${prefixDirect}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0));\nbackground: ${gradientStyle}(${direction}, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 1.0), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 1.0));`;
    navigator.clipboard.writeText(rgba);
  }
})

// COPY DEGREES RGBA CODE TO CLIPBOARD
document.querySelector("#getDegreesRgbaBtn").addEventListener("click", () => {
    const rgba = `background: linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%),\n linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%),\n linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%);`;
  navigator.clipboard.writeText(rgba);
})

// REMOVE ACTIVE CLASS FROM ARROW
function removeActive(){
  var current = document.querySelectorAll(".active");
  current[0].className = current[0].className.replace(" active", "");
}

function removeStyleActive(){
  var current = document.querySelectorAll(".styleActive");
  current[0].className = current[0].className.replace(" styleActive", "");
}

// RANDOM HEX NUMBER GENERATOR
function randomHex(){
  var hex_numbers = ["0","1","2","3","4","5","6","7","8","9","A", "B", "C", "D", "E", "F"];
  var hexcode = "";
  var random_index = 0;
  
  for(let i = 0; i < 6;i++){
    random_index = Math.floor(Math.random() * hex_numbers.length);
      hexcode += hex_numbers[random_index];
  }
  return "#" + hexcode;
}

// HEX TO RGB CONVERTER
function hex_to_RGB(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

function percentRange1(){
  percent_range_1 = document.querySelector("#percent-range-1").value;
  document.querySelector("#color-square-1-per").textContent = percent_range_1 + "%";
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
};

function percentRange2(){
  percent_range_2 = document.querySelector("#percent-range-2").value;
  document.querySelector("#color-square-2-per").textContent = percent_range_2 + "%";
  gradient.style.background = `${hex1}`;
  gradient.style.background = `-webkit-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `-moz-${gradientStyle}(${prefixDirect}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
  gradient.style.background = `${gradientStyle}(${direction}, ${hex1} ${percent_range_1}%, ${hex2} ${percent_range_2}%)`;
};

function degreeRange1(){
  degree_range_1 = document.querySelector("#degree-range-1").value;
  document.querySelector("#color-square-1-deg").textContent = degree_range_1;
  gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
};

function degreeRange2(){
  degree_range_2 = document.querySelector("#degree-range-2").value;
  document.querySelector("#color-square-2-deg").textContent = degree_range_2;
  gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
};

function degreeRange3(){
  degree_range_3 = document.querySelector("#degree-range-3").value;
  document.querySelector("#color-square-3-deg").textContent = degree_range_3;
  gradient.style.background = `linear-gradient(${degree_range_1}deg, rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0.9), rgba(${hex_to_RGB(hex1).r}, ${hex_to_RGB(hex1).g}, ${hex_to_RGB(hex1).b}, 0) 70.71%), linear-gradient(${degree_range_2}deg, rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0.9), rgba(${hex_to_RGB(hex2).r}, ${hex_to_RGB(hex2).g}, ${hex_to_RGB(hex2).b}, 0) 70.71%), linear-gradient(${degree_range_3}deg, rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0.9), rgba(${hex_to_RGB(hex3).r}, ${hex_to_RGB(hex3).g}, ${hex_to_RGB(hex3).b}, 0) 70.71%)`;
};

$(".percent").hide();

const menu_toggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

menu_toggle.addEventListener("click", () => {
  menu_toggle.classList.toggle("is-active")
  sidebar.classList.toggle("is-active")
})