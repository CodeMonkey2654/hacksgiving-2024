import React, { useEffect, useState } from 'react';
import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Language } from '@mui/icons-material';
import { translateText } from '../api/translator';

const LanguageSelector: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') ||'en');

  const handleLanguageChange = async (event: SelectChangeEvent<string>) => {
    const targetLang = event.target.value;
    setSelectedLanguage(targetLang);
    localStorage.setItem('language', targetLang);

    // Translate the entire document body including the language selector
    const elements = Array.from(document.body.querySelectorAll('*'));

    for (const element of elements) {
      if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
        const originalText = element.textContent || '';
        const translatedText = await translateText(originalText, targetLang);
        element.textContent = translatedText;
      }
    }
    
  };

  useEffect(() => {
    handleLanguageChange({ target: { value: selectedLanguage } } as SelectChangeEvent<string>);
  }, [selectedLanguage]);

  return (
    <Box
      sx={{
        top: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      <FormControl
        size="small"
        sx={{
          minWidth: 120,
          '& .MuiOutlinedInput-root': {
            color: 'var(--text-color)',
            '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
          },
          '& .MuiSelect-icon': { color: 'var(--text-color)' },
        }}
      >
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          startAdornment={<Language sx={{ mr: 1, color: 'var(--text-color)' }} />}
        >
          <MenuItem value="af">Afrikaans</MenuItem>
          <MenuItem value="ar">العربية (Arabic)</MenuItem>
          <MenuItem value="bg">български (Bulgarian)</MenuItem>
          <MenuItem value="bn">বাংলা (Bengali)</MenuItem>
          <MenuItem value="bs">Bosanski (Bosnian)</MenuItem>
          <MenuItem value="ca">Català (Catalan)</MenuItem>
          <MenuItem value="cs">Čeština (Czech)</MenuItem>
          <MenuItem value="cy">Cymraeg (Welsh)</MenuItem>
          <MenuItem value="da">Dansk (Danish)</MenuItem>
          <MenuItem value="de">Deutsch (German)</MenuItem>
          <MenuItem value="el">Ελληνικά (Greek)</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español (Spanish)</MenuItem>
          <MenuItem value="et">Eesti (Estonian)</MenuItem>
          <MenuItem value="fa">فارسی (Persian)</MenuItem>
          <MenuItem value="fi">Suomi (Finnish)</MenuItem>
          <MenuItem value="fil">Filipino</MenuItem>
          <MenuItem value="fj">Fijian</MenuItem>
          <MenuItem value="fr">Français (French)</MenuItem>
          <MenuItem value="he">עברית (Hebrew)</MenuItem>
          <MenuItem value="hi">हिंदी (Hindi)</MenuItem>
          <MenuItem value="hr">Hrvatski (Croatian)</MenuItem>
          <MenuItem value="ht">Haitian Creole</MenuItem>
          <MenuItem value="hu">Magyar (Hungarian)</MenuItem>
          <MenuItem value="id">Indonesia (Indonesian)</MenuItem>
          <MenuItem value="is">Íslenska (Icelandic)</MenuItem>
          <MenuItem value="it">Italiano (Italian)</MenuItem>
          <MenuItem value="ja">日本語 (Japanese)</MenuItem>
          <MenuItem value="ko">한국어 (Korean)</MenuItem>
          <MenuItem value="lt">Lietuvių (Lithuanian)</MenuItem>
          <MenuItem value="lv">Latviešu (Latvian)</MenuItem>
          <MenuItem value="mg">Malagasy</MenuItem>
          <MenuItem value="ms">Melayu (Malay)</MenuItem>
          <MenuItem value="mt">Malti (Maltese)</MenuItem>
          <MenuItem value="mww">Hmong Daw</MenuItem>
          <MenuItem value="nb">Norsk (Norwegian)</MenuItem>
          <MenuItem value="nl">Nederlands (Dutch)</MenuItem>
          <MenuItem value="otq">Querétaro Otomi</MenuItem>
          <MenuItem value="pl">Polski (Polish)</MenuItem>
          <MenuItem value="pt">Português (Portuguese)</MenuItem>
          <MenuItem value="ro">Română (Romanian)</MenuItem>
          <MenuItem value="ru">Русский (Russian)</MenuItem>
          <MenuItem value="sk">Slovenčina (Slovak)</MenuItem>
          <MenuItem value="sl">Slovenščina (Slovenian)</MenuItem>
          <MenuItem value="sm">Samoa</MenuItem>
          <MenuItem value="sr">Српски (Serbian)</MenuItem>
          <MenuItem value="sv">Svenska (Swedish)</MenuItem>
          <MenuItem value="sw">Kiswahili (Swahili)</MenuItem>
          <MenuItem value="ta">தமிழ் (Tamil)</MenuItem>
          <MenuItem value="te">తెలుగు (Telugu)</MenuItem>
          <MenuItem value="th">ไทย (Thai)</MenuItem>
          <MenuItem value="tlh">Klingon</MenuItem>
          <MenuItem value="to">Lea fakatonga (Tongan)</MenuItem>
          <MenuItem value="tr">Türkçe (Turkish)</MenuItem>
          <MenuItem value="ty">Tahitian</MenuItem>
          <MenuItem value="uk">Українська (Ukrainian)</MenuItem>
          <MenuItem value="ur">اردو (Urdu)</MenuItem>
          <MenuItem value="vi">Tiếng Việt (Vietnamese)</MenuItem>
          <MenuItem value="yua">Yucatec Maya</MenuItem>
          <MenuItem value="yue">粵語 (Cantonese)</MenuItem>
          <MenuItem value="zh-Hans">中文 (Simplified Chinese)</MenuItem>
          <MenuItem value="zh-Hant">中文 (Traditional Chinese)</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
