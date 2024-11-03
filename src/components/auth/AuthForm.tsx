import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signUp, signIn, sendPasswordReset, signOut } from '../../lib/auth';
import { cn } from '../../lib/utils';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').optional()
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema)
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      setError('');
      if (isSignUp) {
        await signUp(data.email, data.password, data.username || data.email.split('@')[0]);
      } else {
        await signIn(data.email, data.password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handlePasswordReset = async (email: string) => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      setError('');
      await sendPasswordReset(email);
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-xl font-semibold">Welcome, {user.email}!</p>
          <button
            onClick={() => signOut()}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? 'Sign up to start managing your RFPs' 
              : 'Sign in to access your RFP dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                {...register('username')}
                type="text"
                placeholder="Username"
                className={cn(
                  "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.username ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                errors.email ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              {...register('password')}
              type="password"
              placeholder="Password"
              className={cn(
                "w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                errors.password ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </>
            ) : (
              isSignUp ? 'Sign Up' : 'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : 'Need an account? Sign Up'}
          </button>
        </div>

        {!isSignUp && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                const email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
                handlePasswordReset(email);
              }}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forgot password?
            </button>
            {resetSent && (
              <p className="text-green-600 text-sm mt-2">
                Password reset email sent! Check your inbox.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}