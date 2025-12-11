/* script.js - render cars, wire up form and smooth scroll */

// sample car data (same as your original React sample)
const sampleCars = [
  { brand: 'Toyota', model: 'Camry XSE', year: '2021', price: '$28,500', mileage: '15,000 mi', fuel: 'Hybrid', transmission: 'Automatic', type: 'Sedan', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900', inspected: true },
  { brand: 'Mercedes', model: 'C-Class', year: '2020', price: '$42,000', mileage: '22,000 mi', fuel: 'Petrol', transmission: 'Automatic', type: 'Sedan', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900', inspected: true },
  { brand: 'BMW', model: 'X5', year: '2022', price: '$65,000', mileage: '8,000 mi', fuel: 'Diesel', transmission: 'Automatic', type: 'SUV', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900', inspected: true },
  { brand: 'Audi', model: 'A4', year: '2019', price: '$32,500', mileage: '35,000 mi', fuel: 'Petrol', transmission: 'Automatic', type: 'Sedan', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900', inspected: true },
  { brand: 'Honda', model: 'Accord', year: '2021', price: '$26,800', mileage: '18,000 mi', fuel: 'Hybrid', transmission: 'Automatic', type: 'Sedan', image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=900', inspected: true },
  { brand: 'Tesla', model: 'Model 3', year: '2020', price: '$38,900', mileage: '25,000 mi', fuel: 'Electric', transmission: 'Automatic', type: 'Sedan', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=900', inspected: true }
];

function renderCars(cars) {
  const grid = document.getElementById('carsGrid');
  grid.innerHTML = '';
  cars.forEach(car => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}" />
      <div class="body">
        <h3>${car.brand} ${car.model}</h3>
        <div class="price">${car.price}</div>
        <div class="muted">${car.type} • ${car.year} • ${car.mileage}</div>
        <div style="margin-top:10px">
          <button class="btn" data-brand="${escapeHtml(car.brand)}" data-model="${escapeHtml(car.model)}" data-year="${escapeHtml(car.year)}" onclick="inquireCar(this)">View Details</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function inquireCar(btn) {
  const brand = btn.dataset.brand;
  const model = btn.dataset.model;
  const year = btn.dataset.year;
  const message = `Hi! I want more info on:%0A%0A${brand} ${model} (${year})`;
  const phone = '919876543210'; // change to your number (in international format, no +)
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

// Sell form logic
document.getElementById('sellBtn').addEventListener('click', () => {
  const make = document.getElementById('f_make').value.trim();
  const year = document.getElementById('f_year').value.trim();
  const mileage = document.getElementById('f_mileage').value.trim();
  const name = document.getElementById('f_name').value.trim();
  const phone = document.getElementById('f_phone').value.trim();

  if(!make || !year || !mileage || !name || !phone){
    alert('Please fill in all required fields');
    return;
  }

  const message = `Hi! I want to sell my car:%0A%0ACar Details:%0AMake & Model: ${encodeURIComponent(make)}%0AYear: ${encodeURIComponent(year)}%0AMileage: ${encodeURIComponent(mileage)}%0A%0AOwner Details:%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}`;
  const phoneTo = '919876543210'; // change to your whatsapp number
  window.open(`https://wa.me/${phoneTo}?text=${message}`, '_blank');

  // reset form
  document.getElementById('f_make').value = '';
  document.getElementById('f_year').value = '';
  document.getElementById('f_mileage').value = '';
  document.getElementById('f_name').value = '';
  document.getElementById('f_phone').value = '';
});

// Smooth scroll for nav buttons
document.querySelectorAll('[data-target]').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const id = btn.getAttribute('data-target');
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

renderCars(sampleCars);
