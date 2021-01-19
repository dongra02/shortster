import { useState } from 'react'

const useForm = intialFormData => {

  const [formData, setFormData] = useState(intialFormData)
  const [formErrs, setFormErrs] = useState({})

  const handleChange = ({ target: { name, value } }) => {
    const newFormData = { ...formData, [name]: value }
    const newFormErrs = { ...formErrs, [name]: '' }
    setFormData(newFormData)
    setFormErrs(newFormErrs)
  }
  
  return { formData, setFormData, handleChange, formErrs, setFormErrs }
}

export default useForm