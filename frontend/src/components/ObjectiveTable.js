import React, {useState, useRef, useMemo, Fragment, useEffect, useCallback} from 'react'
import {useTable, useSortBy, useGlobalFilter, useExpanded} from 'react-table'
import GlobalFilter from './GlobalFilter'
import EditObjectiveForm from './EditObjectiveForm'

function ObjectiveTable({objectives, editObjective, deleteObjective}) {

    const renderRowSubComponent = useCallback(
        ({row}) => (
            <EditObjectiveForm 
                id={row.original.id}
                title={row.original.title}
                goal={row.original.goal}
                onSubmit={editObjective}
            />
        ), 
        []
    )

    const data = useMemo(() => objectives, [objectives])
    const columns = useMemo(() => {
        
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
                
                return cell
            },
        },
        {
            Header: "Edit",
            id: "edit",
            Cell: ({row}) => (
                // Example expander
                <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                </span>
            )
        },
        {
            Header: 'Options',
            Footer: 'Options',
            Cell: ({row}) => {
                const {id} = row.original

                let deleteButton = <button onClick={() => deleteObjective(id)}>
                        Delete
                    </button>

                return (
                    <Fragment>
                        {deleteButton}
                    </Fragment>
                )
            }
        },
    ]}, [objectives, editObjective, deleteObjective])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        visibleColumns,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({columns, data, deleteObjective}, useGlobalFilter, useSortBy, useExpanded)

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
                        const rowProps = row.getRowProps()
                        return (
                            <Fragment key={rowProps.key}>
                                <tr {...rowProps}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>

                                {row.isExpanded && (
                                    <tr>
                                        <td colSpan={visibleColumns.length}>
                                            {renderRowSubComponent({row})}
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
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
