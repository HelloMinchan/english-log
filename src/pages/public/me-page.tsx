import { useState } from 'react'

export function MePage() {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = () => {
    if (inputValue === import.meta.env.VITE_ME) {
      localStorage.setItem('el_me', import.meta.env.VITE_ME)
      window.location.reload()
    } else {
    }
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleSubmit}>asf</button>
    </div>
  )
}
