/**
 * LandingPage — dipakai sebagai fallback / standalone landing.
 * Redirect ke HomePage agar tidak ada konten duplikat.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
}
