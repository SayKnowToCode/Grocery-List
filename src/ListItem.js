import {FaTrashAlt} from 'react-icons/fa'

import React from 'react'

export const ListItem = ({item,handleCheck,handleDelete}) => {
  
    return (
    <li className='item'>
    <input 
        id = {item.id}
        type="checkbox" 
        onChange={() => handleCheck(item.id)}
        checked = {item.checked} 
    />
    <label 
        htmlFor = {item.id}
        style={ (item.checked) ? {textDecoration : 'line-through'} : null }
        onDoubleClick={() => handleCheck(item.id)}
    
    > {item.item} </label>

    <FaTrashAlt 
        role='button' 
        onClick={() => handleDelete(item.id)}
        tabIndex="0" 
    />

</li>
  )
}
