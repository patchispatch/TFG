import React, {useMemo} from 'react'
import {useTable} from 'react-table'

function ObjectiveListView(props) {
    const data = useMemo(() => props.objectives, [])
    const columns = useMemo(() => [
        {
            Header: 'Title',
            accessor: 'title',
        },
        {
            Header: 'Goal',
            accessor: 'goal',
        },
        {
            Header: 'Progress',
            accessor: 'progress'
        }
    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    return (
        <table aria-label="Objective list" {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            {column.render('Header')}
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
        </table>
    )
}

export default ObjectiveListView