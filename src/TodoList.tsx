import {Delete} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { AddInputForm } from "./AddInputForm";
import {FiltersType, TaskStateType} from "./App";
import { EditablSpan } from "./EditablSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/taskReducer";
import {Task} from "./Task";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type TodoListProps = {
  id: string;
  title: string;
  changeFilter: (value: FiltersType, todolistId: string) => void;
  filter: FiltersType;
  removeList: (todolistId: string) => void;
  changeTitleList: (value: string, todolistId: string) => void;
};
const TodoList: React.FC<TodoListProps> = React.memo(({
  id,
  title,
  changeFilter,
  filter,
  removeList,
  changeTitleList,
}) => {
  console.log('Todolist is called')
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState,Array<TaskType>>((state)=>state.tasks[id]);
  let tasksFiltered = tasks;
  if (filter === "completed") {
    tasksFiltered = tasksFiltered.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksFiltered = tasksFiltered.filter((t) => t.isDone === false);
  }

const onClickAllFilter = React.useCallback(()=>changeFilter("all", id),[changeFilter,id]);
  const onClickActiveFilter = React.useCallback(()=>changeFilter("active", id),[changeFilter,id]);
  const onClickCompletedFilter = React.useCallback(()=>changeFilter("completed", id),[changeFilter,id]);
  const onRemoveList = React.useCallback(() => {
    removeList(id);
  },[removeList,id]);
  const onAddTask = React.useCallback((inputValue: string) => {
    dispatch(addTaskAC(id, inputValue));
  },[dispatch,id]);
  const onChangeTitleTodolist = React.useCallback((value: string) => {
    changeTitleList(value, id);
  },[dispatch,id,changeTitleList]);
  return (
    <div>
      <h3>
        <EditablSpan title={title} onChange={onChangeTitleTodolist} />
        <IconButton onClick={onRemoveList}>
          <Delete />
        </IconButton>
      </h3>
      <AddInputForm addItem={onAddTask} />

      <div>
        {tasksFiltered.map((t) => <Task key={t.id} task={t} todolistId={id}></Task>
        )}
      </div>
      <div>
        <Button
          variant={filter === "all" ? "contained" : "text"}
          className={filter === "all" ? "active-button" : ""}
          onClick={onClickAllFilter}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "contained" : "text"}
          color="secondary"
          onClick={onClickActiveFilter}
        >
          Active
        </Button>
        <Button
          color="success"
          variant={filter === "completed" ? "contained" : "text"}
          onClick={onClickCompletedFilter}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
export default TodoList;
