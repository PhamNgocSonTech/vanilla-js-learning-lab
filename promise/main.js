function xmlSendReq(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send();
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
        const contentType = xhr.getResponseHeader("content-type");
        const isJson = contentType && contentType.includes("application/json");
        if (isJson) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (error) {
            reject("Invalid JSON Format");
          }
        } else {
          resolve(xhr.responseText);
        }
      } else {
        reject(`HTTP Code: ${xhr.status}`);
      }
    };
    xhr.onerror = () => {
      reject("Network Error.");
    };
  });
}

function getFirstProvince() {
  return xmlSendReq("GET", `https://34tinhthanh.com/api/provinces`).then(
    (result) => result[0]
  );
}

function getFirstWard(provinceCode) {
  return xmlSendReq(
    "GET",
    `https://34tinhthanh.com/api/wards?province_code=${provinceCode}`
  ).then((result) => result[0]);
}

getFirstProvince()
  .then((province) => getFirstWard(province.province_code))
  .then((result) => console.log(result))
  .catch((err) => {
    console.error("Error:", err);
  });

// const header = document.querySelector(".header");
// const footer = document.querySelector(".footer");
// const provincesList = document.querySelector(".provinces-list");

// xmlSendReq("GET", "./partials/header.html").then((responseText) => {
//   header.innerHTML = responseText;
// });

// xmlSendReq("GET", "./partials/footer.html").then((responseText) => {
//   footer.innerHTML = responseText;
// });

// xmlSendReq("GET", "https://34tinhthanh.com/api/provinces").then((result) => {
//   const response = result;
//   const provinces = response;
//   provinces.forEach((province) => {
//     const item = document.createElement("li");
//     item.textContent = province.name;
//     provincesList.appendChild(item);
//   });
// });

// xmlSendReq("GET", "https://34tinhthanh.com/api/provinces")
//   .then((result) => {
//     const provinces = result;
//     const firstProvince = provinces[0];
//     return xmlSendReq(
//       "GET",
//       `https://34tinhthanh.com/api/wards?province_code=${firstProvince.province_code}`
//     );
//   })
//   .then((result) => {
//     const ward = result;
//     const firstWard = ward[0];
//     console.log(firstWard);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
