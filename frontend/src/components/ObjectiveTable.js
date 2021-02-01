import React, {useState, useRef, useMemo, Fragment, useEffect} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import GlobalFilter from './GlobalFilter'

// Editable cell renderer
function EditableCell({type, value: initialValue, column, updateData}) {
    // State of the cell
    const [value, setValue] = useState(initialValue)

    // Update the initialValue if needed
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    // OnChange event
    function onChange(e) {
        setValue(e.target.value)
    }

    // Only update the external data when the state has been updated
    useEffect(() => {
        updateData({[column]: value})
    }, [value, column, updateData])

    return (
        <input type={type} value={value} onChange={onChange} />
    )
}

function ObjectiveTable({objectives, editObjective, deleteObjective}) {
    const [editingId, setEditingId] = useState(null)
    const modifiedValues = useRef({})

    const data = useMemo(() => objectives, [objectives])
    const columns = useMemo(() => {
        function startEditing(id) {
            // Set editing row to id
            setEditingId(id)
            // Set modifiedValues to selected row current data
            const data = objectives.find(e => e.id === id)
            modifiedValues.current = data
        }
    
        function stopEditing() {
            // Set editing row to null
            setEditingId(null)
            // Set modifiedValues to empty object
            modifiedValues.current = {}
        }

        function updateData(data) {
            const values = {...modifiedValues.current, ...data}
            modifiedValues.current = values
        }
        
        return [
        {
            Header: 'Title',
            Footer: 'Title',
            accessor: 'title',
            Cell: ({row}) => {
                const {id,title} = row.original

                // Default cell
                let cell = <span>
                    {title}
                </span>

                // Editing cell
                if(editingId === id) {
                   cell = <EditableCell type="text" value={title} column={"title"} updateData={updateData} />
                }

                return cell
            }
        },
        {
            Header: 'Progress',
            Footer: 'Progress',
            accessor: 'complete',
            sortType: 'basic',
            Cell: ({row}) => {
                const {id, progress, goal, complete} = row.original

                // Default cell
                let cell = <span>
                    {progress}/{goal} veces/semana {complete && "✔️"}
                </span>

                // Editing cell
                if(editingId === id) {
                    cell = <EditableCell type="number" value={goal} column={"goal"} updateData={updateData} />
                 }
                
                return cell
            },
        },
        {
            Header: 'Options',
            Footer: 'Options',
            Cell: ({row}) => {
                const {id} = row.original
                let editButton = null
                let deleteButton = null

                if(editingId === id) {
                    editButton = <button onClick={() => editObjective(id, modifiedValues.current)}>
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
    ]}, [objectives, editObjective, deleteObjective, editingId, modifiedValues])

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
