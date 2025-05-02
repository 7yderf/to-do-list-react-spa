// import CryptoJS from 'crypto-js'

const ID_TOKEN_KEY = "id_token"
const ID_PERMISSIONS_KEY = "permissions"

export const JwtService = {
  getToken: () => localStorage.getItem(ID_TOKEN_KEY),
  saveToken: (token) => localStorage.setItem(ID_TOKEN_KEY, token),
  destroyToken: () => localStorage.removeItem(ID_TOKEN_KEY),
  
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user') || '{}'),
  
  getPermissions: () => localStorage.getItem(ID_PERMISSIONS_KEY),
  savePermissions: (permissions) => localStorage.setItem(ID_PERMISSIONS_KEY, permissions),
  destroyPermissions: () => localStorage.removeItem(ID_PERMISSIONS_KEY),

  clearSession: () => {
    localStorage.removeItem(ID_TOKEN_KEY)
    localStorage.removeItem(ID_PERMISSIONS_KEY)
    localStorage.removeItem('user')
  }
}