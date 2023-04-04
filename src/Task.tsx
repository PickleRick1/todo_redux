import React, {ChangeEvent} from "react";
import {TaskType} from "./TodoList";
import {changeStatusAC, changeTitleAC, removeTaskAC} from "./state/taskReducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditablSpan} from "./EditablSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";

type TaskPropsType = {
    task: TaskType;
    todolistId: string;
}
export const Task: React.FC<TaskPropsType> = React.memo(({task, todolistId}) => {
    const dispatch = useDispatch();
    const onChangeTitle = React.useCallback((value: string) => {
        dispatch(changeTitleAC(todolistId,task.id, value ));
    }, [dispatch, todolistId]);
    const onChangeStatus = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue: boolean = e.currentTarget.checked;
        dispatch(changeStatusAC(todolistId,task.id, newIsDoneValue))
    }, [dispatch, task.id, todolistId]);
    const onRemoveTask = React.useCallback(() => {
        dispatch(removeTaskAC(todolistId, task.id));
    }, [dispatch,todolistId,task.id]);
    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                onChange={onChangeStatus}
            />
            <EditablSpan title={task.title} onChange={onChangeTitle}/>
            <IconButton
                onClick={onRemoveTask}
            >
                <Delete/>
            </IconButton>
        </div>
    );
});