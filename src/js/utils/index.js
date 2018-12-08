export function sleep (duration) {
  return new Promise(resolve => setTimeout(() => resolve(), duration))
}

export function request (url, {
  method = 'get'
} = {}) {
  const options = arguments[1]
  return fetch(url, options)
    .then(response => response.json())
}

export function getCurrentPosition (options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
