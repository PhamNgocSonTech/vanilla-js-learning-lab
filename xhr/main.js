function xmlSendReq(method, url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.send();
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      if (typeof callback === "function") {
        callback(xhr.responseText);
      }
    }
  };
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const provincesList = document.querySelector(".provinces-list");

xmlSendReq("GET", "./partials/header.html", (responseText) => {
  header.innerHTML = responseText;
});

xmlSendReq("GET", "./partials/footer.html", (responseText) => {
  footer.innerHTML = responseText;
});

// xmlSendReq("GET", "https://34tinhthanh.com/api/provinces", (responseText) => {
//   const response = JSON.parse(responseText);
//   const provinces = response;
//   provinces.forEach((province) => {
//     const item = document.createElement("li");
//     item.textContent = province.name;
//     provincesList.appendChild(item);
//   });
// });

xmlSendReq("GET", "https://34tinhthanh.com/api/provinces", (responseText) => {
  const provinces = JSON.parse(responseText);
  const firstProvince = provinces[0];
  xmlSendReq(
    "GET",
    `https://34tinhthanh.com/api/wards?province_code=${firstProvince.province_code}`,
    (responseText) => {
      const ward = JSON.parse(responseText);
      const firstWard = ward[0];
      console.log(firstWard);
    }
  );
  // console.log(firstProvince);
});
