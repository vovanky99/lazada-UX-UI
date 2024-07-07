import { useSelector } from 'react-redux';
import * as languages from '~/locales/Translation.json';

const Tranlate = (text) => {
  const { language } = useSelector((state) => state.Auth);
  if (Object.keys(languages).includes(language)) {
    return languages[language][text] || text;
  }
  return text;
};

const Translates = ({ children }) => {
  return Tranlate(children);
};
export default Translates;
