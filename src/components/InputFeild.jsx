import React from 'react'

export const InputFeild = ({title, setTitle, addTodo}) => {
   
   return (
      <label>
         <input value={title} onChange={(e) => setTitle(e.target.value)} />
         <button className='btn' onClick={addTodo}>Add todo</button>
      </label>
   )
}
