let API_URL = "/api";

export const apiRequest = async (method, path, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(API_URL + path, options);

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    return error.message;
  }
};