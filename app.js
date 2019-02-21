

// //global variables:
var NUMBER_OF_GUESSES = 25;

var products_array = [];

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

var pick_new_products = function(){
  //create three new arrays for left middle and right so no items repeat.
  // var left_items = products_array.splice(0,7);
  // var middle_items = products_array.splice(0,7);
  // var right_items = products_array.splice(0,6);

  console.log(left_items);
  console.log(middle_items);
  console.log(right_items);

  //pick random index out of left, middle, or right array

  var left_product_index = Math.floor(Math.random()*left_items.length);
  currently_displayed_left_product = left_items[left_product_index];
  currently_displayed_left_product.display_counter++;
  render_product(left_items[left_product_index],left_img,left_h2);


  var middle_product_index = Math.floor(Math.random()*middle_items.length);
  currently_displayed_middle_product = middle_items[middle_product_index];
  currently_displayed_middle_product.display_counter++;
  render_product(middle_items[middle_product_index],middle_img,middle_h2);

  var right_product_index = Math.floor(Math.random()*right_items.length);currently_displayed_right_product = right_items[right_product_index];
  currently_displayed_right_product.display_counter++;
  render_product(right_items[right_product_index],right_img,right_h2);
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
  }
  target.appendChild(ul_el);
};

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
    }
  }
};

//check if products array exists in local storage, if not, create new products.

if (localStorage.getItem('products_array')){
  var stringy_products = localStorage.getItem('products_array');
  products_array = JSON.parse(stringy_products);
  var left_items = products_array.splice(0,7);
  var middle_items = products_array.splice(0,7);
  var right_items = products_array.splice(0,6);
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
  left_items = products_array.splice(0,7);
  middle_items = products_array.splice(0,7);
  right_items = products_array.splice(0,6);
}

pick_new_products();



//render results
all_products.addEventListener('click',handle_click_on_product);

console.log(products_array);

