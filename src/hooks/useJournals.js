import { useState, useEffect, useCallback } from 'react';
import journalService from '../services/journalService';
import { getUserIdentifier } from '../utils/helpers';

export function useJournals(params = {}) {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJournals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userIdentifier = getUserIdentifier();
      const response = await journalService.getJournals(userIdentifier, params);
      if (response.success) {
        setJournals(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch journals');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setJournals([]);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  return {
    journals,
    loading,
    error,
    refetch: fetchJournals,
  };
}

export function useJournal(id) {
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJournal = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await journalService.getJournalById(id);
      if (response.success) {
        setJournal(response.data);
      } else {
        setError(response.message || 'Failed to fetch journal');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setJournal(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchJournal();
  }, [fetchJournal]);

  return {
    journal,
    loading,
    error,
    refetch: fetchJournal,
  };
}