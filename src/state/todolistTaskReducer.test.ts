import {TaskStateType, TodolistType} from "../App";
import {taskReducer} from "./taskReducer";
import {addTodolistAC, todolistReducer} from "./todolistReducer";

test('id`s should be equal',()=>{
    const startStateTask:TaskStateType = {};
    const startStateTodolist:Array<TodolistType> = [];
    const action = addTodolistAC('todolist');
    const endStateTask = taskReducer(startStateTask,action);
    const endStateTodolist = todolistReducer(startStateTodolist,action);
    const keys = Object.keys(endStateTask);
    const idFromTasks = keys[0];
    const idFromTodolists = endStateTodolist[0].id;
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
})