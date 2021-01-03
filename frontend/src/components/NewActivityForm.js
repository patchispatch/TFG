import React from 'react'
import useForm from '../hooks/useForm'

function NewActivityForm(props) {
    // Initial values of the form
    const initialValues = {
        title: "",
        description: "",
        date: "",
        time: "",
    }

    // Form hook
    const {
        values,
        handleChange,
        handleSubmit,
    } = useForm(props.onSubmit, initialValues)

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

            <fieldset>
                <label>Date</label>
                <input 
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={values.date}
                />
            </fieldset>

            <fieldset>
                <label>Time</label>
                <input 
                    type="time"
                    name="time"
                    onChange={handleChange}
                    value={values.time}
                />
            </fieldset>
            <button>Create activity</button>
        </form>
    )
}

export default NewActivityForm