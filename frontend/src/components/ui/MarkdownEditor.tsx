import MDEditor from "@uiw/react-md-editor";
import type React from "react";

interface MarkdownProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownProps> = ({ value, onChange }) => {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={300}
      />
    </div>
  );
};

export default MarkdownEditor;
