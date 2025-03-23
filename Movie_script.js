const movie = document.querySelector('.movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const confirm_btn = document.querySelector('.confirm_btn');
const payment_btn = document.querySelector('.payment_btn');
const amount = document.getElementById('amount');
const close_btn = document.querySelector('.close');
const container = document.querySelector('.container');
const payment_window = document.querySelector('.payment_window');
const success_window = document.querySelector('.payment_success');
const payment_form = document.querySelector('.payment_form');
const pin = document.getElementById('pin');

populateUI();

let ticket_price = parseInt(movie.value);
let seat_count = 0;
let total_price = 0;

// function to update count and total price
function update_count(){
    const selected_seats = document.querySelectorAll('.row .seat.selected');
    seat_count = parseInt(selected_seats.length);
    total_price = seat_count * ticket_price;
    count.innerText = seat_count;
    total.innerText = total_price;
}

// change the price according to selected movie
movie.addEventListener('change', function(event){
    ticket_price = parseInt(event.target.value);
    update_count();
});

// to toggle the selected seats
container.addEventListener('click', function(event){
    if(event.target.classList.contains('seat') && !event.target.classList.contains('occupied')){
        event.target.classList.toggle('selected');
        update_count();
    }
});

// confirm btn to show payment window
confirm_btn.addEventListener('click', function(){
    if(seat_count > 0){
        payment_window.style.display = 'block';
        amount.value = total_price;
    }
});

payment_btn.addEventListener('click', function(){
    if(pin.value){
        payment_form.style.display = 'none';
        success_window.style.display = 'block';

        // set the selected seats to occupied
        const selected_seats = document.querySelectorAll('.row .seat.selected');
        selected_seats.forEach(function(seat){
            seat.classList.add('selected');
        });

        // save the selected seats to local storage
        const seat_index = [...selected_seats].map(function(seat){
            return [...seats].indexOf(seat);
        });
        localStorage.setItem('selected_seats', JSON.stringify(seat_index));
        localStorage.setItem('movieIndex', movie.selectedIndex);

    }else{
        alert('Enter PIN to proceed');
    }
});

close_btn.addEventListener('click', function(){
    location.reload();  
});

function populateUI(){
    const selected_seats = JSON.parse(localStorage.getItem('selected_seats'));
    if(selected_seats !== null && selected_seats.length > 0){
        seats.forEach((seat, index) => {
            if(selected_seats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selected_movie = localStorage.getItem('movieIndex');
    if(selected_movie !== null){
        movie.selectedIndex = selected_movie;
    }   
}