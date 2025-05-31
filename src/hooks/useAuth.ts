import { useState, useEffect } from 'react';

// Mock user type for development
interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate Firebase auth check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      // Mock login - simulate successful authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser({
        uid: 'mock-user-id',
        email: email,
        displayName: 'Demo User'
      });
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);

      // Mock registration - simulate successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUser({
        uid: 'mock-user-id',
        email: email,
        displayName: displayName
      });
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setUser(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout
  };
};
