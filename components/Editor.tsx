import React, { useRef, useEffect } from "react";
import * as Monaco from "monaco-editor";

export default function Editor() {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<Monaco.editor.IStandaloneCodeEditor | null>(
    null
  );

  useEffect(() => {
    if (editorContainerRef.current) {
      const editor = Monaco.editor.create(editorContainerRef.current, {
        value: ["Hello", "World"].join("\n"),
        language: "javascript",
        theme: "vs-dark",
      });
      editorInstance.current = editor;
    }
  }, []);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Monaco Editor on NextJS</h3>
      <div
        id={"container"}
        style={{ minHeight: "80vh", height: "100%" }}
        ref={editorContainerRef}
      ></div>
    </div>
  );
}
