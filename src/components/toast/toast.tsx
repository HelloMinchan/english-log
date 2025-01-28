import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'
import { errorToastMessageState, isErrorToastOpenState, isSuccessToastOpenState, successToastMessageState } from '../../store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function Toast() {
  const isErrorToastOpen: boolean = useRecoilValue(isErrorToastOpenState)
  const setIsErrorToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isErrorToastOpenState)
  const errorToastMessage: string = useRecoilValue(errorToastMessageState)

  const isSuccessToastOpen: boolean = useRecoilValue(isSuccessToastOpenState)
  const setIsSuccessToastOpen: SetterOrUpdater<boolean> = useSetRecoilState(isSuccessToastOpenState)
  const successToastMessage: string = useRecoilValue(successToastMessageState)

  const handleClose = () => {
    setIsErrorToastOpen(false)
    setIsSuccessToastOpen(false)
  }

  return (
    <>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={isErrorToastOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ marginBottom: '30px' }}>
          {errorToastMessage}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={isSuccessToastOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ marginBottom: '30px' }}>
          {successToastMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
