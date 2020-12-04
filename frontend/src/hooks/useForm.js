import {useState} from 'react'

function useForm(onSubmit, initialValues) {
    // State
    const [values, setValues] = useState(initialValues || {})

    // Update each value when field changes
    function handleChange(event) {
        const {name, value} = event.target
        setValues({...values, [name]: value})
    }

    // Handles the call to onSubmit
    function handleSubmit(event) {
        if(event)
            event.preventDefault()
        // Callback 
        onSubmit()
    }

    return {
        values,
        handleChange,
        handleSubmit,
    }
}

export default useForm