const loadPhone = async (searhText, datalimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searhText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit);
};

const displayPhones = (phones, datalimit) =>{
   const phoneContainer = document.getElementById('phone-container');
   phoneContainer.textContent = ''

   const showAll = document.getElementById('display');
   if(datalimit && phones.length > 10){
    phones = phones.slice(0,10);
    showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }

   

   const noPhone = document.getElementById('no-found-message');

   if(phones.length === 0){
    noPhone.classList.remove('d-none')
   }
   else{
    noPhone.classList.add('d-none')
   }
   phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = `
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show more</button>
    </div>
    </div>
    `
    phoneContainer.appendChild(phoneDiv)
   });

   toggleSpinner(false);
}

const processSearch = (datalimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, datalimit);
}

document.getElementById('button-addon2').addEventListener('click', function(){
    toggleSpinner(true)
    processSearch(10)

});

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate: 'No release Date'}</p>

        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage: 'No storage Information'}</p>

        <p>Otheres: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>

        <p>Sensor:${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No sensore'}</p>
    `
}

loadPhone('phone');