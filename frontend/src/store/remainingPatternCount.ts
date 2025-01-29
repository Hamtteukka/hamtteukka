import { AI_GENERATION_TOTAL_COUNT } from '@/lib/constants/pattern';
import { create } from 'zustand';

interface PAiGenerationRemainingCount {
  count: number;
  subCount: () => void;
}

export const useAiGenerationRemainingCount = create<PAiGenerationRemainingCount>()((set) => ({
  count: AI_GENERATION_TOTAL_COUNT,
  subCount: () => set((prevState) => ({ ...prevState, count: prevState.count - 1 })),
}));
