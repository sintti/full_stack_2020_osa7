import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  
  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = {
    resetForm: function (event) {
      setValue('')
    }
  }
  
  return {
    type,
    value,
    onChange,
    reset
  }
}