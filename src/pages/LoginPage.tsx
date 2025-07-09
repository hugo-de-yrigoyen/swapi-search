import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Shield, Star } from 'lucide-react';

interface LoginForm {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      await login(data.username, data.password);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Rebel Alliance
          </h1>
          <p className="text-blue-200">
            Welcome back, young Padawan
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Username"
                placeholder="Enter your username"
                {...register('username', { required: 'Username is required' })}
                error={errors.username?.message}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Access Imperial Database
            </Button>
          </form>

          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                Alliance Credentials
              </span>
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <div><strong>Username:</strong> Luke</div>
              <div><strong>Password:</strong> DadSucks</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};