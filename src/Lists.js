// import React, { useState } from 'react'
import { ListItem } from "./ListItem"

const Lists = ( {items,handleCheck,handleDelete,search} ) => {

    const listItems = items.filter((item) => { 
        return ((item.item).toLowerCase()).includes(search.toLowerCase())
      });

      // '' is included in every string, consider this as null set to be subset of every set 
    
      if(search === '' && listItems.length===0) 
      {
        return ( <> <p style = {{marginTop : '2rem'}}>Your List is Empty</p> </>)
      }
      
      return (
        <> 
            {listItems.length ? (
            <ul>
                {listItems.map((item) => { return (
                   <ListItem 
                        key = {item.id}
                        // We can eliminate the key declaration in <li> as we are doing it here
                        item = {item}
                        handleCheck = {handleCheck}
                        handleDelete = {handleDelete}
                   />
                )})}
            </ul>) : (
            <p>No matching results found</p> )}
        </>
      )
}

export default Lists

// Using <> and </> is allowed in JSX and is called a fragment, now we have included the main element in App.js file so we can use a fragment here 