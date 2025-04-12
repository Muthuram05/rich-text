import React, { useRef } from 'react';
import './RichTextEditor.css';

const RichTextEditor = () => {
  const editorRef = useRef(null);

  const format = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => format('bold')}><b>B</b></button>
        <button onClick={() => format('italic')}><i>I</i></button>
        <button onClick={() => format('underline')}><u>U</u></button>
        <button onClick={() => format('formatBlock', '<h1>')}>H1</button>
        <button onClick={() => format('formatBlock', '<blockquote>')}>Quote</button>
        <button onClick={() => format('insertUnorderedList')}>• List</button>
        <button onClick={() => format('insertOrderedList')}>1. List</button>
        <button onClick={() => {
          const url = prompt("Enter URL");
          if (url) format('createLink', url);
        }}>Link</button>
        <button onClick={() => format('removeFormat')}>Clear</button>
      </div>

      {/* Editable Div */}
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        suppressContentEditableWarning
        onPaste={handlePaste}
      ></div>
    </div>
  );
};

export default RichTextEditor;
