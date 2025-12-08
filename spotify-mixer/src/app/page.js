'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Header from './components/Header';
import PlaylistDisplay from './components/PlaylistDisplay';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
      <div id="home_page">
        <div className='head'>
          <div className="login_container">
            <button id="inicioBut"onClick={handleLogin}><h4>Iniciar sesion </h4></button>
          </div>
          <Header id="title_home"/>
        </div>
        <>
          <PlaylistDisplay />
        </>
      </div>  
  );
}


