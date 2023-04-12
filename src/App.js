import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Loader } from './Loader/Loader'
import { TodoList } from './components/TodoList/TodoList'
import { InputFeild } from './components/InputFeild/InputFeild'
import { addTodo, fetchTodos } from './store/todoSlice'

import './App.css'
// -------------------USE--------------------
function App() {
   const [title, setTitle] = useState('')
   const dispatch = useDispatch()
   const { status, error } = useSelector((state) => state.todos)

   const addTask = (e) => {
      e.preventDefault()
      if (title.trim().length) {
         dispatch(addTodo({ title }))
         setTitle('')
      }
   }

  

   return (
      <div className="App">
         {status === 'loading' && <Loader />}
         {error && <h2>An error happend: {error}</h2>}
         <InputFeild title={title} setTitle={setTitle} addTodo={addTask} />
         <TodoList />
      </div>
   )
}

export default App
