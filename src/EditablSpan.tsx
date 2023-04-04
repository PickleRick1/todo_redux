import { spawn } from "child_process";
import React, { ChangeEvent } from "react";

type EditablSpanProps = {
  title: string;
  onChange:(value:string) => void;
};
export const EditablSpan: React.FC<EditablSpanProps> = React.memo(({ title, onChange }) => {
  console.log('Span is called');
  const [editMode, setEditMode] = React.useState(false);
  const [value, setValue] = React.useState("");
  const activateEditMode = () => {
    setEditMode(true);
    setValue(title);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    onChange(value);
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <>
      {editMode ? (
        <input
          type="text"
          onBlur={deactivateEditMode}
          autoFocus
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)}
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
      )}
    </>
  );
});
