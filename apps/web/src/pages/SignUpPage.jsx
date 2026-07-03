import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext.jsx';

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, login } = useAuth();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'signup' ? 'signup' : 'login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    role: 'tenant',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(loginForm.email, loginForm.password);
      toast.success('Login successful');

      if (result.user.role === 'landlord') {
        navigate('/landlord/dashboard');
      } else {
        navigate('/tenant/profile');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (signupForm.password !== signupForm.passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupForm.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(
        signupForm.email,
        signupForm.password,
        signupForm.passwordConfirm,
        signupForm.name,
        signupForm.role,
        signupForm.phone
      );
      toast.success('Account created successfully');

      if (signupForm.role === 'landlord') {
        navigate('/landlord/dashboard');
      } else {
        navigate('/tenant/profile');
      }
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Login' : 'Sign Up'} - Rent a House</title>
        <meta name="description" content="Create an account or login to Rent a House to start finding or listing properties." />
      </Helmet>

      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Building2 className="h-10 w-10 text-primary" />
              <span className="text-2xl font-bold">Rent a House</span>
            </Link>
          </div>

          <div className="bg-card rounded-2xl border shadow-lg overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 font-semibold transition-colors duration-200 ${
                  activeTab === 'login'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-4 font-semibold transition-colors duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="login-email" className="block text-sm font-medium mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <LogIn className="h-5 w-5" />
                        Login
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                      I am a
                    </label>
                    <select
                      id="role"
                      value={signupForm.role}
                      onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="tenant">Tenant (Looking for property)</option>
                      <option value="landlord">Landlord (Listing property)</option>
                      <option value="agent">Agent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="input-field"
                      required
                      minLength={8}
                    />
                  </div>

                  <div>
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium mb-2">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      id="passwordConfirm"
                      value={signupForm.passwordConfirm}
                      onChange={(e) => setSignupForm({ ...signupForm, passwordConfirm: e.target.value })}
                      className="input-field"
                      required
                      minLength={8}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Create account
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}