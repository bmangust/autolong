// React
import React, {useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'

// Styles
import classes from './DocumentsCreate.module.css'

// Typescript
import {IOrdersRootState} from '../Orders/IOrders'

// Actions
import {createOrderInvoice, fetchOrderInvoice} from '../../store/actions/orders'

// App
import Modal from '../UI/Modal/Modal'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import Form from '../UI/Form/Form'
import Input from '../UI/Inputs/Input/Input'
import TextEditor from '../UI/TextEditor/TextEditor'

const DocumentsCreate: React.FC<{ id: number }> = ({id}) => {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState('')

    let modal

    const {invoiceInputs, loadingInvoice, error} = useSelector(
        (state: IOrdersRootState) => ({
            invoiceInputs: state.ordersState.invoiceInputs,
            loadingInvoice: state.ordersState.loadingInvoice,
            error: state.ordersState.error
        }))

    const {
        control, register, handleSubmit
    } = useForm()

    const fetchInvoiceHandler = (id, type) => {
        setType(type)
        setIsOpen(true)
        dispatch(fetchOrderInvoice(id, type))
    }

    const onCloseModalHandler = () => {
        setIsOpen(false)
    }

    const documentCreateSubmitHandler =
        handleSubmit((formValues) => {
            setIsOpen(false)
            dispatch(createOrderInvoice(id, formValues, type))
        })

    modal = <>
        <Form onSubmit={documentCreateSubmitHandler}>
            <div className='row'>
                {Object.entries(invoiceInputs).map(([key, value]) => {
                    if (key === 'requisites') {
                        return <>
                            <label className='col-12'
                                   htmlFor='requisites'>Реквизиты
                                <Controller
                                    name="requisites"
                                    control={control}
                                    defaultValue={value}
                                    render={({value, onChange}) => (
                                        <TextEditor
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}/>
                            </label>
                        </>
                    } else {
                        return <Input
                            key={key} id={key}
                            ref={register} name={key}
                            defaultValue={value} label={key}/>
                    }
                })}
                {type === 'contract'
                    ? <>
                        {!('requisites' in invoiceInputs)
                            ? <label className='col-12'
                                     htmlFor='requisites'>Реквизиты
                                <Controller
                                    name="requisites"
                                    control={control}
                                    render={({value, onChange}) => (
                                        <TextEditor
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}/>
                            </label>
                            : null}
                        {!('contractEndDate' in invoiceInputs)
                            ? <Input
                                id='contractEndDate' type='date'
                                label='contractEndDate'
                                ref={register} name='contractEndDate'/>
                            : null}
                        {!('classificationEn' in invoiceInputs)
                            ? <Input
                                id='classificationEn' type='text'
                                label='classificationEn'
                                ref={register} name='classificationEn'/>
                            : null}
                        {!('classificationRu' in invoiceInputs)
                            ? <Input
                                id='classificationRu' type='text'
                                label='classificationRu'
                                ref={register} name='classificationRu'/>
                            : null}
                        {!('directorRu' in invoiceInputs)
                            ? <Input
                                id='directorRu' type='text'
                                label='directorRu'
                                ref={register} name='directorRu'/>
                            : null}
                        {!('directorEn' in invoiceInputs)
                            ? <Input
                                id='directorEn' type='text'
                                label='directorEn'
                                ref={register} name='directorEn'/>
                            : null}
                    </>
                    : null
                }
            </div>
            <button className='btn btn-success mr-4'>
                Создать
            </button>
            <button onClick={onCloseModalHandler}
                    className='btn btn-light'>
                Отменить
            </button>
        </Form>
    </>

    if (error) {
        modal = <Error/>
    }
    if (loadingInvoice) {
        modal = <Loader/>
    }

    return (
        <>
            <div className={classes.invoiceBtnBlock}>
                <button
                    onClick={() =>
                        fetchInvoiceHandler(
                            id, 'invoice')}
                    className={classes.invoiceBtn}>
                    Invoice
                </button>
                <button
                    onClick={() =>
                        fetchInvoiceHandler(
                            id, 'proforma')}
                    className={classes.invoiceBtn}>
                    Proforma
                </button>
                <button
                    onClick={() =>
                        fetchInvoiceHandler(
                            id, 'contract')}
                    className={classes.invoiceBtn}>
                    Контракт
                </button>
            </div>
            <Modal title={`Генерация документа ${type}`} isOpen={isOpen}>
                {modal}
            </Modal>
        </>
    )
}

export default DocumentsCreate
