export const sendRequest = async (url, data) => {
  let response,
    errorMessage = 'Authencation failse!';
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (response = data))
    .catch((error) => (errorMessage = error.message));

  return { response, errorMessage };
};
