import React, { useState } from 'react'
import { TodoItem } from './TodoItem'
import {  useSelector } from 'react-redux'



export const TodoList = () => {
   const todos = useSelector(state => state.todos.todos)
   

   const [filtered, setFiltered] = useState(todos)
   
   const filteredTodo = (complited) => {
      if (complited === 'all') {
         setFiltered(todos)
      }
      else {
         const newfiltered = [...todos].filter(item => item.complited === complited)
         setFiltered(newfiltered)
      }
   }
   
   const toggleTodoCompletedAll = () => {
      const toggleTodoAll = filtered.map(todo => ({
         ...todo, complited: !todo.complited
      }))
      setFiltered(toggleTodoAll)
   }
   


   return (
      <>
         <div className='btns'>
            <button className='btn' onClick={() => filteredTodo(true)}>complited</button>
            <button className='btn' onClick={() => filteredTodo(false)}>not complited</button>
            <button className='btn' onClick={() => filteredTodo('all')}>All</button>
         </div>
         {
            todos.length > 1
            ?
               <label>
                  <input type='checkbox' checked={filtered.complited} onChange={toggleTodoCompletedAll} />
                  выбрать все
               </label>
            : 
               null
         }
         <ul>
            {
               todos.map(todo => <TodoItem
                  key={todo.id}
                  {...todo}
               />
               )
            }
         </ul>
      </>
   )
}
