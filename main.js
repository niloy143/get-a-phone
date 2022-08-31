const searchInput = document.getElementById('search-input');
const phoneContainer = document.getElementById('phone-container');

const uniquePhone = async(uniqueId) => {
    const uniqueRes = await fetch(`https://openapi.programming-hero.com/api/phone/${uniqueId}`);
    const uniqueData = await uniqueRes.json();
    const thisPhone = uniqueData.data;
    const mainFeatures = thisPhone.mainFeatures;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <h2 class="text-center">${thisPhone.name}</h2>
        <p>Brand: ${thisPhone.brand}</p>
        <p>Storage: ${mainFeatures.storage}</p>
        <p>Chipset: ${mainFeatures.chipSet}</p>
        <p>Display Size: ${mainFeatures.displaySize}</p>
        <p>USB: ${thisPhone.others.USB}</p>
        <p>Release Date: ${thisPhone.releaseDate}</p>
    `
}

const loadPhones = async (searchText, isShowAllClicked) => {
    hideShow(true, 'spinner');
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();

    phoneContainer.textContent = ``;
    searchInput.value = '';

    if(!isShowAllClicked) {
        if(data.data.length > 10) {
            data.data.length = 10;
            hideShow(true, 'show-all');
        }
    
        else {
            hideShow(false, 'show-all');
        }
    }

    data.data.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer border-0 bg-transparent">
                    <button class="btn btn-info text-white d-block mx-auto mb-2 fw-semibold" onclick="uniquePhone('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneModal">Show
                        Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(phoneDiv);
    })

    hideShow(false, 'spinner');

    if(phoneContainer.children.length === 0) {
        hideShow(true, 'no-phone-found');
    }
    else {
        hideShow(false, 'no-phone-found');
    }
    phoneContainer.setAttribute('title', searchText);
}

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        loadPhones(this.value, false);
    }
});
document.getElementById('search-button').addEventListener('click', function(){
    loadPhones(searchInput.value, false);
});

document.getElementById('show-all').addEventListener('click', function() {
    const searchText = phoneContainer.getAttribute('title');
    loadPhones(searchText, true);
})

loadPhones('apple', false);