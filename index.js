const loadData = async (searchText = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // step-1 get element by id
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container card before adding new cards
  phoneContainer.textContent = "";

  // display show all button if condition
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display first 12 phone if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  } else {
  }

  phones.forEach((phone) => {
    // step-2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;
    // step-3 set inner html
    phoneCard.innerHTML = `<figure class="px-10 pt-10">
        <img
          src="${phone.image}"
          alt="Phones"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <h4 class="text-2xl font-semibold ">$999</h4>
        <div class="card-actions">
          <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>`;
    // step-4 appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle show details
const handleShowDetails = async (id) => {
  // load phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-details-phone-name");
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById(
    "show-details-container"
  );
  showDetailsContainer.innerHTML = `
    <div class= "flex item-center justify-center my-4">
    <img src="${phone?.image}" alt="">
    </div>
    <p  class="mt-2"><span class="text-lg font-semibold">Storage:</span> ${phone?.mainFeatures?.storage}</p>

    <p class="mt-2"> <span class="text-lg font-semibold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>

    <p class="mt-2"> <span class="text-lg font-semibold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>

    <p class="mt-2"> <span class="text-lg font-semibold">Memory:</span> ${phone?.mainFeatures?.memory}</p>

    <p class="mt-2"> <span class="text-lg font-semibold">Slug:</span> ${phone?.slug}</p>

    <p class="mt-2"> <span class="text-lg font-semibold">ReleaseDate:</span> ${phone?.releaseDate}</p>

    <p class="mt-2" > <span class="text-lg font-semibold">Band:</span> ${phone?.brand}</p>

    <p  class="mt-2"> <span class="text-lg font-semibold">GPS:</span> ${phone?.others?.GPS}</p>
  `;
  // show the modal
  show_details_modal.showModal();
};

// handle search
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  loadData(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (!!isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all btn
const handleShowAll = () => {
  handleSearch(true);
};

loadData();
