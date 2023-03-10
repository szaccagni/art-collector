import './NewBoardForm.css'
import {useState} from 'react'

export default function NewBoardForm({user, addBoard, board}) {
    const [formData, setFormData] = useState(board)   
    const formType = board.name !== '' ? 'update' : 'new' 

    function handleChange(e) {
        const newFormData = {
            ...formData,
            [e.target.name] : e.target.value
        }
        setFormData(newFormData)
    }

    function handleSave() {
        const newBoard ={
            name: formData.name,
            description: formData.description,
            user : user,
        }
        addBoard(newBoard)
        setFormData({name: '', description: ''})
    }

    function handleUpdate() {
        console.log('i worked')
    }

    return (
        <div className='board-form'>
            <input className='board-form-name' name="name" placeholder="name" value={formData.name} onChange={handleChange}></input>
            <input className='board-form-description' name="description" placeholder="description" value={formData.description} onChange={handleChange}></input>
            
            <button className='btn' onClick={formType === 'new' ? handleSave : handleUpdate}>save</button>
        </div>
    )
}