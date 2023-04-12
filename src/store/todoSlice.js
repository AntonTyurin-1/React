import { createSlice } from '@reduxjs/toolkit'

//-------------Функция фильтрации-------------

function filtered(key, todo) {
   todo.validFilter = false

   if (key === 'all') todo.validFilter = true
   if (key === 'completed' && todo.completed) todo.validFilter = true
   if (key === 'not_completed' && !todo.completed) todo.validFilter = true

   return todo
}
//---------------------------------

export const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
      keyFilter: 'all',
   },
   reducers: {
      addTodo(state, action) {
         const newTodo = {
            id: +new Date(),
            title: action.payload.title,
            completed: false,
            validFilter: false,
         }
         
			 
         const modNewTodo = filtered(state.keyFilter, newTodo)
         state.todos.push(modNewTodo)
			localStorage.setItem('todos', JSON.stringify(modNewTodo))
      },
      deleteTodo(state, action) {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
      },
      toggleTodo(state, action) {
         const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id)
         toggledTodo.completed = !toggledTodo.completed
         filtered(state.keyFilter, toggledTodo)
      },
      toggleAllTodo(state, action) {
         state.todos = state.todos.map((todo) => {
				if (todo.completed === false) {
					return {...todo, completed: true}
				}
           return {...todo, completed: false}
         })
      },

      filteredTodo(state, action) {
         state.keyFilter = action.payload

         state.todos = state.todos.map((todo) => {
            return filtered(state.keyFilter, todo)
         })
      },
		
		changeInputType(state, action) {
			const input = action.payload.current
			input.type = 'text'
			input.addEventListener('keydown', function (event) {
				if (event.code === 'Enter') input.blur()
			})
			filtered(state.keyFilter, )
		},
   },
})

export const { addTodo, deleteTodo, toggleTodo, toggleAllTodo, filteredTodo } = todoSlice.actions
