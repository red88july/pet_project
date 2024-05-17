import { badWords } from './badword.library';

export const checkForBadWords = (name: string, value: string) => {
  switch (name) {
    case 'title':
      return badWords.check(value);
    case 'location':
      return badWords.check(value);
    case 'address':
      return badWords.check(value);
    case 'city':
      return badWords.check(value);
    case 'description':
      return badWords.check(value);
    case 'category':
      return badWords.check(value);
    default:
      return false;
  }
};