import React, {createContext, useContext, useState} from 'react';

interface Feature {
  id: number;
  title: string;
}

interface FeatureContextType {
  currentFeature: Feature;
  setCurrentFeature: React.Dispatch<React.SetStateAction<Feature>>;
  somwidth:number;
  setSomwidth:React.Dispatch<React.SetStateAction<number>>;
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export const FeatureProvider = ({children}: any) => {
  const [currentFeature, setCurrentFeature] = useState<Feature>({
    id: 1,
    title: 'Translate',
  });
  const [somwidth,setSomwidth]=useState<number>(0);
  return (
    <FeatureContext.Provider value={{currentFeature, setCurrentFeature,somwidth,setSomwidth}}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureContext = (): FeatureContextType => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatureContext must be used within a FeatureProvider');
  }
  return context;
};
