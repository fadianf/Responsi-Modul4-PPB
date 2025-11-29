import { apiClient } from '../config/api';

class TodoService {
  async getTodos(userIdentifier, params = {}) {
    try {
      const response = await apiClient.get('/api/v1/todos', {
        params: { user_identifier: userIdentifier, ...params }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTodoById(id) {
    try {
      const response = await apiClient.get(`/api/v1/todos/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTodo(todoData) {
    try {
      const response = await apiClient.post('/api/v1/todos', todoData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(id, todoData) {
    try {
      const response = await apiClient.put(`/api/v1/todos/${id}`, todoData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async toggleTodo(id) {
    try {
      const response = await apiClient.patch(`/api/v1/todos/${id}/toggle`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTodo(id) {
    try {
      const response = await apiClient.delete(`/api/v1/todos/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new TodoService();