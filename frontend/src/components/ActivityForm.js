import React from 'react'
import axios from 'axios'
import useForm from '../hooks/useForm'

function ActivityForm(props) {
    // Initial values of the form
    const initialValues = {
        title: "",
        description: "",
        date: "",
        time: "",
    }

    // Submit callback
    function onSubmit() {
        console.log(values)

        // Create activity
        axios.post('http://localhost:8000/activities/', values)
            .catch(err => console.log(err))
    }

    // Form hook
    const {
        values,
        handleChange,
        handleSubmit,
    } = useForm(onSubmit, initialValues)

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>Title</label>
            <input 
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
                required
            />

            <label>Description</label>
            <input 
                type="text"
                name="description"
                onChange={handleChange}
                value={values.description}
                required
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