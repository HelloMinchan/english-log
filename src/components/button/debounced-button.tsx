import { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import Button from '@mui/material/Button'

export const DebouncedButton = ({ text, onClick, variant, sx, disabled }: any) => {
  const buttonRef: any = useRef(null)

  useEffect(() => {
    const clickObservable = fromEvent(buttonRef.current, 'click').pipe(debounceTime(500))

    const subscription = clickObservable.subscribe(() => {
      onClick()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [onClick])

  return (
    <Button ref={buttonRef} variant={variant} sx={sx} disabled={disabled}>
      {text}
    </Button>
  )
}
