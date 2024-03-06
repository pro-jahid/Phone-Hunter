const loadPhone = async (searhText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searhText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
};

const displayPhones = phones =>{
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent = ''
   phones = phones.slice(0,20);
   phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = `
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>
    `
    phoneContainer.appendChild(phoneDiv)
   });
}

document.getElementById('button-addon2').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);

})

loadPhone();