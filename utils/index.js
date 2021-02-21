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

export const setActualContent = (content) => {
  const uncompleted = content.filter((el) => el.progress === 0)
  const firstUncompleted = uncompleted.length > 0 ? uncompleted[0] : content[0]
  return firstUncompleted
}

export const updateProgress = (progress, previousProgress) => {
  console.log('previous', previousProgress, 'now', progress)
  if (progress !== previousProgress) {
    return true
  }
  return false
}
