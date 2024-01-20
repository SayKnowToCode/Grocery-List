import React from 'react'
import { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

// const inputRef = useRef();
// This is not allowed here as hooks should be called only in a func

const AddItem = ({newItem,setNewItem,handleSubmit}) => {

    const inputRef = useRef();

  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="addItem">Add Item</label>

        <input 
            type="text" 
            id='addItem' 
            placeholder='Add Item'
            required
            autoFocus
            ref = {inputRef}
            value={newItem.trim()}
            onChange={(event) => {setNewItem(event.target.value)}}
        />

        <button
            type="submit"
            aria-label = "Add Item"
            onClick={() => {inputRef.current.focus()}}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem