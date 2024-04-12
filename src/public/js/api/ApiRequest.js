let API_URL = "/api";

export const apiRequest = async (method, path, body = null) => {
  const options = {
    method,
  };

  if (body instanceof FormData) {
    options.body = body;
  } else if (body !== null) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  } else {
    options.headers = { 'Content-Type': 'application/json' };
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