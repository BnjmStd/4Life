import { useState } from "react";
import "./content.css";

interface Response {
  message: string | null
}

export const Content = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Response |null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleClick = async () => {

    setLoading(true);
    setError(null);

    try {

      if (!selectedFile) {
        console.error("No se ha seleccionado ningún archivo");
      }
  
      const formData = new FormData();
      formData.append("file", selectedFile as File);
  
      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      setData(result);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ha ocurrido un error desconocido');
      }
    } finally {
      setLoading(false);
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

        <button onClick={handleClick} disabled={!selectedFile}>
          {loading ? 'Cargando...' : 'Enviar docs'}
        </button>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      </div>

      <Main data={data} />

      <footer className="content__footer">

        <p>Cualquier información irá ... 😂</p>

      </footer>

    </div>
  );
};

const Main = ({
  data
}: {
  data: Response | null
}) => {
  return (
    <>
      <main className="content__main">

        {
          data ? <pre>{data.message}</pre> : 
          <p> ... </p>
        }

      </main>
    </>
  )
}