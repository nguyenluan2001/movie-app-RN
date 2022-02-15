import { language } from './language-code';

const getYearRelease = (release_date) => {
    const year = release_date.split("-")[0];
    return year;
}
const getLanguage = (language_code) => {
    return language.find((item) => item.code === language_code).nativeName
}
const truncateText = (text, numWords) => {
    const newText = text.split(" ").splice(0, numWords).join(" ") + "...";
    return newText;
}
export {getYearRelease, getLanguage, truncateText};