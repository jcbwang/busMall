

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

  //pick random index out of left, middle, or right array

  var left_product_index = Math.floor(Math.random()*left_items.length);
  currently_displayed_left_product = left_items[left_product_index];
  currently_displayed_left_product.display_counter++;
  render_product(left_items[left_product_index],left_img,left_h2);


  var middle_product_index = Math.floor(Math.random()*middle_items.length);
  currently_displayed_middle_product = middle_items[middle_product_index];
  currently_displayed_middle_product.display_counter++;
  render_product(middle_items[middle_product_index],middle_img,middle_h2);

  var right_product_index = Math.floor(Math.random()*right_items.length);
  currently_displayed_right_product = right_items[right_product_index];
  currently_displayed_right_product.display_counter++;
  render_product(right_items[right_product_index],right_img,right_h2);
};


//display results

var display_results = function(){
  var target = document.getElementById('results');
  var ul_el = document.createElement('ul');
  ul_el.id = 'results-ul';

  for(var k = 0; k < left_items.length; k++){
    var li_el = document.createElement('li');
    li_el.textContent = `${left_items[k].name}: ${left_items[k].click_counter}/${left_items[k].display_counter}`;
    ul_el.appendChild(li_el);
  }
  for(var l = 0; l < middle_items.length; l++){
    li_el = document.createElement('li');
    li_el.textContent = `${middle_items[l].name}: ${middle_items[l].click_counter}/${middle_items[l].display_counter}`;
    ul_el.appendChild(li_el);
  }

  for(var m = 0; m < right_items.length; m++){
    li_el = document.createElement('li');
    li_el.textContent = `${right_items[m].name}: ${right_items[m].click_counter}/${right_items[m].display_counter}`;
    ul_el.appendChild(li_el);
  }
  target.appendChild(ul_el);
};

//render product_chart function

var product_click_results = [];

var render_product_chart = function(){

  var ctx = document.getElementById("myChart").getContext('2d');

  for(var i = 0; i < left_items.length; i++){
    product_click_results.push(left_items[i].click_counter);
  }
  for(var j = 0; j < middle_items.length; j++){
    product_click_results.push(middle_items[j].click_counter);
  }
  for(var k = 0; k < right_items.length; k++){
    product_click_results.push(right_items[k].click_counter);
  }
  render_chart(product_click_results,ctx);
};


var render_chart = function(data,ctx){
  var myChart = new Chart(ctx,{
    type: 'bar',
    data: {
      labels: ['bag','bathroom','banana','boots','breakfast','bubblegum','chair','figure','duck','dragon','pen','pet sweeper','scissors','shark','baby','snuggly','unicorn','USB','water can','wine glass']
      ,
      datasets: [{
        label: 'Product Vote Results',
        data: product_click_results ,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)'
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
            fontColor:'white',
            beginAtZero:true,
            callback: function (value) { if (Number.isInteger(value)) { return value; } },
          }
        }],
        xAxes:[{
          ticks:{
            fontColor:'white',
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
    render_click_countdown();


    if(NUMBER_OF_GUESSES <= 0){
      all_products.removeEventListener('click',handle_click_on_product);
      all_products.removeEventListener('mousedown',handle_color);

      render_product_chart();
      remove_click_counter();
      display_results();

      var stringy_left_items = JSON.stringify(left_items); //transform products array into string
      localStorage.setItem('left_items', stringy_left_items); // store stringy products into local storage
      console.log('products array saved into local storage');
      var stringy_middle_items = JSON.stringify(middle_items);
      localStorage.setItem('middle_items', stringy_middle_items);
      var stringy_right_items = JSON.stringify(right_items);
      localStorage.setItem('right_items',stringy_right_items);
    }
  }
};

var click_countdown_target = document.getElementById('vote-counter');

var render_click_countdown = function(){
  click_countdown_target.textContent = `${NUMBER_OF_GUESSES} votes left`;
};

var remove_click_counter = function(){
  click_countdown_target.innerHTML='';
};

var handle_color = function(event){
  if(event.target.tagName === 'IMG'){
    if(event.target.id==='left-product-img'){
      document.getElementById('left-product-img').style.border = 'dotted 10px yellow';
    }if(event.target.id==='middle-product-img'){
      document.getElementById('middle-product-img').style.border = 'dotted 10px yellow';
    }if(event.target.id==='right-product-img'){
      document.getElementById('right-product-img').style.border = 'dotted 10px yellow';
    }
  }
};

var white_color = function(event){
  if(event.target.tagName === 'IMG'){
    if(event.target.id==='left-product-img'){
      document.getElementById('left-product-img').style.border = 'dotted 5px white';
    }if(event.target.id==='middle-product-img'){
      document.getElementById('middle-product-img').style.border = 'dotted 5px white';
    }if(event.target.id==='right-product-img'){
      document.getElementById('right-product-img').style.border = 'dotted 5px white';
    }
  }
};


//check if products array exists in local storage, if not, create new products.

if (localStorage.getItem('left_items')){
  var stringy_left_products = localStorage.getItem('left_items');
  left_items = JSON.parse(stringy_left_products);}
if(localStorage.getItem('middle_items')){
  var stringy_middle_products = localStorage.getItem('middle_items');
  middle_items = JSON.parse(stringy_middle_products);}
if(localStorage.getItem('right_items')){
  var stringy_right_products = localStorage.getItem('right_items');
  right_items = JSON.parse(stringy_right_products);}

else{
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
  
  //create three new arrays for left middle and right so no items repeat.
  var left_items = products_array.splice(0,7);
  var middle_items = products_array.splice(0,7);
  var right_items = products_array.splice(0,6);
}

pick_new_products();



//render results
all_products.addEventListener('click',handle_click_on_product);

all_products.addEventListener('mousedown',handle_color);

all_products.addEventListener('mouseup',white_color);





