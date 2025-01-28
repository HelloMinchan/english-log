import { isErrorToastOpenState, isSuccessToastOpenState } from '../../store'
import { useEffect } from 'react'
import { SetterOrUpdater, useSetRecoilState } from 'recoil'

export const useToastClear: Function = (): void => {
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)

  useEffect(() => {
    setIsErrorToastOpen(false)
    setIsSuccessToastOpen(false)
  })
}
