import React, { useRef } from "react";
import "./RichTextEditor.css";

const RichTextEditor = ({
  onFileUpload,
  plugin = {
    bold: false,
    italic: false,
    underline: false,
    link: false,
    quote: false,
    list: false,
    orderedList: false,
  },
}) => {
  const editorRef = useRef(null);

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardItems = e.clipboardData.items;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type === "text/plain") {
        item.getAsString((text) => {
          const selection = window.getSelection();
          if (!selection.rangeCount) return;
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const textNode = document.createTextNode(text);
          range.insertNode(textNode);
          range.setStartAfter(textNode);
          range.setEndAfter(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
        });
      } else {
        const file = item.getAsFile();
        if (file && onFileUpload) {
          onFileUpload(file);
          return;
        }
      }
    }
  };

  const makeBold = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const strong = document.createElement("strong");
    strong.appendChild(range.extractContents());
    range.insertNode(strong);

    // Optional: Move cursor after inserted element
    range.setStartAfter(strong);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const makeItalic = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    // Create <em> element
    const em = document.createElement("em");
    em.appendChild(range.extractContents());
    range.insertNode(em);

    // Move the caret after the inserted element
    range.setStartAfter(em);
    range.setEndAfter(em);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="editor-container">
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={makeBold}>
          <b>B</b>
        </button>
        <button onClick={makeItalic}>
          <i>I</i>
        </button>
        {/* <button onClick={() => format('underline')}><u>U</u></button>
        <button onClick={() => format('formatBlock', '<h1>')}>H1</button>
        <button onClick={() => format('formatBlock', '<blockquote>')}>Quote</button>
        <button onClick={() => format('insertUnorderedList')}>• List</button>
        <button onClick={() => format('insertOrderedList')}>1. List</button>
        <button onClick={() => {
          const url = prompt("Enter URL");
          if (url) format('createLink', url);
        }}>Link</button> */}
      </div>

      {/* Editable Div */}
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        onPaste={handlePaste}
      ></div>
    </div>
  );
};

export default RichTextEditor;
