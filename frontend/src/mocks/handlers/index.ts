import { handlers as patternHandlers } from '@/mocks/handlers/pattern';
import { handlers as authHandlers } from '@/mocks/handlers/auth';
import { handlers as archiveHandlers } from '@/mocks/handlers/archive';
import { handlers as knitogetherHandlers } from '@/mocks/handlers/knitogether';

export const handlers = [...patternHandlers, ...authHandlers, ...archiveHandlers, ...knitogetherHandlers];
