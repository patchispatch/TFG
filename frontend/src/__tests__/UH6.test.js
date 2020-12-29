import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import View from '../components/View'

// Mocking axios
const mockData = [
    {"id":1,"title":"Comprar pan","goal":5,"progress":0},
    {"id":2,"title":"Salir a correr","goal":2,"progress":1},
    {"id":3,"title":"Swim","goal":2,"progress":2}
]

describe("UH6 - Objective list", () => {
    beforeEach(() => {
        axios.get.mockResolvedValue(mockData)
    })

    test("The user can click the Objective List button", async () => {
        render(<View type="list"/>)

        // The button exists in the DOM
        await waitFor(() => {
            const listButton = screen.getByRole("button", {name: /Objective list/i})
            expect(listButton).toBeInTheDocument()
        })
    })

    test("Clicking the Objective List button shows the List", async () => {
        render(<View type="list"/>)

        await waitFor(() => {
            const listButton = screen.getByRole("button", {name: /Objective list/i})
            userEvent.click(listButton)

            // The list is on the DOM
            const objectiveList = screen.getByRole("list", /Objective list/i)
            expect(objectiveList).toBeInTheDocument()
        })
    })

    test("The Objective List shows all entries and their information", async () => {
        render(<View type="objList"/>)

        // The list contains the objectives
        await waitFor(() => {
            const obj1 = screen.getByRole("listitem", {name: "Comprar pan"})
            const obj2 = screen.getByRole("listitem", {name: "Salir a correr"})
            const obj3 = screen.getByRole("listitem", {name: "Swim"})
            expect(obj1).toBeInTheDocument()
            expect(obj2).toBeInTheDocument()
            expect(obj3).toBeInTheDocument()
        })
    })
})