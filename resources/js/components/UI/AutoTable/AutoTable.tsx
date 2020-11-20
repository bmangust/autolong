// React
import React, {useState} from 'react'

// Third-party
import {NavLink} from 'react-router-dom'
import BootstrapTable, {
    BootstrapTableProps,
    ColumnFormatter,
    ExpandRowProps
} from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit'
import _ from 'lodash'

// App
import SvgExpandOn from '../iconComponents/ExpandOn'
import SvgExpandOff from '../iconComponents/ExpandOff'
import SelectSearch from '../Inputs/SelectSearch'

interface expandRow<T extends object = any, E = any> {
    dataField: string
    text: string
    classNameTd: string
    classNameTh: string
    formatter?: ColumnFormatter<T, E>
}

interface button {
    link: string
    text: string
}

interface IFilter {
    value?: any
    onChange?: any
    options?: any
    placeholder?: any
    field?: string
    loading?: boolean
}

interface IAutoTable extends BootstrapTableProps {
    secondBtn?: button | undefined
    button?: button | undefined
    filter?: IFilter
    expandRowTable?: expandRow[] | undefined
}

const AutoTable: React.FC<IAutoTable> = (
    {
        data,
        columns,
        keyField,
        secondBtn,
        selectRow,
        button,
        filter,
        expandRowTable = undefined
    }) => {
    const {SearchBar} = Search
    const [dataState, setDataState] = useState(() => data)

    const expandRow: ExpandRowProps<any> = {
        expandColumnPosition: 'right',
        renderer: renderer,
        showExpandColumn: true,
        expandHeaderColumnRenderer: expandHeaderColumnRenderer,
        expandColumnRenderer: expandColumnRenderer
    }

    const onChangeFilter = (option) => {
        if (option) {
            setDataState(data.filter((item) =>
                _.get(item, filter.field) === option.value))
        } else {
            setDataState(data)
        }
    }

    function renderer(row: any, rowIndex: number) {
        const tableHead = expandRowTable?.map((item, index) => {
            return (
                <th className={item.classNameTh} key={`${item.text}-${index}`}>
                    {item.text}
                </th>
            )
        })
        const tableBody = expandRowTable?.map((item, index) => {
            return (
                <td
                    className={item.classNameTd}
                    key={`${item.dataField}-${index}`}
                >
                    {item.formatter
                        ? item.formatter(row[item.dataField], row, rowIndex, '')
                        : row[item.dataField]}
                </td>
            )
        })
        return (
            <table className='table'>
                <thead>
                <tr>{tableHead}</tr>
                </thead>
                <tbody>
                <tr>{tableBody}</tr>
                </tbody>
            </table>
        )
    }

    function expandHeaderColumnRenderer() {
        return <span>{null}</span>
    }

    function expandColumnRenderer({expanded}) {
        if (expanded) {
            return <SvgExpandOn width={5} height={17}/>
        }
        return <SvgExpandOff width={5} height={17}/>
    }

    return (
        <ToolkitProvider
            bootstrap4
            keyField={keyField}
            data={dataState}
            columns={columns}
            search
        >
            {(props) => (
                <div>
                    <div
                        className='flex-sm-row d-flex
                    justify-content-between mb-2 flex-column '
                    >
                        <div className='d-flex'>
                            <div className='searchBar mr-2'>
                                <SearchBar
                                    {...props.searchProps}
                                    placeholder='Поиск...'
                                />
                            </div>
                            {filter
                                ? <SelectSearch
                                    isLoading={filter.loading}
                                    value={filter.value}
                                    onChange={onChangeFilter}
                                    options={filter.options}
                                    placeholder={filter.placeholder}
                                    isSearchable={true}
                                />
                                : null
                            }
                        </div>

                        <div>
                            {secondBtn ? (
                                <NavLink
                                    to={`/${secondBtn.link}`}
                                    className='btn addButton mr-3'
                                >
                                    {secondBtn.text}
                                </NavLink>
                            ) : null}
                            {button ? (
                                <NavLink
                                    to={`/${button.link}`}
                                    className='btn addButton'
                                >
                                    {button.text}
                                </NavLink>
                            ) : null}
                        </div>
                    </div>
                    <div className='card'>
                        <div className='card-body text-muted'>
                            <BootstrapTable
                                pagination={paginationFactory({})}
                                bordered={false}
                                expandRow={
                                    expandRowTable ? expandRow : undefined
                                }
                                selectRow={
                                    selectRow ? selectRow : undefined
                                }
                                {...props.baseProps}
                            />
                        </div>
                    </div>
                </div>
            )}
        </ToolkitProvider>
    )
}

export default AutoTable
