import React from 'react'
import './InputFeild.css'
export const InputFeild = ({ title, setTitle, addTodo }) => {
   return (
      <form className="form" onSubmit={addTodo}>
         <label className='form__label'>
            <input className="form__input" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="form__add_todo" >
               Add
            </button>
         </label>
      </form>
   )
}
