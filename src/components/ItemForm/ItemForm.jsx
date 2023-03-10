import './ItemForm.css'
import { useState } from 'react'

export default function ItemForm({addItem}) {
    const [ formData, setFormData ] = useState({
        title: '',
        url: ''
    })

    function handleChange(e) {
        const newFormData = {
            ...formData,
            [e.target.name] : e.target.value
        }
        setFormData(newFormData)
    }

    return (
        <div className='item-form-container flex-container'>
            <input name='title' placeholder='title' value={formData.title} onChange={handleChange}></input>
            <input name='url' placeholder='url' value={formData.url} onChange={handleChange}></input>
            <button className='btn' onClick={() => addItem(formData)}>add to board</button>
        </div>
    )
}