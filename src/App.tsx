import React from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {AddInputForm} from "./AddInputForm";
import {
    AppBar,
    Button,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Container} from "@mui/system";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodolistAC} from "./state/todolistReducer";


export type FiltersType = "all" | "completed" | "active";
export type TodolistType = {
    id: string;
    title: string;
    filter: FiltersType;
};
export type TaskStateType = {
    [key:string]: Array<TaskType>;
}
function App() {
    console.log('App is called')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState,Array<TodolistType>>((state)=>state.todolists);

    const removeList = React.useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId));
    },[dispatch]);

    const changeTitleList = React.useCallback((value: string, todolistId: string) => {
       dispatch(changeTodolistTitleAC(value,todolistId));
    },[dispatch]);

    const changeFilter = React.useCallback((value: FiltersType, todolistId: string) => {
       dispatch(changeTodolistFilterAC(value,todolistId));
    },[dispatch]);
    const addTodolist = React.useCallback((inputValue: string) => {
        dispatch(addTodolistAC(inputValue));
    },[dispatch]);
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed >
                <Grid container style={{padding: "10px"}}>
                    <AddInputForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.map((tl) => {

                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        id={tl.id}
                                        key={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeList={removeList}
                                        changeTitleList={changeTitleList}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
