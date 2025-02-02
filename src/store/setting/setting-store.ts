import { atom } from 'recoil'

export const reverseTestState = atom<boolean>({
  key: 'reverseTestState',
  default: localStorage.getItem('el_reverse_test') === 'true',
})
