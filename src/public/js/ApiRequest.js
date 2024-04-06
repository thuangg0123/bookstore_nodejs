let API_URL = "/api";

const apiRequest = async (method, path, body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_URL + path, options);

  if (!response.ok) {
    const responseBody = await response.json();
    throw new HTTPError(response.status, responseBody.error);
  }

  return response.json();
};