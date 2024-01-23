import './BoardForm.css'
import {useState} from 'react'

export default function BoardForm({user, board, boardFunctions, setShowComponents}) {
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
        boardFunctions.addBoard(newBoard)
        setFormData({name: '', description: ''})
    }

    function handleUpdate() {
        boardFunctions.updateBoard(formData)
        setShowComponents('init')
    }

    function handleDelete() {
        const confirmDelete = window.confirm('are you sure you want to delete this board?')
        if (confirmDelete) boardFunctions.deleteBoard(board._id)
    }

    return (
        <div className="flex-container flex-center">
            <div className='board-form'>
                <input className='board-form-name' name="name" placeholder="name" value={formData.name} onChange={handleChange}></input>
                <input className='board-form-description' name="description" placeholder="description" value={formData.description} onChange={handleChange}></input>
                
                <button className='btn' onClick={formType === 'new' ? handleSave : handleUpdate}>save</button>
                {formType === 'update' ? <button className='btn delete-board-btn' onClick={handleDelete}>delete</button> : ''}
            </div>
        </div>
    )
}