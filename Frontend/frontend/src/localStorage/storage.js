export const setStorage = (key, user) => {
	localStorage.setItem(key, JSON.stringify(user))
}

export const getStorage = key => {
	return JSON.parse(localStorage.getItem(key))
}

export const clearStorage = key => {
	localStorage.removeItem(key)
}
