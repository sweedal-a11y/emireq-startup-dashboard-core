import { BASE_URL } from "../../services/endPoints";
import { token } from "../../utils/utils";

async function postData(url, payload, isToken) {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: isToken
        ? {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          }
        : {
            "Content-Type": "application/json",
          },
      body: JSON.stringify(payload),
    });

    if (response) {
      const result = await response.json();
      return result;
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const getData = async (url) => {
  const settings = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const response = await fetch(BASE_URL + url, settings);
  if (response) {
    const result = await response.json();
    return result;
  }
};

export const loginStartup = (url, payload) => postData(url, payload);
export const registerStartup = (url, payload) => postData(url, payload);
export const getPreview = (url, payload, isToken) => postData(url, payload, isToken);
export const getProfileData = (url) => getData(url);
export const onboardingStep = (url, payload, isToken) => postData(url, payload, isToken);

