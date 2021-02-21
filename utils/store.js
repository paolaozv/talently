export const getData = async function (url, axios) {
  let response = await axios.get(url)
  return {
    data: response.data,
  }
}

export const postData = async function (url, axios) {
  let response = await axios.post(url)
  return {
    data: response.data,
  }
}
