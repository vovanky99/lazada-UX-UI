import { useSelector } from 'react-redux';
import * as languages from '~/locales/Translation.json';

const Tranlates = (text) => {
  const { language } = useSelector((state) => state.Auth);
  const arrayText = text.split('.');
  let lang = null;
  if (Object.keys(languages).includes(language)) {
    lang = languages[language];
  } else {
    return (lang = text);
  }
  for (let i = 0; i < arrayText.length; i++) {
    if (Object.keys(lang).includes(arrayText[i])) {
      lang = lang[arrayText[i]];
    } else {
      return (lang = text);
    }
  }
  return lang;
};

const Translate = ({ children }) => {
  return Tranlates(children);
};
export default Translate;
