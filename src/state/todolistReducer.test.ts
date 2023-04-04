import {v1} from "uuid";
import {FiltersType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolistReducer";

test('todolist should be removed',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    const startState:Array<TodolistType> = [ {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
        {id: todolistId2, title: "What to buy", filter: "completed"},];

    const endState = todolistReducer(startState,RemoveTodolistAC(todolistId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('correct add new todolist',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New Todolist'
    const startState:Array<TodolistType> = [ {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
        {id: todolistId2, title: "What to buy", filter: "completed"},];
    const endState = todolistReducer(startState,addTodolistAC(newTodolistTitle));
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
})
test('changed title todolist should be correct',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newTodolistTitle = 'New Todolist'
    const startState:Array<TodolistType> = [ {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
        {id: todolistId2, title: "What to buy", filter: "completed"},];
    const endState = todolistReducer(startState,changeTodolistTitleAC(newTodolistTitle,todolistId2));
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})
test('correct filter for todolist should be changed',()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
    let newFilter:FiltersType = 'all'
    const startState:Array<TodolistType> = [ {
        id: todolistId1,
        title: "What to learn",
        filter: "active",
    },
        {id: todolistId2, title: "What to buy", filter: "completed"},];
    const endState = todolistReducer(startState,changeTodolistFilterAC(newFilter,todolistId2));
    expect(endState[0].filter).toBe("active");
    expect(endState[1].filter).toBe(newFilter);
})
