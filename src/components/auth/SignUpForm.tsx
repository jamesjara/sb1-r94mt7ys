import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useAuthStore } from '../../store/useAuthStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface SignUpFormInputs {
  email: string;
  password: string;
  displayName: string;
}

export function SignUpForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();
  const setError = useAuthStore((state) => state.setError);

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.displayName });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Display Name"
        {...register('displayName', { required: 'Display name is required' })}
        error={errors.displayName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' }
        })}
        error={errors.password?.message}
      />
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}