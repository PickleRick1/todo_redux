import {v1} from "uuid";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, taskReducer} from "./taskReducer";
import {TaskStateType} from "../App";
import {addTodolistAC, RemoveTodolistAC} from "./todolistReducer";

test('correct task should be removed from specified todolist',()=>{
    let startState:TaskStateType= {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,removeTaskAC('todolistId2','3'));
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'][1].id).toBe('2');
})
test('add task to the correct todolist',()=>{
    let startState:TaskStateType= {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,addTaskAC('todolistId1','Learn router'));
    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId2'].length).toBe(3);
    expect(endState['todolistId1'][3].title).toBe('Learn router');
})
test('change title in correct task in correct todolist',()=>{
    const startState :TaskStateType = {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,changeTitleAC('todolistId2','2','Apple'));
    expect(endState['todolistId2'][1].title).toBe('Apple');
    expect(endState['todolistId1'][1].title).toBe('Learn React');
})
test('correct task should change status',()=>{
    const startState : TaskStateType = {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,changeStatusAC('todolistId1','1',true));
    expect(endState['todolistId1'][0].isDone).toBeTruthy();
    expect(endState['todolistId2'][0].isDone).toBeFalsy();
})
test('new array should be added when new todolist is added',()=>{
    const startState : TaskStateType = {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,addTodolistAC('todolist'));
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k!='todolistId2');
    if(!newKey){
        throw new Error('new key should b added')
    }
    expect(endState[newKey]).toEqual([]);
    expect(keys.length).toBe(3);

})
test('tasks should be deleted with todolist',()=>{
    const startState : TaskStateType = {
        'todolistId1': [
            {id: '1', title: "Learn TS", isDone: false},
            {id: '2', title: "Learn React", isDone: true},
            {id: '3', title: "Learn Redux", isDone: false},
        ],
        'todolistId2': [
            {id: '1', title: "Meat", isDone: false},
            {id: '2', title: "Water", isDone: true},
            {id: '3', title: "Book", isDone: false},
        ],
    }
    const endState = taskReducer(startState,RemoveTodolistAC('todolistId2'));
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
})