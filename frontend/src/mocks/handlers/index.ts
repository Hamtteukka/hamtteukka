import { handlers as patternHandlers } from '@/mocks/handlers/pattern';
import { handlers as authHandlers } from '@/mocks/handlers/auth';

export const handlers = [...patternHandlers, ...authHandlers];
