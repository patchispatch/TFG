import React from 'react'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import NewObjectiveForm from '../components/NewObjectiveForm'

describe("UH 1 - Create objective", () => {
    test("The user can click New Objective button", () => {
        render(<App />)

        // The button exists in the DOM
        expect(screen.getByRole("button", {name: /new objective/i})).toBeInTheDocument()
    })

    test("Clicking the New Objective button makes the New Objective form to appear", () => {
        render(<App />)

        // The user clicks the button
        const button = screen.getByRole("button", {name: /new objective/i})
        userEvent.click(button)

        // The form appears in the DOM
        expect(screen.getByRole("form", {name: /new objective/i})).toBeInTheDocument()
    })

    // Fake submit function
    const fakeSubmit = jest.fn()

    test("The user fills in the New Objective form and submits it", () => {
        render(<NewObjectiveForm onSubmit={fakeSubmit}/>)

        // The user fills every text box
        const titleBox = screen.getByLabelText(/Title/i)
        const goalBox = screen.getByLabelText(/Goal/i)

        userEvent.type(titleBox, "Running")
        userEvent.type(goalBox, "3")

        // The form contains the data
        expect(titleBox).toHaveValue("Running")
        expect(goalBox).toHaveValue(3)

        // The user clicks the submit button
        const submitButton = screen.getByText(/Save/i)
        userEvent.click(submitButton)

        // The submit function must have been called once
        expect(fakeSubmit).toHaveBeenCalledTimes(1)
    })

    test("The user tries to submit the New Objective form with incomplete data and fails", () => {
        render(<NewObjectiveForm onSubmit={fakeSubmit}/>)
        
        // The user fills just one text box
        const titleBox = screen.getByLabelText(/Title/i)
        userEvent.type(titleBox, "Running")

        // The form contains the data
        expect(titleBox.textContent).toBe("Running")

        // The user clicks the submit button
        const submitButton = screen.getByText(/Save/i)
        userEvent.click(submitButton)

        // The submit function must not have been called
        expect(fakeSubmit).not.toHaveBeenCalledTimes(1)
    })
})
