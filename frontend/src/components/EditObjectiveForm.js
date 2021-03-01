import React from 'react'
import {useForm} from 'react-hook-form'

function editObjectiveForm({onSubmit}) {
    const {register, handleSubmit, errors} = useForm()

    return (
        <form className="form" aria-label="Edit objective" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="editObjectiveTitle">Title</label>
            <input
                id="editObjectiveTitle" 
                type="text"
                name="title"
                aria-invalid={errors.title ? "true" : "false"}
                ref={register({required: true, maxLength: 200})}
            />

            {errors.title && errors.title.type === "required" && (
                <span className="alert" role="alert">The objective must have a title</span>
            )}
            {errors.title && errors.title.type === "maxLength" && (
                <span className="alert" role="alert">The title must be less than 200 characters long</span>
            )}

            <label htmlFor="editObjectiveGoal">Goal</label>
            <input
                id="editObjectiveGoal"
                type="number"
                name="goal"
                aria-invalid={errors.goal ? "true" : "false"}
                ref={register({required: true})}
            />

            {errors.goal && errors.goal.type === "required" && (
                <span className="alert" role="alert">Ypu need to set a goal</span>
            )}

            <button onClick={onCancel}>Cancel</button>
            <button type="submit" className="submit-button">Save</button>
        </form>
    )
}