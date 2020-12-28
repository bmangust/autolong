// React
import React from 'react'

// Third-party
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import Select from 'react-select'

// Typescript
import {IContainer} from '../IContainers'

// Actions
import {changeContainerStatus, editContainerAdmin} from '../../../store/actions/containers'

// App
import Form from '../../UI/Form/Form'
import Input from '../../UI/Inputs/Input/Input'
import statuses from '../../../../statuses/statuses.json'

type Props = {
    container: IContainer
    setIsOpen: (boolean) => void
}

const ContainerEdit: React.FC<Props> = (props) => {
    const {container, setIsOpen} = props
    const dispatch = useDispatch()
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {
            arrivalDate: container.arrivalDate || '',
            name: container.name,
            identifier: container.identifier || ''
        }
    })

    const onStatusChange = (newValue: { label: string, value: string }) => {
        dispatch(changeContainerStatus(container.id, {status: newValue.value}))
    }

    const containerStatuses = Object.entries(statuses.containerStatuses)
        .map(([key, value]) => {
            return {label: value, value: key}
        })

    const editContainerHandler = handleSubmit((formValues) => {
        dispatch(editContainerAdmin(container.id, formValues))
    })
    return <Form onSubmit={editContainerHandler}>
        <div className='row'>
            <Input
                type='text'
                ref={register({required: true})}
                label='Название контейнера'
                placeholder='Название контейнера'
                name='name'
                required
            />
            {errors.name && (
                <small>Это поле обязательно</small>
            )}
            <div className="col-lg-6">
                <label
                    className='w-100 required'
                    style={{marginTop: 10}}
                    htmlFor='status'>
                    Выберите статус
                </label>
                <Select
                    placeholder='Выберите поставщика'
                    classNamePrefix='select-mini'
                    className='select-mini'
                    defaultValue={{label: statuses.containerStatuses[container.status], value: container.status}}
                    onChange={onStatusChange}
                    options={containerStatuses}
                />
            </div>
            <Input
                ref={register}
                type='date'
                label='Дата выхода'
                name='releaseDate'
            />
            <Input
                ref={register}
                type='date'
                label='Дата выхода'
                name='arrivalDate'
            />
            <Input
                ref={register}
                type='text'
                label='Идентификатор байкал'
                name='identifier'
                placeholder='Идентификатор байкал'
            />
        </div>
        <button
            className='btn btn-success mr-3'
            type='submit'>
            Сохранить
        </button>
        <button
            className='btn btn-light'
            type='button'
            onClick={() => setIsOpen(false)}>
            Закрыть
        </button>
    </Form>
}

export default ContainerEdit
