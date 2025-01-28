import { atom } from 'recoil'

export const errorToastMessageState = atom<string>({
  key: 'errorToastMessageState',
  default: '',
})

export const successToastMessageState = atom<string>({
  key: 'successToastMessageState',
  default: '',
})
