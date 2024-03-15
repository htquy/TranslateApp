import React, {createContext, useContext, useState} from 'react';
import {getCurrencies} from 'react-native-localize';
interface CurrencyProps {
  name: string;
  code: string;
  symbol: string;
  flag: string;
  emoji?: string;
}

interface CurrencyContextType {
  sourceCurrency: CurrencyProps;
  targetCurrency: CurrencyProps;
  isSourceCurrency: boolean;
  setIsSourceCurrency: React.Dispatch<React.SetStateAction<boolean>>;
  setSourceCurrency: React.Dispatch<React.SetStateAction<CurrencyProps>>;
  setTargetCurrency: React.Dispatch<React.SetStateAction<CurrencyProps>>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider = ({children}: any) => {
  console.log(getCurrencies());
  const [sourceCurrency, setSourceCurrency] = useState<CurrencyProps>({
    name: 'Vietnamese đồng',
    code: 'VND',
    symbol: '₫',
    flag: 'string',
    emoji: '🇻🇳',
  });
  const [targetCurrency, setTargetCurrency] = useState<CurrencyProps>({
    name: 'United States dollar',
    code: 'USD',
    symbol: '$',
    flag: 'string',
    emoji: '🇺🇸',
  });
  const [isSourceCurrency, setIsSourceCurrency] = useState<boolean>(true);

  return (
    <CurrencyContext.Provider
      value={{
        sourceCurrency,
        setSourceCurrency,
        targetCurrency,
        setTargetCurrency,
        isSourceCurrency,
        setIsSourceCurrency,
      }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useFeatureContext must be used within a FeatureProvider');
  }
  return context;
};
