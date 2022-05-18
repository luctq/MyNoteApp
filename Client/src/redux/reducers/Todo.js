import { createSlice } from "@reduxjs/toolkit";

const makeId = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const initialState = {
  todoList: [
    {
      id: makeId(5), 
      content: "Chào mừng sử dụng Nhiệm vụ!",
      isDeteleted: false,
    },
    {
      id: makeId(5), 
      content: "Để sửa nhiệm vụ văn bản, chỉ cần chạm vào",
      isDeteleted: false,
    },
    {
      id: makeId(5),
      content: "Tại đây bạn có thể thêm nhiệm vụ văn bản",
      isDeteleted: false,
    }
  ],
  todoListCompleted: [
  ],
  todoCount: 3
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // các actions
    addTodo(state, action) {
      
    },
    deleteTodoById(state, action) {
      
    },
    restoreTodorById(state, action) {
     
    },
    check(state, action) {
      state.todoList.forEach((item) => {
        if (item.id == action.payload) {
          state.todoListCompleted.unshift(item)
        }
      })
      state.todoList = state.todoList.filter((todo, index) => {
        if (todo.id != action.payload) {
          return todo;
        }
      }) 
    }, 
    unCheck(state, action) {
      state.todoListCompleted.forEach((item) => {
        if (item.id == action.payload) {
          state.todoList.unshift(item)
        }
      })
      state.todoListCompleted = state.todoListCompleted.filter((todo, index) => {
        if (todo.id != action.payload) {
          return todo;
        }
      }) 
    }
  },
});

export const {
  addTodo,
  deleteTodById,
  restoreTodorById,
  check,
  unCheck,
} = todo.actions;

export const createNewTodo = (info) => (dispatch) => {
  dispatch(addTodo(info));
};

export const deleteTodo = (id) => (dispatch) => {
  dispatch(deleteTodoById(id));
};

export const restoreTodo = (id) => (dispatch) => {
  dispatch(restoreTodoById(id));
};
export const handleCheck = (id) => (dispatch) => {
  dispatch(check(id))
}
export const handleUnCheck = (id) => (dispatch) => {
  dispatch(unCheck(id))
}
export default todo.reducer;