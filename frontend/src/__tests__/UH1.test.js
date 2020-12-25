import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import View from '../components/View'
import NewObjectiveForm from '../components/NewObjectiveForm'

// Mocking axios
const mockData = [
    {"id":1,"title":"Comprar pan","goal":5,"progress":0},
    {"id":2,"title":"Salir a correr","goal":2,"progress":1},
    {"id":3,"title":"Swim","goal":2,"progress":2}
]

describe("UH 1 - Create objective", () => {
    test("The user can click New Objective button", async () => {
        axios.get.mockResolvedValue(mockData)
        render(<View type="list"/>)

        // The button exists in the DOM
        await waitFor(() => expect(screen.getByRole("button", {name: /new objective/i})).toBeInTheDocument())
    })

    test("Clicking the New Objective button makes the New Objective form to appear", async () => {
        axios.get.mockResolvedValue(mockData)
        render(<View type="list" />)

        // The user clicks the button
        const button = screen.getByRole("button", {name: /new objective/i})
        userEvent.click(button)

        // The form appears in the DOM
        await waitFor(() => expect(screen.getByRole("form", {name: /new objective/i})).toBeInTheDocument())
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
        expect(titleBox).toHaveValue("Running")

        // The user clicks the submit button
        const submitButton = screen.getByText(/Save/i)
        userEvent.click(submitButton)

        // The error message must be there
        const error = screen.getByText("You need to set a goal")
        expect(error).toBeInTheDocument()
    })
})
