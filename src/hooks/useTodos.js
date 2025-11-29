import { useState, useEffect, useCallback } from 'react';
import todoService from '../services/todoService';
import { getUserIdentifier } from '../utils/helpers';

export function useTodos(params = {}) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userIdentifier = getUserIdentifier();
      const response = await todoService.getTodos(userIdentifier, params);
      if (response.success) {
        setTodos(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch todos');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    refetch: fetchTodos,
  };
}

export function useTodo(id) {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodo = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodoById(id);
      if (response.success) {
        setTodo(response.data);
      } else {
        setError(response.message || 'Failed to fetch todo');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setTodo(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  return {
    todo,
    loading,
    error,
    refetch: fetchTodo,
  };
}