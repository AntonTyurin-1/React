import React, { useState } from 'react'
import { TodoItem } from '../TodoItem/TodoItem'
import { useDispatch, useSelector } from 'react-redux'
import { filteredTodo, toggleAllTodo } from '../../store/todoSlice'
import './TodoList.css'

export const TodoList = () => {
	const [checked, setChecked] = useState(false)
   const todos = useSelector((state) => state.todos.todos)

   const dispatch = useDispatch()
	
	const handlerChange = () => {
		dispatch(toggleAllTodo())
		setChecked(!checked)
	}
   return (
      <>
         <div className="btns">
            <button className="btn" onClick={() => dispatch(filteredTodo('completed'))}>
               Completed
            </button>
            <button className="btn" onClick={() => dispatch(filteredTodo('not_completed'))}>
               Not completed
            </button>
            <button className="btn" onClick={() => dispatch(filteredTodo('all'))}>
               All
            </button>
         </div>
         {todos.length > 1 ? (
            <label className="check_all">
               <input className="check_all__input" type="checkbox" onChange={() => handlerChange()} checked = {checked}/>
               {checked ? 'Deselect All' : 'Select All'}
            </label>
         ) : null}
         <ul className="list" >
            {todos.map((todo) => {
               if (todo.validFilter === false) return null

               return <TodoItem key={todo.id} {...todo} />
            })}
         </ul>
      </>
   )
}
