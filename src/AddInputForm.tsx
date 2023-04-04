import { Add } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
type AddInputFormPropsType = {
  addItem: (inputValue: string) => void;
};
export const AddInputForm: React.FC<AddInputFormPropsType> = React.memo(({ addItem }) => {
  console.log('AddInputForm is called');
  const [inputValue, setInputValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onAddTaskKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(error !== null){
      setError(null);
    }
    if (e.key === "Enter") {
      onAddTask();
    }
  };
  const onAddTask = () => {
    if (inputValue.trim() === "") {
      setError("Title is required");
      return;
    }
    addItem(inputValue);
    setInputValue("");
  };
  return (
    <div>
      <TextField
        variant="standard"
        type="text"
        value={inputValue}
        onChange={onChangeInput}
        onKeyDown={onAddTaskKeyPress}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={onAddTask}>
        <Add />
      </IconButton>
    </div>
  );
});
