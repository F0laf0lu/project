import { useState, useEffect } from 'react';
import utilitiesService from '../services/api/utilitiesService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook to fetch and manage utilities data
 */
export const useUtilities = () => {
  const { token } = useAuth();
  const [utilities, setUtilities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUtilities = async () => {
      if (!token) return;

      try {
        setLoading(true);
        setError(null);
        
        const data = await utilitiesService.getAllUtilities(token);
        setUtilities(data);
      } catch (err) {
        console.error('Error fetching utilities:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilities();
  }, [token]);

  return { utilities, loading, error };
};