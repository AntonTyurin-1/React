import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//----------------FETCH---------------------

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async function (_, { rejectWithValue }) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    if (!response.ok) {
      throw new Error('ServerError!')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const deleteTodo = createAsyncThunk('todos/deletTodo', async function (id, { rejectWithValue, dispatch }) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error("Can't delete task. Server error")
    }
    dispatch(removeTodo({ id }))
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const toggleStatus = createAsyncThunk(
  'todos/toggleSatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id)
   
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complited: !todo.completed,
        }),
      })
      if (!response.ok) {
        throw new Error("Can't toggle task. Server error")
      }

      dispatch(toggleTodoCompleted({id}))

    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const addNewTodo = createAsyncThunk(
   'todos/addNewTodo',
   async function (title, {rejectWithValue, dispatch})   {
      try{
         const todo = {
            title : title,
            userId: 1,
            completed: false,
         }
         const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo) 
         })
         if(!response.ok) {
            throw new Error('Can\'t add todo. Server Error')
         }
         const data = await response.json()
         dispatch(addTodo(data))
      } catch(error) {
         return rejectWithValue(error.message)
      }
   }
)
//----------------HELPERS-------------------
const setError = (state, action) => {
  state.status = 'rejected'
  state.error = action.payload
}

//-------------------------------------------
export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  //  ---------------REDUSERS-----------------
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    toggleTodoCompleted: (state, action) => {
      const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id)
      toggledTodo.completed = !toggledTodo.completed
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },

    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.todos = action.payload
    },

    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
    [addNewTodo.rejected]: setError,
  },
})

 const { addTodo, removeTodo, toggleTodoCompleted } = todoSlice.actions
