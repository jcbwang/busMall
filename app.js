

// //global variables:
var number_of_guesses = 25;

var products_array = [];

var currently_displayed_left_product;
var currently_displayed_middle_product;
var currently_displayed_right_product;

var all_products = document.getElementById('products');

var left_h2 = document.getElementById('left-product-h2');
var middle_h2 = document.getElementById('middle-product-h2');
var right_h2 = document.getElementById('right-product-h2');
var right_img = document.getElementById('right-product-img');
var middle_img = document.getElementById('middle-product-img');
var left_img = document.getElementById('left-product-img');


//Constructor object:

var Product = function(name, url){
  this.name = name;
  this.url = url;
  this.click_counter = 0;

  products_array.push(this);
};

var render_product = function(product, target_img, target_h2){
  target_img.src = product.url;
  target_h2.textContent = product.name;
};
//Event handler, once any of the three images are clicked, new images replace the old ones. A tally is kept on how many times a picture was clicked and how many times it appeared on screen.

//target event

var handle_click_on_product = function(event){
  if(event.target.tagName === 'IMG'){
    console.log(event);
    if(event.target.id==='left-product-img'){
      currently_displayed_left_product.click_counter++;
    } else if(event.target.id === 'middle-product-img'){
      currently_displayed_middle_product.click_counter++;
    }else if (event.target.id === 'right-product-img'){
      currently_displayed_right_product.click_counter++;
    }
    number_of_guesses --;
    var left_product_index = Math.floor(Math.random()*products_array.length);
    var middle_product_index = Math.floor(Math.random()*products_array.length);
    var right_product_index = Math.floor(Math.random()*products_array.length);

    currently_displayed_left_product = products_array[left_product_index];
    currently_displayed_middle_product = products_array[middle_product_index];
    currently_displayed_right_product = products_array[right_product_index];

    render_product(products_array[left_product_index],left_img,left_h2);
    render_product(products_array[middle_product_index],middle_img,middle_h2);
    render_product(products_array[right_product_index],right_img,right_h2);

    if(number_of_guesses <= 0){
      all_products.removeEventListener('click',handle_click_on_product);
    }
  }

};


//init
new Product ('Luggage bags', './img/bag.jpg');
new Product ('Bathroom stand','./img/bathroom.jpg');
new Product ('Banana cutter','./img/banana.jpg');
new Product ('Boots','./img/boots.jpg');
new Product ('Oven','./img/breakfast.jpg');
new Product ('Meatball Gum','./img/bubblegum.jpg');
new Product ('Chair','./img/chair.jpg');
new Product ('Figure','./img/cthulhu.jpg');
new Product ('Dog duck','./img/dog-duck.jpg');
new Product ('Dragon','./img/dragon.jpg');
new Product ('Utensl pen','./img/pen.jpg');
new Product ('Pet sweeper','./img/pet-sweep.jpg');
new Product ('Pizza scissors','./img/scissors.jpg');
new Product ('Shark snuggle','./img/shark.jpg');
new Product ('Baby sweeper','./img/sweep.png');
new Product ('Snuggly','./img/tauntaun.jpg');
new Product ('Unicorn meat','./img/unicorn.jpg');
new Product ('USB','./img/usb.gif');
new Product ('Watering can','./img/water-can.jpg');
new Product ('Wine glass','./img/wine-glass.jpg');


currently_displayed_left_product = products_array[0];
currently_displayed_middle_product = products_array[2];
currently_displayed_right_product = products_array[3];
all_products.addEventListener('click',handle_click_on_product);


