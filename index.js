const loadData = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  // step-1 get element by id
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container card before adding new cards
  phoneContainer.textContent = "";

  // display show all button if condition
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display first 12 phone
  phones = phones.slice(0, 12);

  phones.forEach((phones) => {
    // console.log(phones);
    // step-2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card lg:w-96 bg-gray-100 shadow-xl`;
    // step-3 set inner html
    phoneCard.innerHTML = `<figure class="px-10 pt-10">
        <img
          src="${phones.image}"
          alt="Phones"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phones.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>`;
      // step-4 appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false)
};

// handle search
const handleSearch = () => {
  toggleLoadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const searchText = inputField.value;
  loadData(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (!!isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else{
    loadingSpinner.classList.add("hidden");
  }
};
