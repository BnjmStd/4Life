import { useState } from "react";
import "./content.css";

export const Content = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="content">

      <div className="content__upload-container">

        <label className="content__file-label">

          <input
            type="file"
            onChange={handleFileChange}
            className="content__file-input"
          />

          <span>Seleccionar archivo</span>

        </label>

        {selectedFile && <span className="content__file-name">{`${selectedFile.name}`}</span>}

      </div>

      <Main />

      <footer className="content__footer">

        <p>Cualquier información irá ... 😂</p>
        
      </footer>

    </div>
  );
};

const Main = () => {
  return (
    <main className="content__main">

      H1

    </main>
  )
}