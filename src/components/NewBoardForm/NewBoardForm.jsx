import {useState} from 'react'

export default function NewBoardForm({user, addBoard}) {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })    

    function handleChange(e) {
        const newFormData = {
            ...formData,
            [e.target.name] : e.target.value
        }
        setFormData(newFormData)
    }

    function handleClick() {
        const newBoard ={
            name: formData.name,
            description: formData.description,
            user : user,
        }
        addBoard(newBoard)
        setFormData({name: '', description: ''})
    }

    return (
        <>
            <input name="name" placeholder="name" value={formData.name} onChange={handleChange}></input>
            <input name="description" placeholder="description" value={formData.description} onChange={handleChange}></input>
            <button onClick={handleClick}>save and add images!</button>
        </>
    )
}