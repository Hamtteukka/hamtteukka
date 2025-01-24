import { createContext } from 'react';

type PatternType = 'select' | 'text' | 'dot';

const PatternTypeContext = createContext<React.Dispatch<React.SetStateAction<PatternType>> | null>(null);

export default PatternTypeContext;
