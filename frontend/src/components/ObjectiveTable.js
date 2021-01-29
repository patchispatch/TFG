import React, {useState, useMemo, Fragment} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import GlobalFilter from './GlobalFilter'

function ObjectiveTable({objectives, deleteObjective}) {
    function startEditing(id) {
        // Set editing row to id
        setEditingId(id)
        // Set modifiedValues to selected row current data
        setModifiedValues(/* data */)
    }

    function stopEditing() {
        // Set editing row to null
        setEditingId(null)
        // Set modifiedValues to empty object
        setModifiedValues({})
    }

    function updateData(data) {
        setModifiedValues({
            ...modifiedValues,
            data
        })
        console.log(modifiedValues)
    }

    const [editingId, setEditingId] = useState(null)
    const [modifiedValues, setModifiedValues] = useState({title: "", goal: 0})
    const data = useMemo(() => objectives, [objectives])
    const columns = useMemo(() => [
        {
            Header: 'Title',
            Footer: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Progress',
            Footer: 'Progress',
            accessor: 'complete',
            sortType: 'basic',
            Cell: (props) => {
                const id = props.row.original.id
                const progress = props.row.original.progress
                const goal = props.row.original.goal
                const complete = props.row.original.complete

                if(editingId === id) {
                    return <input type="text" placeholder={progress} />
                }
                else {
                    return <span>
                        {progress}/{goal} veces/semana {complete && "✔️"}
                    </span>
                }
            },
        },
        {
            Header: 'Options',
            Footer: 'Options',
            Cell: (props) => {
                const id = props.row.original.id
                let editButton = null
                let deleteButton = null

                if(editingId === id) {
                    editButton = <button onClick={() => console.log(`Objective ${id} modified`)}>
                        Save
                    </button>
                    deleteButton = <button onClick={() =>stopEditing()}>
                        Cancel
                    </button>
                }
                else if(editingId === null) {
                    editButton = <button onClick={() => {startEditing(id)}}>
                        Edit
                    </button>

                    deleteButton = <button onClick={() => deleteObjective(id)}>
                        Delete
                    </button>
                }

                return (
                <Fragment>
                    {editButton}
                    {deleteButton}
                </Fragment>
                )
            }
        },
    ], [deleteObjective, editingId])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({columns, data, deleteObjective}, useGlobalFilter, useSortBy)

    const {globalFilter} = state

    return (
        <div className="objective-table">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
            <table aria-label="Objective list" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>

                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map(column => (
                                <td {...column.getFooterProps()}>
                                    {column.render('Footer')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
        </div>
    )
}

export default ObjectiveTable
