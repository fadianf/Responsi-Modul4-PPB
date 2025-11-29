import { apiClient } from '../config/api';

class JournalService {
  async getJournals(userIdentifier, params = {}) {
    try {
      const response = await apiClient.get('/api/v1/journals', {
        params: { user_identifier: userIdentifier, ...params }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getJournalById(id) {
    try {
      const response = await apiClient.get(`/api/v1/journals/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createJournal(journalData) {
    try {
      const response = await apiClient.post('/api/v1/journals', journalData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateJournal(id, journalData) {
    try {
      const response = await apiClient.put(`/api/v1/journals/${id}`, journalData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteJournal(id) {
    try {
      const response = await apiClient.delete(`/api/v1/journals/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new JournalService();