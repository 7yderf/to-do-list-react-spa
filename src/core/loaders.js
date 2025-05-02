import JwtService from './services/JwtService';
import { redirect } from 'react-router-dom';

export const authLoader = () => {
  const user = JwtService.getUser();
  if (user?.isAuth) return redirect('/admin/reports');
  return null;
};

export const protectedLoader = () => {
  const user = JwtService.getUser();
  if (!user?.isAuth) return redirect('/login');
  return null;
};