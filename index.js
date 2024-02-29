const loadData = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=iphone`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones);
};

const displayPhone = (phones) => {
  // step-1 
  const phoneContainer = document.getElementById("phone-container");
  phones.forEach(phones => {
    console.log(phones);
    // step-2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
    // step-3 set inner html
    phoneCard.innerHTML = `<figure class="px-10 pt-10">
        <img
          src="${phones.image}"
          alt="Phones"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phones.phone_name
        }</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>`;
      phoneContainer.appendChild(phoneCard)
    // step-4 appendChild

  });
};
loadData();
