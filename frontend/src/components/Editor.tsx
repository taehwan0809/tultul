"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// React 19 대응을 위해 react-quill-new 사용 및 SSR 방지
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div style={{ height: "450px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #ddd" }}>에디터를 불러오는 중...</div> 
});

interface EditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "4px", overflow: "hidden", border: "1px solid #ccc" }}>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange}
        modules={modules}
        style={{ height: "450px", marginBottom: "42px" }} 
      />
    </div>
  );
}