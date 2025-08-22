function xmlSendReq(method, url, callback) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.responseText);
      } else {
        reject("Network Error");
      }
    };
  });
}

const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const provincesList = document.querySelector(".provinces-list");

xmlSendReq("GET", "./partials/header.html").then((responseText) => {
  header.innerHTML = responseText;
});

xmlSendReq("GET", "./partials/footer.html").then((responseText) => {
  footer.innerHTML = responseText;
});

xmlSendReq("GET", "https://34tinhthanh.com/api/provinces").then(
  (responseText) => {
    const response = JSON.parse(responseText);
    const provinces = response;
    provinces.forEach((province) => {
      const item = document.createElement("li");
      item.textContent = province.name;
      provincesList.appendChild(item);
    });
  }
);

xmlSendReq("GET", "https://34tinhthanh.com/api/provinces")
  .then((responseText) => {
    const provinces = JSON.parse(responseText);
    const firstProvince = provinces[0];
    return xmlSendReq(
      "GET",
      `https://34tinhthanh.com/api/wards?province_code=${firstProvince.province_code}`
    );
  })
  .then((responseText) => {
    const ward = JSON.parse(responseText);
    const firstWard = ward[0];
    console.log(firstWard);
  })
  .catch((error) => {
    console.log(error);
  });
