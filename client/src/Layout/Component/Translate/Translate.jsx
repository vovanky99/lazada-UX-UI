import { useSelector } from 'react-redux';
import * as languages from '~/locales/Translation.json';

const Tranlates = (text) => {
  const { language } = useSelector((state) => state.Auth);
  let lang = languages[language];
  if (!lang || !text) {
    return text;
  }
  const arrayText = text.split('.');
  try {
    for (let i = 0; i < arrayText.length; i++) {
      if (lang[arrayText[i]] === undefined) {
        return text;
      }
      lang = lang[arrayText[i]];
    }
    if (typeof lang === 'object') {
      console.error('Expected a string but got an object:', lang);
      return text;
    }
    return lang;
  } catch (e) {
    return text;
  }
};

const Translate = ({ children }) => {
  return Tranlates(children);
};
export default Translate;
