import { TPattern } from '@/types/pattern';
import { createContext } from 'react';

const PatternTypeContext = createContext<React.Dispatch<React.SetStateAction<TPattern>> | null>(null);

export default PatternTypeContext;
