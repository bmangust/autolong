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
import FileInput from '../UI/Inputs/FileInput/FileInput'

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
            if ('providerStamp' in formValues) {
                formValues.providerStamp = formValues.providerStamp[0] || ''
            }
            if ('importerStamp' in formValues) {
                formValues.importerStamp = formValues.importerStamp[0] || ''
            }
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
                                    defaultValue={value || ''}
                                    render={({value, onChange}) => (
                                        <TextEditor
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}/>
                            </label>
                        </>
                    } else if (key === 'providerStamp') {
                        return <FileInput
                            label='providerStamp'
                            control={control} name='providerStamp'/>
                    } else if (key === 'importerStamp') {
                        return <FileInput
                            label='importerStamp'
                            control={control} name='importerStamp'/>
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
                                    defaultValue=''
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
                                label='Дата окончания контракта'
                                ref={register} name='contractEndDate'/>
                            : null}
                        {!('classificationEn' in invoiceInputs)
                            ? <Input
                                id='classificationEn' type='text'
                                label='Классификация En'
                                ref={register} name='classificationEn'/>
                            : null}
                        {!('classificationRu' in invoiceInputs)
                            ? <Input
                                id='classificationRu' type='text'
                                label='Классификация Ru'
                                ref={register} name='classificationRu'/>
                            : null}
                        {!('directorRu' in invoiceInputs)
                            ? <Input
                                id='directorRu' type='text'
                                label='Директор Ru'
                                ref={register} name='directorRu'/>
                            : null}
                        {!('directorEn' in invoiceInputs)
                            ? <Input
                                id='directorEn' type='text'
                                label='Директор En'
                                ref={register} name='directorEn'/>
                            : null}
                        {!('providerStamp' in invoiceInputs)
                            ? <FileInput
                                label='Печать поставщика'
                                control={control} name='providerStamp'/>
                            : null}
                        {!('importerStamp' in invoiceInputs)
                            ? <FileInput
                                label='Печать импортера'
                                control={control} name='importerStamp'/>
                            : null}
                    </>
                    : null
                }
                {type === 'invoice'
                    ? <>
                        {!('paymentTerms' in invoiceInputs)
                            ? <Input
                                id='paymentTerms' type='text'
                                label='paymentTerms'
                                ref={register} name='paymentTerms'/>
                            : null}
                        {!('additionalField' in invoiceInputs)
                            ? <Input
                                id='additionalField' type='text'
                                label='additionalField'
                                ref={register} name='additionalField'/>
                            : null}
                    </>
                    : null
                }
            </div>
            <div className='row mt-3'>
                <div className="col-lg-6">
                    <button className='btn btn-success w-100 text-center'>
                        Создать
                    </button>
                </div>
                <div className="col-lg-6">
                    <button onClick={onCloseModalHandler}
                        className='btn btn-light w-100
                        mt-lg-0 mt-3 text-center'>
                        Отменить
                    </button>
                </div>
            </div>
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
