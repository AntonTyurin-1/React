import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleTodo } from '../../store/todoSlice'
import './TodoItem.css'

export const TodoItem = ({ id, title, completed }) => {
   const dispatch = useDispatch()
   const [text, setText] = useState(title)
   
   const ref = useRef(null)

   const changeInputType = () => {
		
      const input = ref.current
      input.type = 'text'
      input.addEventListener('keydown', function (event) {
         if (event.code === 'Enter') input.blur()
      })
   }
   return (
      <li key={id} className="list_item">
         <input
            className="list_item__input"
            type="checkbox"
            checked={completed}
            onChange={() => dispatch(toggleTodo({ id }))}
         />

         <input
            ref={ref}
            type="button"
            className="list_item__text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={changeInputType}
         />
         <button className="list_item__btn" onClick={() => dispatch(deleteTodo({ id }))}>
            delet
         </button>
      </li>
   )
}
