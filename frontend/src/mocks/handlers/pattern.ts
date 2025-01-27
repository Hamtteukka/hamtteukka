import { MockRestClient } from '@/mocks/mockRestClient';
import { generateDotPattern } from '@/mocks/util/pattern';

export const handlers = [MockRestClient.post('/api/ai/dot', generateDotPattern)];
