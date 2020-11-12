// React
import React, {useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'

// Styles
import classes from './DocumentsCreate.module.css'

// Typescript
import {IOrdersRootState} from '../Orders/IOrders'

// Actions
import {fetchOrderInvoice} from '../../store/actions/orders'

// App
import Modal from '../UI/Modal/Modal'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import Form from '../UI/Form/Form'
import Input from '../UI/Inputs/Input/Input'
import {useForm} from 'react-hook-form'

const DocumentsCreate: React.FC<{ id: number }> = ({id}) => {
    const dispatch = useDispatch()

    const [isOpen, setIsOpen] = useState(false)

    let modal

    const {invoiceInputs, loadingInvoice, error} = useSelector(
        (state: IOrdersRootState) => ({
            invoiceInputs: state.ordersState.invoiceInputs,
            loadingInvoice: state.ordersState.loadingInvoice,
            error: state.ordersState.error
        }))

    const {
        register, handleSubmit, errors
    } = useForm()

    const fetchInvoiceHandler = (id, type) => {
        setIsOpen(true)
        dispatch(fetchOrderInvoice(id, type))
    }

    const documentCreateSubmitHandler =
        handleSubmit((formValues) => {
            console.log(formValues)
        })

    if (error) {
        modal = <Error/>
    }
    if (loadingInvoice) {
        modal = <Loader/>
    }
    if (invoiceInputs) {
        modal = <>
            <Form onSubmit={documentCreateSubmitHandler}>
                {Object.entries(invoiceInputs).map(([key, value]) => (
                    <Input key={key} ref={register} id={key}
                           value={value}
                           label={key} error={!!errors}/>
                ))}
                <button className='btn btn-success'>
                    Создать
                </button>
            </Form>
        </>
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
            <Modal title='Генерация документов' isOpen={isOpen}>
                {modal}
            </Modal>
        </>
    )
}

export default DocumentsCreate
