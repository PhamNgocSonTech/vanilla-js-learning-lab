async function send(method, url) {
  const res = await fetch(url, { method });
  if (!res.ok) throw new Error(`HTTP Code:${res.status}`);
  const type = res.headers.get("content-type");
  const isJson = type && type.includes("application/json");
  try {
    return isJson ? await res.json() : await res.text();
  } catch (error) {
    throw new Error("Invalid JSON format!");
  }
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const provincesList = document.querySelector(".provinces-list");

send("GET", "./partials/header.html").then((responseText) => {
  header.innerHTML = responseText;
});

send("GET", "./partials/footer.html").then((responseText) => {
  footer.innerHTML = responseText;
});

send("GET", "https://34tinhthanh.com/api/provinces").then((result) => {
  const response = result;
  const provinces = response;
  provinces.forEach((province) => {
    const item = document.createElement("li");
    item.textContent = province.name;
    provincesList.appendChild(item);
  });
});

send("GET", "https://34tinhthanh.com/api/provinces")
  .then((result) => {
    const provinces = result;
    const firstProvince = provinces[0];
    return send(
      "GET",
      `https://34tinhthanh.com/api/wards?province_code=${firstProvince.province_code}`
    );
  })
  .then((result) => {
    const ward = result;
    const firstWard = ward[0];
    console.log(firstWard);
  })
  .catch((error) => {
    console.log(error);
  });
