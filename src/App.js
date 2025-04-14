import React, { useState } from 'react';
import RichTextEditor from './Text';
import { isEmpty } from './utils';

function App() {
  const [file, setFile] = useState([]);
  function onFileUpload(file){
    setFile((prevFiles) => {
      return [...prevFiles, file];
    });
  }
  return (
    <div className="App">
      {
          !isEmpty(file) && file.map((item, index) => {
          return (
            <div key={index}>
              <img src={URL.createObjectURL(item)} width={"200px"} height={"200px"} alt="uploaded" />
              <button onClick={() => {
                setFile((prevFiles) => {
                  return prevFiles.filter((_, i) => i !== index);
                });
              }}>Remove</button>
            </div>
          );
        })
      }
     <RichTextEditor plugin={{bold: true}} onFileUpload={onFileUpload} />
    </div>
  );
}

export default App;
