import React, {useState, useMemo, Fragment} from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import GlobalFilter from './GlobalFilter'

function ObjectiveTable({objectives, deleteObjective}) {
    const [editing, setEditing] = useState(false)
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
                const progress = props.row.original.progress
                const goal = props.row.original.goal
                const complete = props.row.original.complete

                if(editing) {
                    return <input type="text" placeholder={progress}/>
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
                return (
                <Fragment>
                    <button onClick={() => {setEditing(!editing)}}>
                        Edit
                    </button>

                    <button onClick={() => deleteObjective(id)}>
                        Delete
                    </button>
                </Fragment>
                )
            }
        },
    ], [deleteObjective, editing])

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
