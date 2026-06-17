import { useState, useEffect, useCallback } from 'react';
import { createItem, updateItem, deleteItem } from '../../api';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export function useCrudPanel(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('infinity_token');
      const { data } = await axios.get(`${API_BASE}/${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setItems(data);
    } catch { toast.error('Failed to load'); }
    finally { setLoading(false); }
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => { setEditing(null); setModal(true); };
  const openEdit = (item) => { setEditing(item); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const save = async (formData) => {
    try {
      if (editing) {
        await updateItem(endpoint, editing._id, formData);
        toast.success('Updated!');
      } else {
        await createItem(endpoint, formData);
        toast.success('Created!');
      }
      closeModal();
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteItem(endpoint, id);
      toast.success('Deleted');
      load();
    } catch { toast.error('Delete failed'); }
  };

  return { items, loading, modal, editing, openCreate, openEdit, closeModal, save, remove };
}
