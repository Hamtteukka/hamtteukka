import { handlers as patternHandlers } from '@/mocks/handlers/pattern';
import { handlers as authHandlers } from '@/mocks/handlers/auth';
import { handlers as archiveHandlers } from '@/mocks/handlers/archive';
import { handlers as knitogetherHandlers } from '@/mocks/handlers/knitogether';
import { handlers as homeHandlers } from '@/mocks/handlers/home';
import { handlers as newFeedHandlers } from '@/mocks/handlers/newFeed';
import { handlers as feedHandlers } from '@/mocks/handlers/feed';
import { handlers as profileHandlers } from '@/mocks/handlers/profile';

export const handlers = [
  ...patternHandlers,
  ...authHandlers,
  ...archiveHandlers,
  ...knitogetherHandlers,
  ...homeHandlers,
  ...newFeedHandlers,
  ...feedHandlers,
  ...profileHandlers,
];
