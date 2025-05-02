import { create } from 'zustand'
import { JwtService } from '@/core/services/JwtService'
import { ApiService } from '@/core/services/ApiService'

export const useAuthStore = create((set) => ({
  sesion: JwtService.getUser(),
  
  setUser: (userData) => {
    const sesion = {
      isAuth: true,
      user: userData.email,
      role: ['user'],
      id: userData.id
    }
    set({ sesion })
    JwtService.saveToken(userData.token)
    JwtService.savePermissions(userData.permissions)
    JwtService.saveUser(sesion)
  },
  
  logout: () => {
    set({ sesion: {} })
    JwtService.clearSession()
  },

}))