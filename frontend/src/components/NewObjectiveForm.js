import React from 'react'
import {useForm} from 'react-hook-form'

function NewObjectiveForm(props) {
    const {register, handleSubmit, errors} = useForm()

    return (
        <form className="form" aria-label="New objective" onSubmit={handleSubmit(props.onSubmit)}>
            <label htmlFor="newObjectiveTitle">Title</label>
            <input 
                id="newObjectiveTitle"
                type="text"
                name="title"
                aria-invalid={errors.title ? "true" : "false"}
                ref={register({required: true, maxLength: 200})}
            />
            {errors.title && errors.title.type === "required" && (
                <span role="alert">The objective must have a title</span>
            )}
            {errors.title && errors.title.type === "maxLength" && (
                <span role="alert">The title must be less than 200 characters long</span>
            )}

            <label htmlFor="newObjectiveGoal">Goal</label>
            <input 
                id="newObjectiveGoal"
                type="number"
                name="goal"
                aria-invalid={errors.goal ? "true" : "false"}
                ref={register({required: true})}
            />
            {errors.goal && errors.goal.type === "required" && (
                <span role="alert">You need to set a goal</span>
            )}

            <button onClick={props.onCancel}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    )
}

export default NewObjectiveForm