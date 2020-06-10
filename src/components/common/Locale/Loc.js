import { Component } from 'react';
import Translations from './Translations';


const DefaultLanguage = 'es';       // Should match initial value set in Store
let globalLang = DefaultLanguage;


export function setLang(lang) {
    globalLang = lang;
}


class Loc extends Component {
    render() {
        const key = this.props.children;
        return Localize(key);
    }
}

export function LocalizeOrDefault(key) {
    const translated = Translations[globalLang][key];
    return (translated === undefined) ? key : translated;
}

export function Localize(key) {
    if (!key) return '';
    
    const lang = globalLang;
    const translated = Translations[lang][key];
    return translated || "__" + key + '__';
}


export default Loc;