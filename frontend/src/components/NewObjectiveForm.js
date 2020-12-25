import React from 'react'
import useForm from '../hooks/useForm'

function NewObjectiveForm(props) {
    const initialValues = {
        title: undefined,
        goal: "",
    }

    // Form hook
    const {
        values,
        handleChange,
        handleSubmit,
    } = useForm(props.onSubmit, initialValues)

    return (
        <form className="form" aria-label="New objective" onSubmit={handleSubmit}>
            <label htmlFor="newObjectiveTitle">Title</label>
            <input 
                id="newObjectiveTitle"
                type="text"
                name="title"
                onInput={handleChange}
                value={values.title}
                required
            />

            <label htmlFor="newObjectiveGoal">Goal</label>
            <input 
                id="newObjectiveGoal"
                type="number"
                name="goal"
                onInput={handleChange}
                value={values.goal}
                required
            />

            <button>Save</button>
        </form>
    )
}

export default NewObjectiveForm