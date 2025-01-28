import { MockRestClient } from '@/mocks/mockRestClient';
import { generateDotPattern, generateTextPattern } from '@/mocks/util/pattern';

export const handlers = [
  MockRestClient.post('/api/ai/description', generateTextPattern),
  MockRestClient.post('/api/ai/dot', generateDotPattern),
];
