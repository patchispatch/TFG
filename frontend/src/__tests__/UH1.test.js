import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import {render, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'
import NewObjectiveForm from 'components/NewObjectiveForm'

afterEach(cleanup)

describe("UH 1 - Create objective", () => {
    test("The user can click New Objective button", () => {
        const {getByText} = render(<App />)

        // The button exists in the DOM
        expect(getByText(/New Objective/i).textContent).toBe("New Objective")
    })

    test("Pushing the New Objective button makes the New Objective form to appear", () => {
        const {getByText, getByTestId} = render(<App />)

        // The user clicks the button
        const button = getByText(/New Objective/i)
        expect(button.textContent).toBe("New Objective")
        userEvent.click(button)

        // The form appears in the DOM
        expect(getByTestId("new-objective-form")).toBeInTheDocument()
    })

    // Fake submit function
    const fakeSubmit = () => {}

    test("The user fills in the New Objective form and submits it", () => {
        const {getByText, getByLabelText} = render(<NewObjectiveForm onSubmit={fakeSubmit}/>)

        // The user fills every text box
        const titleBox = getByLabelText(/Title/i)
        const goalBox = getByLabelText(/Goal/i)
        userEvent.type(titleBox, "Running")
        userEvent.type(goalBox, "3")

        // The form contains the data
        expect(titleBox.textContent).toBe("Running")
        expect(titleBox.textContent).toBe(3)

        // The user clicks the submit button
        const submitButton = getByText(/Save/i)
        userEvent.click(submitButton)

        // The submit function must have been called once
        expect(fakeSubmit).toHaveBeenCalledTimes(1)
    })

    test("The user tries to submit the New Objective form with incomplete data and fails", () => {
        const {getByText, getByLabelText} = render(<NewObjectiveForm onSubmit={fakeSubmit}/>)
        
        // The user fills just one text box
        const titleBox = getByLabelText(/Title/i)
        userEvent.type(titleBox, "Running")

        // The form contains the data
        expect(titleBox.textContent).toBe("Running")

        // The user clicks the submit button
        const submitButton = getByText(/Save/i)
        userEvent.click(submitButton)

        // The submit function must not have been called
        expect(fakeSubmit).not.toHaveBeenCalledTimes(1)
    })
})
