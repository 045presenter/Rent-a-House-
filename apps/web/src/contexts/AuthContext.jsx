import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      setCurrentUser(pb.authStore.model);
    }
    setInitialLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
      setCurrentUser(authData.record);
      return { success: true, user: authData.record };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  };

  const signup = async (email, password, passwordConfirm, name, role, phone) => {
    try {
      const userData = {
        email,
        password,
        passwordConfirm,
        name,
        role,
        phone: phone || '',
        emailVisibility: true,
      };

      const record = await pb.collection('users').create(userData, { $autoCancel: false });

      try {
        await pb.collection('users').requestVerification(email, { $autoCancel: false });
      } catch (verifyError) {
        console.warn('Verification email failed:', verifyError);
      }

      try {
        const authData = await pb.collection('users').authWithPassword(email, password, { $autoCancel: false });
        setCurrentUser(authData.record);
      } catch (authError) {
        console.warn('Auto-login after signup failed:', authError);
      }

      return { success: true, user: record };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    }
  };

  const logout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
  };

  const isAuthenticated = Boolean(currentUser);

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    signup,
    initialLoading,
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}