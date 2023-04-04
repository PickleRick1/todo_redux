import {FiltersType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolist = {
    type: "REMOVE-TODOLIST";
    id: string
}
export type addTodolist = {
    type: "ADD-TODOLIST";
    title: string;
    todolistId: string;
}
export type changeTodolistTitle = {
    type: "CHANGE-TODOLIST-TITLE";
    title: string;
    id: string
}
export type changeTodolistFilter = {
    type: "CHANGE-TODOLIST-FILTER";
    filter: FiltersType;
    id: string;
}
type ActionsType = RemoveTodolist | changeTodolistFilter | changeTodolistTitle | addTodolist;
export let todolistId1 = v1();
export let todolistId2 = v1();
const initialState: Array<TodolistType> = [
    {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
    {id: todolistId2, title: "What to buy", filter: "completed"},
];
export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            stateCopy.filter((t) => t.id !== action.id);
            return stateCopy;
        }
        case 'ADD-TODOLIST':{
            const stateCopy = {...state}
            return [...stateCopy, {id: action.todolistId, title: action.title, filter: 'all'}];
        }

        case 'CHANGE-TODOLIST-TITLE':
            let todolist = state.find(s => s.id === action.id);
            if (todolist) {
                todolist.title = action.title;

            }
            return [...state];
        case 'CHANGE-TODOLIST-FILTER':
            let todolist1 = state.find(s => s.id === action.id);
            if (todolist1) {
                todolist1.filter = action.filter;

            }
            return [...state]
        default:
            return state
    }

}
export const RemoveTodolistAC = (id: string): RemoveTodolist => {
    return {type: "REMOVE-TODOLIST", id}
}
export const addTodolistAC = (title: string): addTodolist => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}
export const changeTodolistFilterAC = (filter: FiltersType, id: string): changeTodolistFilter => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitle => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}
