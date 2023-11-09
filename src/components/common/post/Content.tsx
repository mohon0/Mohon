import dynamic from "next/dynamic";
import { FC, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Toolbar from "./ReactQuill";
import "./Quill.css";
// Use dynamic to import ReactQuill dynamically
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Set ssr to false to prevent SSR for this component
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Content: FC<Props> = ({ value, onChange, error }) => {
  // Ensure ReactQuill is loaded only on the client side
  useEffect(() => {
    const Quill = require("react-quill");
    if (Quill && typeof window !== "undefined") {
      // Initialize any necessary code here
    }
  }, []);

  return (
    <div className="mb-4 h-[30rem]">
      <label
        className="mb-2 block font-bold"
        htmlFor="content"
      >
        Content
      </label>
      <div className="rounded">
        <ReactQuill
          className="h-96 w-full max-w-5xl"
          value={value}
          onChange={(content, delta, source, editor) => {
            onChange(editor.getHTML());
          }}
          modules={Toolbar()}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Content;
