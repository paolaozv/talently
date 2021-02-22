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

export const setcurrentContent = (content) => {
  const uncompleted = content.filter((el) => el.progress === 0)
  const someUncompleted = content.filter((el) => el.progress < 10)
  const firstSomeUncompleted =
    someUncompleted.length > 0 ? someUncompleted[0] : content[0]
  const firstUncompleted =
    uncompleted.length > 0 ? uncompleted[0] : firstSomeUncompleted
  return firstUncompleted
}

export const setNextCurrentContent = (content, current) => {
  const size = content.length
  const nextContent =
    current.id === size ? content[size - 1] : content[current.id]
  return nextContent
}

export const updateProgress = (progress, previousProgress) => {
  if (progress !== previousProgress) {
    return true
  }
  return false
}
