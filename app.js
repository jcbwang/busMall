

// //global variables:
var NUMBER_OF_GUESSES = 5;

var products_array = [];

var results_array = [];

var all_products = document.getElementById('product-container');

var left_h2 = document.getElementById('left-product-h2');
var middle_h2 = document.getElementById('middle-product-h2');
var right_h2 = document.getElementById('right-product-h2');
var right_img = document.getElementById('right-product-img');
var middle_img = document.getElementById('middle-product-img');
var left_img = document.getElementById('left-product-img');

var currently_displayed_left_product;
var currently_displayed_middle_product;
var currently_displayed_right_product;


//Constructor object:

var Product = function(name, url){
  this.name = name;
  this.url = url;
  this.click_counter = 0;
  this.display_counter = 0;

  products_array.push(this);
};

//render product
var render_product = function(product, target_img, target_h2){
  target_img.src = product.url;
  target_h2.textContent = product.name;
};

//randomize index of products_array, assign it to the currently_displayed product, increment display counter, and render product.
var pick_new_products = function(){
  var left_product_index = Math.floor(Math.random()*products_array.length);
  currently_displayed_left_product = products_array[left_product_index];
  currently_displayed_left_product.display_counter++;
  render_product(products_array[left_product_index],left_img,left_h2);

  var middle_product_index = Math.floor(Math.random()*products_array.length);
  currently_displayed_middle_product = products_array[middle_product_index];
  currently_displayed_middle_product.display_counter++;
  render_product(products_array[middle_product_index],middle_img,middle_h2);

  var right_product_index = Math.floor(Math.random()*products_array.length);currently_displayed_right_product = products_array[right_product_index];
  currently_displayed_right_product.display_counter++;
  render_product(products_array[right_product_index],right_img,right_h2);
};

//display results
var display_results = function(){
  var target = document.getElementById('results');
  var ul_el = document.createElement('ul');
  ul_el.id = 'results-ul';

  for(var k = 0; k < products_array.length; k++){
    var li_el = document.createElement('li');
    li_el.textContent = `${products_array[k].name}: ${products_array[k].click_counter}/${products_array[k].display_counter}`;
    ul_el.appendChild(li_el);
    results_array.push(li_el.textContent);
  }
  target.appendChild(ul_el);
};


// if(localStorage.getItem('results_array')){
//   var target = document.getElementById('results');
//   var li_el.textContent = 
// }

//render product_chart function

var product_click_results = [];

var render_product_chart = function(){

  var ctx = document.getElementById("myChart").getContext('2d');

  for(var i = 0; i < products_array.length; i++){
    product_click_results.push(products_array[i].click_counter);
  }
  render_chart(product_click_results,ctx);
};

var render_chart = function(data,ctx){
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['bag','bathroom','banana','boots','breakfast','bubblegum','chair','figure','duck','dragon','pen','pet sweeper','scissors','shark','baby','snuggly','unicorn','USB','water can','wine glass']
      ,
      datasets: [{
        label: 'Product Vote Results',
        data: product_click_results,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};

//Event handler, once any of the three images are clicked, new images replace the old ones. A tally is kept on how many times a picture was clicked and how many times it appeared on screen.

//target event
var handle_click_on_product = function(event){

  if(event.target.tagName === 'IMG'){
    if(event.target.id==='left-product-img'){
      currently_displayed_left_product.click_counter++;
    } else if(event.target.id === 'middle-product-img'){
      currently_displayed_middle_product.click_counter++;
    }else if (event.target.id === 'right-product-img'){
      currently_displayed_right_product.click_counter++;
    }
    NUMBER_OF_GUESSES --;
    pick_new_products();

    if(NUMBER_OF_GUESSES <= 0){
      all_products.removeEventListener('click',handle_click_on_product);

      render_product_chart();
      display_results();

      var stringy_products = JSON.stringify(products_array); //transform products array into string
      localStorage.setItem('products_array', stringy_products); // store stringy products into local storage
      console.log('products array saved into local storage');

      var stringy_results = JSON.stringify(results_array); //transform results array into string
      localStorage.setItem('results_array', stringy_results); //store stringy results into local storage.
      console.log('results array saved into local storage');
    }
  }
};

//check if products array exists in local storage, if not, create new products.

if (localStorage.getItem('products_array')){
  var stringy_products = localStorage.getItem('products_array');
  products_array = JSON.parse(stringy_products);
  console.log('retrieved products from local storage');
} else{

  new Product ('Luggage bags', './img/bag.jpg');
  new Product ('Bathroom Stand','./img/bathroom.jpg');
  new Product ('Banana Cutter','./img/banana.jpg');
  new Product ('Yellow Boots','./img/boots.jpg');
  new Product ('Breakfast Oven','./img/breakfast.jpg');
  new Product ('Meatball Gum','./img/bubblegum.jpg');
  new Product ('Chair','./img/chair.jpg');
  new Product ('Figure','./img/cthulhu.jpg');
  new Product ('Doggie duck','./img/dog-duck.jpg');
  new Product ('Dragon','./img/dragon.jpg');
  new Product ('Utensl pen','./img/pen.jpg');
  new Product ('Pet Sweeper','./img/pet-sweep.jpg');
  new Product ('Pizza scissors','./img/scissors.jpg');
  new Product ('Shark snuggle','./img/shark.jpg');
  new Product ('Make Baby Clean','./img/sweep.png');
  new Product ('Snuggly','./img/tauntaun.jpg');
  new Product ('Unicorn meat','./img/unicorn.jpg');
  new Product ('USB','./img/usb.gif');
  new Product ('Watering can','./img/water-can.jpg');
  new Product ('Wine Glass','./img/wine-glass.jpg');
}

//check if storage has past results. If it exists, display the past results at the bottom. If not, create new results.


// currently_displayed_left_product = products_array[0];
// currently_displayed_middle_product = products_array[1];
// currently_displayed_right_product = products_array[2];

// render_product(products_array[0],left_img,left_h2);
// render_product(products_array[1],middle_img,middle_h2);
// render_product(products_array[2],right_img,right_h2);

// products_array[0].display_counter= 1;
// products_array[1].display_counter = 1;
// products_array[2].display_counter = 1;


pick_new_products();


//render results
all_products.addEventListener('click',handle_click_on_product);


