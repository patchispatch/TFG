import React, {useState, useMemo, Fragment} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import GlobalFilter from './GlobalFilter'

function ObjectiveTable({objectives, deleteObjective}) {
    const [editingId, setEditingId] = useState(null)
    const [modifiedValues, setModifiedValues] = useState({})
    const data = useMemo(() => objectives, [objectives])
    const columns = useMemo(() => {
        function startEditing(id) {
            // Set editing row to id
            setEditingId(id)
            // Set modifiedValues to selected row current data
            const data = objectives.find(e => e.id === id)
            setModifiedValues({title: data.title, goal: data.goal})
        }
    
        function stopEditing() {
            // Set editing row to null
            setEditingId(null)
            // Set modifiedValues to empty object
            setModifiedValues({})
        }

        function updateData(data) {
            const values = {...modifiedValues, ...data}
            setModifiedValues(values)
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
                    cell = <input 
                        name="title"
                        type="text" 
                        onChange={e => updateData({title: e.target.value})}
                        value={modifiedValues.title} 
                    />
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
                    cell = <input 
                        name="goal"
                        type="number" 
                        onChange={e => updateData({goal: e.target.value})}
                        value={modifiedValues.goal} 
                    />
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
                    editButton = <button onClick={() => console.log(modifiedValues)}>
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
    ]}, [objectives, deleteObjective, editingId, modifiedValues])

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
