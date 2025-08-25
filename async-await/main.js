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

const urlApi = "https://34tinhthanh.com";

async function getFirstProvince() {
  const result = await xmlSendReq("GET", `${urlApi}/api/provinces`);

  return result[0];
}

async function getFirstWard(provinceCode) {
  const result = await xmlSendReq(
    "GET",
    `${urlApi}/api/wards?province_code=${provinceCode}`
  );
  return result[0];
}

// getFirstProvince()
//   .then((province) => getFirstWard(province.province_code))
//   .then((result) => console.log(result))
//   .catch((err) => {
//     console.error("Error:", err);
//   });

async function handle() {
  try {
    const province = await getFirstProvince();
    const ward = await getFirstWard(province.province_code);
    console.log(ward);
  } catch (error) {
    console.log(error);
  }
}

handle();
