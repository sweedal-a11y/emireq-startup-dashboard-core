import { BASE_URL } from "../../services/endPoints";

async function postData(url, payload) {
  try {
    const response = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
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

export const loginStartup = (url, payload) => postData(url, payload);
