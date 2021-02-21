import cookie from 'js-cookie'

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

export const signout = async () => {
  removeCookie('auth._token.local')
  removeLocalStorage('auth._token.local')
}
