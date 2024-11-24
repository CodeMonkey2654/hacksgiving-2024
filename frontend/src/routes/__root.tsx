import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'
import { useSession } from '../hooks/useSession'
import { createContext, useEffect } from 'react'
import { translateText } from '../api/translator'

export const SessionContext = createContext<{
  userId: string;
  sessionId: string;
}>({ userId: '', sessionId: '' });

export const Route = createRootRoute({
  component: () => {
    const { userId, sessionId } = useSession();

    useEffect(() => {
      const translatePage = async () => {
        const targetLang = localStorage.getItem('language') || 'en';
        const elements = Array.from(document.body.querySelectorAll('*'));

        for (const element of elements) {
          if (element.classList.contains('notranslate') || element.getAttribute('data-no-translate') === 'true') {
            continue;
          }

          if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
            const originalText = element.textContent || '';
            const translatedText = await translateText(originalText, targetLang);
            element.textContent = translatedText;
          }
        }
      };

      translatePage();
    }, []);
    
    return (
      <SessionContext.Provider value={{ userId, sessionId }}>
        <Navbar />
        <Box sx={{ pt: 2 }}>
          <Outlet />
        </Box>
      </SessionContext.Provider>
    );
  },
});