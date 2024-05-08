import React, {createContext, useContext, useState} from 'react';

interface LanguageProps {
  name: string;
  code: string;
}

interface LanguageContextType {
  sourceLanguage: LanguageProps;
  targetLanguage: LanguageProps;
  isSourceLanguage: boolean;
  setIsSourceLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  setSourceLanguage: React.Dispatch<React.SetStateAction<LanguageProps>>;
  setTargetLanguage: React.Dispatch<React.SetStateAction<LanguageProps>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({children}: any) => {
  const [sourceLanguage, setSourceLanguage] = useState<LanguageProps>({
    name: 'English',
    code: 'en',
  });
  const [targetLanguage, setTargetLanguage] = useState<LanguageProps>({
    name: 'Vietnamese',
    code: 'vi',
  });
  const [isSourceLanguage, setIsSourceLanguage] = useState<boolean>(true);

  return (
    <LanguageContext.Provider
      value={{
        sourceLanguage,
        setSourceLanguage,
        targetLanguage,
        setTargetLanguage,
        isSourceLanguage,
        setIsSourceLanguage,
      }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useFeatureContext must be used within a FeatureProvider');
  }
  return context;
};
