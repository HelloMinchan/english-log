import { atom } from 'recoil'

export const meState = atom<string | null>({
  key: 'meState',
  default: localStorage.getItem('el_me'),
})
