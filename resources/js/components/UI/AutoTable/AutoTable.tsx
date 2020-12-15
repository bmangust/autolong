// React
import React, {useEffect, useState} from 'react'

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
import {push} from 'connected-react-router'
import {useDispatch} from 'react-redux'

// App
import SvgExpandOn from '../iconComponents/ExpandOn'
import SvgExpandOff from '../iconComponents/ExpandOff'
import SelectSearch from '../Inputs/SelectSearch'

interface expandRow<T extends object = any, E = any> {
    dataField: string
    text: string
    classNameTd: string
    classNameTh: string
    headerStyle?: React.CSSProperties | (() => React.CSSProperties)
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
    type?: string
    filterArrKey?: string
    isMulti?: boolean
}

interface IAutoTable extends BootstrapTableProps {
    secondBtn?: button | undefined
    button?: button | undefined
    filter?: IFilter
    expandRowTable?: expandRow[] | undefined
    header?: boolean
    rowClickLink?: string
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
        expandRowTable = undefined,
        header = true,
        rowClickLink
    }) => {
    const {SearchBar} = Search
    const [dataState, setDataState] = useState<any>([])
    const dispatch = useDispatch()

    useEffect(() => {
        return setDataState(data)
    }, [data])

    const expandRow: ExpandRowProps<any> = {
        expandColumnPosition: 'right',
        renderer: renderer,
        expandByColumnOnly: true,
        showExpandColumn: true,
        expandHeaderColumnRenderer: expandHeaderColumnRenderer,
        expandColumnRenderer: expandColumnRenderer
    }

    const onChangeFilter = (option) => {
        if (option && filter) {
            setDataState(data.filter((item) => {
                    if (filter.filterArrKey) {
                        const target = _.get(item, filter.field)
                        const arr = target.map((item) =>
                            item[filter.filterArrKey])
                        if (option.length === 0) {
                            return true
                        }
                        const optionsArr = option.map(({value}) => value)
                        const intersection = arr
                            .filter(element => optionsArr.includes(element))
                        return !!intersection.length
                    } else {
                        return _.get(item, filter.field) === option.value
                    }
                }
            ))
        } else {
            setDataState(data)
        }
    }

    const onChangeCheckFilter = (e) => {
        const isChecked = e.target.checked
        if (isChecked) {
            setDataState(data.filter((item) =>
                _.get(item, filter.field).length))
        } else {
            setDataState(data)
        }
    }

    const tableRowEvents = {
        onClick: (e, row) => {
            const link = `/${rowClickLink}/${row.id}`
            dispatch(push(link))
        }
    }

    const paginationOptions = {
        onSizePerPageChange: (sizePerPage) => {
            localStorage.setItem('autolong_size_per_page', sizePerPage)
        },
        sizePerPage: Number(localStorage.getItem('autolong_size_per_page')) || 10
    }

    let select = <SelectSearch
        isLoading={filter?.loading}
        value={filter?.value}
        onChange={onChangeFilter}
        options={filter?.options}
        placeholder={filter?.placeholder}
        isSearchable={true}
        isMulti={filter?.isMulti}
    />

    if (filter?.type === 'checkbox') {
        select = <div className='align-items-center d-flex'>
            <label className='w-100 mr-3 mb-0' htmlFor='cargo'>
                {filter?.placeholder}
            </label>
            <div className='custom-control custom-switch'>
                <input
                    type='checkbox'
                    name='filter'
                    id='filter'
                    onChange={onChangeCheckFilter}
                    className='custom-control-input'/>
                <label className="custom-control-label"
                       htmlFor='filter'>
                </label>
            </div>
        </div>
    }

    function renderer(row: any, rowIndex: number) {
        const tableHead = expandRowTable?.map((item, index) => {
            return (
                <th style={item.headerStyle} className={item.classNameTh} key={`${item.text}-${index}`}>
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
                    {header
                        ? <div className='flex-lg-row d-flex justify-content-between mb-2 flex-column '>
                            <div className='d-flex flex-lg-row flex-column mb-lg-0 mb-2'>
                                <div className='searchBar mr-lg-2 mr-0'>
                                    <SearchBar
                                        {...props.searchProps}
                                        placeholder='Поиск...'
                                    />
                                </div>
                                {filter
                                    ? select
                                    : null
                                }
                            </div>

                            <div>
                                {secondBtn
                                    ? <NavLink
                                        to={`/${secondBtn.link}`}
                                        className='btn addButton mr-3'>
                                        {secondBtn.text}
                                    </NavLink>
                                    : null}
                                {button
                                    ? <NavLink
                                        to={`/${button.link}`}
                                        className='btn addButton'>
                                        {button.text}
                                    </NavLink>
                                    : null}
                            </div>
                        </div>
                        : null
                    }

                    <div className='card'>
                        <div className='card-body text-muted'>
                            <BootstrapTable
                                pagination={paginationFactory(paginationOptions)}
                                bordered={false}
                                expandRow={expandRowTable ? expandRow : undefined}
                                rowEvents={rowClickLink ? tableRowEvents : undefined}
                                selectRow={selectRow ? selectRow : undefined}
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
