import React, { useState, useEffect } from 'react';
import './DataStoragePage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function DataStorage() {
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await fetch(`${API_BASE_URL}/api/get-records`);
    const data = await response.json();
    setRecords(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = { req: { id: editId, author, name } };

    if (isEditing) {
      await fetch(`${API_BASE_URL}/api/put-records/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      setIsEditing(false);
      setEditId(null);
    } else {
      await fetch(`${API_BASE_URL}/api/post-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    }
    setAuthor('');
    setName('');
    fetchRecords();  // Fetch updated records after submission
  };

  const handleEdit = (id) => {
    const record = records.find((r) => r.id === id);
    setAuthor(record.author);
    setName(record.name);
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE_URL}/api/delete-records/${id}`, {
      method: 'DELETE',
    });
    fetchRecords();  // Fetch updated records after deletion
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
      </form>
      <button onClick={fetchRecords}>View Records</button>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            <span className="record-text">{record.author} - {record.name}</span>
            <div className="buttons">
              <button onClick={() => handleEdit(record.id)}>Edit</button>
              <button onClick={() => handleDelete(record.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataStorage;
