import { atom } from 'recoil'

export const isErrorToastOpenState = atom<boolean>({
  key: 'isErrorToastOpenState',
  default: false,
})

export const isSuccessToastOpenState = atom<boolean>({
  key: 'isSuccessToastOpenState',
  default: false,
})
