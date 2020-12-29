import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

import App from '../App'
import ObjectiveListView from '../components/ObjectiveListView'

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
        render(<App/>)

        // The button exists in the DOM
        await waitFor(() => {
            const listButton = screen.getByRole("button", {name: /Objective list/i})
            expect(listButton).toBeInTheDocument()
        })
    })

    test("Clicking the Objective List button shows the List", async () => {
        render(<App/>)

        await waitFor(() => {
            const listButton = screen.getByRole("button", {name: /Objective list/i})
            userEvent.click(listButton)
        })
        
        await waitFor(() => {
            // The list is on the DOM
            const objectiveList = screen.getByRole("table", /Objective list/i)
            expect(objectiveList).toBeInTheDocument()
        })
    })

    test("The Objective List shows all entries and their information", async () => {
        render(<ObjectiveListView objectives={mockData}/>)

        // The list contains the objectives
        await waitFor(() => {
            const obj1 = screen.getByRole("cell", {name: "Comprar pan"})
            const obj2 = screen.getByRole("cell", {name: "Salir a correr"})
            const obj3 = screen.getByRole("cell", {name: "Swim"})
            expect(obj1).toBeInTheDocument()
            expect(obj2).toBeInTheDocument()
            expect(obj3).toBeInTheDocument()
        })
    })
})