import React, { useState, useEffect } from "react";
import {
  button,
} from 'react-dom'

import "./styles.css";
import api from '../src/services/api'

function App() {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    api.get('documents').then(response => {
      setDocuments(response.data)
    })
  }, [])


  async function handleAddRepository() {
    const response = await api.post('documents', {
      title: `Novo Documento ${Date.now()}`,
      owner: "Silvanei Martins"
    })
    const document = response.data
    setDocuments([...documents, document])
  }

  async function handleRemoveRepository(id) {
    const itensCopy = Array.from(documents);
    itensCopy.splice(id, 1);
    setDocuments(itensCopy);    
  }

  return (
    <div>
      <h2>Repositorio</h2>
      <button
        type={button}
        onClick={handleAddRepository}
      >Adicionar</button>
      <ul data-testid="repository-list">
        {documents.map(document => <li key={document.id} >
          {document.title}
          {document.owner}
          <button
            onClick={() => handleRemoveRepository(1)}
          >
            Remover
          </button>
        </li>)}  
      </ul>
    </div>
  );
}

export default App;
