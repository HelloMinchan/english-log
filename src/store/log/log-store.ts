import { atom } from 'recoil'
import { TextType } from '../../api'

export const logTypeState = atom<TextType>({
  key: 'logTypeState',
  default: TextType.WORD,
})

export const logCreatedAtState = atom<string | null>({
  key: 'logCreatedAtState',
  default: null,
})
