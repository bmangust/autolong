// React
import React, {useState} from 'react'

// Third-party
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Select from 'react-select'

// Styles
import classes from './DocumentsCreate.module.css'

// Typescript
import {IOrdersRootState} from '../Orders/IOrders'

// Actions
import {
    createOrderInvoice,
    fetchOrderInvoice,
    removeStampByType
} from '../../store/actions/orders'

// App
import Modal from '../UI/Modal/Modal'
import Error from '../UI/Error/Error'
import Loader from '../UI/Loader/Loader'
import Form from '../UI/Form/Form'
import Input from '../UI/Inputs/Input/Input'
import TextEditor from '../UI/TextEditor/TextEditor'
import FileInput from '../UI/Inputs/FileInput/FileInput'
import {mapOrder} from '../../utils'
import translate from '../UI/Inputs/Input/inputTranslate.json'
import SvgDocument from '../UI/iconComponents/Document'

const DocumentsCreate: React.FC<{ id: number, date: number }> = ({id, date}) => {
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

    const removeStamp = (type, modalType) => {
        dispatch(removeStampByType(id, type, modalType))
    }

    const onCloseModalHandler = () => {
        setIsOpen(false)
    }

    const currencySelect = <Select
        placeholder='Выберите валюту'
        classNamePrefix='select-mini'
        className='select-mini'
    />

    const currencyOptions = [
        {
            label: 'Рубль',
            value: 'rub'
        },
        {
            label: 'Доллар',
            value: 'usd'
        },
        {
            label: 'Юань',
            value: 'cny'
        }
    ]

    const sorting = [
        'supply', 'name', 'directorRu',
        'directorEn', 'date', 'contractEndDate',
        'classificationRu', 'classificationEn',
        'requisites', 'importerStamp', 'providerStamp',
        'importerSignature', 'providerSignature']

    const documentCreateSubmitHandler = handleSubmit((formValues) => {
        if ('providerStamp' in formValues) {
            formValues.providerStamp = formValues.providerStamp[0] || ''
        }
        if ('importerStamp' in formValues) {
            formValues.importerStamp = formValues.importerStamp[0] || ''
        }
        if ('importerSignature' in formValues) {
            formValues.importerSignature =
                formValues.importerSignature[0] || ''
        }
        if ('providerSignature' in formValues) {
            formValues.providerSignature =
                formValues.providerSignature[0] || ''
        }
        formValues.currency = formValues.currency?.value
        setIsOpen(false)
        dispatch(createOrderInvoice(id, formValues, type, date))
    })

    modal = <>
        <Form onSubmit={documentCreateSubmitHandler}>
            <div className='row'>
                {mapOrder(Object.entries(invoiceInputs), sorting)
                    .map(([key, value]) => {
                        if (key === 'requisites') {
                            return <label
                                key={key} className='col-12'
                                htmlFor='requisites'>Реквизиты импортера
                                <Controller
                                    name="requisites"
                                    control={control}
                                    defaultValue={value || ''}
                                    render={({value, onChange}) => (
                                        <TextEditor
                                            placeholder='Реквизиты импортера'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}/>
                            </label>
                        } else if (key === 'providerStamp') {
                            return <div className='col-12' key={key}>
                                <FileInput
                                    label='providerStamp'
                                    control={control} name='providerStamp'/>
                                {value
                                    ? <button
                                        type='button'
                                        onClick={() => removeStamp(key, type)}
                                        className='btn btn-link'>
                                        Удалить печать поставщика
                                    </button>
                                    : null
                                }

                            </div>
                        } else if (key === 'providerSignature') {
                            return <div className='col-12' key={key}>
                                <FileInput
                                    label='providerSignature'
                                    control={control} name='providerSignature'/>
                                {value
                                    ? <button
                                        type='button'
                                        onClick={() => removeStamp(key, type)}
                                        className='btn btn-link'>
                                        Удалить подпись поставщика
                                    </button>
                                    : null
                                }
                            </div>
                        } else if (key === 'importerSignature') {
                            return <div className='col-12' key={key}>
                                <FileInput
                                    label='importerSignature'
                                    control={control} name='importerSignature'/>
                                {value
                                    ? <button
                                        type='button'
                                        onClick={() => removeStamp(key, type)}
                                        className='btn btn-link'>
                                        Удалить подпись импортера
                                    </button>
                                    : null
                                }
                            </div>
                        } else if (key === 'importerStamp') {
                            return <div className='col-12' key={key}>
                                <FileInput
                                    label='importerStamp'
                                    control={control} name='importerStamp'/>
                                {value
                                    ? <button
                                        type='button'
                                        onClick={() => removeStamp(key, type)}
                                        className='btn btn-link'>
                                        Удалить печать импортера
                                    </button>
                                    : null
                                }
                            </div>
                        } else if (key === 'currency') {
                            return <div className="col-lg-6" style={{margin: '10px 0'}} key={key}>
                                <label htmlFor="currency">Выберите валюту</label>
                                <Controller
                                    name="currency"
                                    as={currencySelect}
                                    defaultValue={currencyOptions.find((option) => option.value === value)}
                                    options={currencyOptions}
                                    control={control}
                                />
                            </div>
                        } else {
                            return <Input
                                key={key} id={key}
                                ref={register} name={key}
                                defaultValue={value as string} label={key}/>
                        }
                    })}
                {type === 'contract'
                    ? <>
                        {!('requisites' in invoiceInputs)
                            ? <label className='col-12'
                                     htmlFor='requisites'>Реквизиты импортера
                                <Controller
                                    name="requisites"
                                    control={control}
                                    defaultValue=''
                                    render={({value, onChange}) => (
                                        <TextEditor
                                            placeholder='Реквизиты импортера'
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
                        <div className="col-12">
                            {!('providerStamp' in invoiceInputs)
                                ? <FileInput
                                    label='Печать поставщика'
                                    control={control} name='providerStamp'/>
                                : null}
                            {!('providerSignature' in invoiceInputs)
                                ? <FileInput
                                    label='Подпись поставщика'
                                    control={control} name='providerSignature'/>
                                : null}
                            {!('importerStamp' in invoiceInputs)
                                ? <FileInput
                                    label='Печать импортера'
                                    control={control} name='importerStamp'/>
                                : null}
                            {!('importerSignature' in invoiceInputs)
                                ? <FileInput
                                    label='Подпись импортера'
                                    control={control} name='importerSignature'/>
                                : null}
                        </div>
                    </>
                    : null
                }
                {type === 'invoice'
                    ? <>
                        {!('currency' in invoiceInputs)
                            ? <div className="col-lg-6" style={{margin: '10px 0'}}>
                                <label htmlFor="currency">Выберите валюту</label>
                                <Controller
                                    name="currency"
                                    as={currencySelect}
                                    defaultValue={currencyOptions[0]}
                                    options={currencyOptions}
                                    control={control}
                                />
                            </div>
                            : null}
                        {!('paymentTerms' in invoiceInputs)
                            ? <Input
                                id='paymentTerms' type='text'
                                label='Условия оплаты'
                                ref={register} name='paymentTerms'/>
                            : null}
                        {!('additionalField' in invoiceInputs)
                            ? <Input
                                id='additionalField' type='text'
                                label='Дополнительное поле'
                                ref={register} name='additionalField'/>
                            : null}
                    </>
                    : null
                }
                {type === 'proforma'
                    ? !('currency' in invoiceInputs)
                        ? <div className="col-lg-6" style={{margin: '10px 0'}}>
                            <label htmlFor="currency">Выберите валюту</label>
                            <Controller
                                name="currency"
                                as={currencySelect}
                                defaultValue={currencyOptions[0]}
                                options={currencyOptions}
                                control={control}
                            />
                        </div>
                        : null
                    : null
                }
                {type === 'account'
                    ? <div className="col-12">
                        {!('currency' in invoiceInputs)
                            ? <div style={{margin: '10px 0'}}>
                                <label htmlFor="currency">Выберите валюту</label>
                                <Controller
                                    name="currency"
                                    as={currencySelect}
                                    defaultValue={currencyOptions[0]}
                                    options={currencyOptions}
                                    control={control}
                                />
                            </div>
                            : null}
                        {!('importerStamp' in invoiceInputs)
                            ? <FileInput
                                label='Печать импортера'
                                control={control} name='importerStamp'/>
                            : null}
                        {!('importerSignature' in invoiceInputs)
                            ? <FileInput
                                label='Подпись импортера'
                                control={control} name='importerSignature'/>
                            : null}
                    </div>
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
                            className='btn btn-light w-100 mt-lg-0 mt-3 text-center'>
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
                    onClick={() => fetchInvoiceHandler(id, 'invoice')}
                    className={classes.invoiceBtn}>
                    <SvgDocument/>
                    <span>Invoice</span>
                </button>
                <button
                    onClick={() => fetchInvoiceHandler(id, 'proforma')}
                    className={classes.invoiceBtn}>
                    <SvgDocument/>
                    <span>Proforma</span>
                </button>
                <button
                    onClick={() => fetchInvoiceHandler(id, 'contract')}
                    className={classes.invoiceBtn}>
                    <SvgDocument/>
                    <span>Контракт</span>
                </button>
                <button onClick={() => fetchInvoiceHandler(id, 'account')}
                        className={classes.invoiceBtn}>
                    <SvgDocument/>
                    <span>Счёт</span>
                </button>
            </div>

            <Modal title={`Генерация документа ${type in translate ? translate[type] : type}`}
                   setIsOpen={setIsOpen} isOpen={isOpen}>
                {modal}
            </Modal>
        </>
    )
}

export default DocumentsCreate
