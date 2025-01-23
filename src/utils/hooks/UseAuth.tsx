import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = (role: 'user' | 'admin') => {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== role) {
      router.push('/');
    }
  }, [role, router]);
};

export default useAuth;
