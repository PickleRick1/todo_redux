import {v1} from "uuid";
import {TaskStateType} from "../App";
import {addTodolist, RemoveTodolist, todolistId1, todolistId2} from "./todolistReducer";
type removeTaskType = {
    type:'REMOVE-TASK';
    todolistId:string;
    taskId:string;

}
type addTaskType = {
    type:'ADD-TASK';
    todolistId:string;
    title:string;
}
type changeTitleType = {
    type:'CHANGE-TITLE';
    todolistId:string;
    taskId:string;
    title:string;
}
type changeStatusType ={
    type:'CHANGE-STATUS';
    todolistId:string;
    taskId:string;
    isDone:boolean;
}
type ActionsType = removeTaskType | addTaskType | changeTitleType | changeStatusType | addTodolist | RemoveTodolist;
const initialState:TaskStateType = {
    [todolistId1]: [
        {id: v1(), title: "Learn TS", isDone: false},
        {id: v1(), title: "Learn React", isDone: true},
        {id: v1(), title: "Learn Redux", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Meat", isDone: false},
        {id: v1(), title: "Water", isDone: true},
        {id: v1(), title: "Book", isDone: false},
    ],
};
export const taskReducer = (state:TaskStateType = initialState,action:ActionsType) : TaskStateType=>{
    switch (action.type){
        case 'REMOVE-TASK':{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;}
        case "ADD-TASK":{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id:v1(),title:action.title,isDone:false};
            const newTasks = [...tasks,newTask];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy
        }
        case "CHANGE-TITLE":{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t,title:action.title} : t)
            return stateCopy;
        }
        case "CHANGE-STATUS":{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t,isDone:action.isDone} : t)
            return stateCopy;
        }
        case "ADD-TODOLIST":{
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST":{
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy
        }
        default:
            return state;
    }
}
export const removeTaskAC = (todolistId:string,taskId:string):removeTaskType =>{
    return {type:'REMOVE-TASK',todolistId,taskId}
}
export const addTaskAC = (todolistId:string,title:string):addTaskType =>{
    return {type:'ADD-TASK',title,todolistId}
}
export const changeTitleAC = (todolistId:string,taskId:string,title:string):changeTitleType =>{
 return {type:"CHANGE-TITLE",taskId,title,todolistId}
}
export const changeStatusAC = (todolistId:string,taskId:string,isDone:boolean):changeStatusType =>{
    return {type:"CHANGE-STATUS",isDone,taskId,todolistId}
}