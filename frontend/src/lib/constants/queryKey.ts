const HOME_POST = 'homePost';
const SEARCH_POST = 'searchPost';
const STORED_POST = 'storedPost';
const STORED_PATTERN = 'storedPattern';
const USER_POST = 'userPost';
const USER_PATTERN = 'userPattern';
const AI_PATTERN = 'aiPattern';

export const queryKey = {
  HOME_POST,
  SEARCH_POST,
  STORED_POST,
  STORED_PATTERN,
  USER_POST,
  USER_PATTERN,
  AI_PATTERN,
} as const;
