import React from 'react'
import useForm from '../hooks/useForm'

function ActivityForm() {
    // Initial values of the form
    const initialValues = {
        title: "",
        description: "",
        date: Date.now(),
        time: Date.now(),
    }

    // Submit callback
    function submit() {
        alert(`Activity created!
               Title: ${values.title}
               Description: ${values.description}
               Date and time: ${values.date} - ${values.time}`)
    }

    // Form hook
    const {
        values,
        handleChange,
        handleSubmit,
    } = useForm(submit, initialValues)

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
            />

            <label>Description</label>
            <input 
                type="text"
                name="description"
                onChange={handleChange}
                value={values.description}
            />

            <input 
                type="date"
                name="date"
                onChange={handleChange}
                value={values.date}
            />

            <input 
                type="time"
                name="time"
                onChange={handleChange}
                value={values.time}
            />

            <button>Create activity</button>
        </form>
    )
}

export default ActivityForm