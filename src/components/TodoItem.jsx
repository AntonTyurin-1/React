import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, toggleStatus } from '../store/todoSlice'

export const TodoItem = ({id, title, completed}) => {
   const dispatch = useDispatch()

   return (
      <li key={id}>
         <label>
            <input type='checkbox' checked={completed} onChange={() => dispatch(toggleStatus(id))} />
            &nbsp;
            <span>{title}</span>
         </label>
         <button onClick={() => dispatch(deleteTodo(id))}>delet</button>
      </li>
   )
}
