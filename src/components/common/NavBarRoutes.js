import Home from '../pages/Home/Home';
import Tournaments from '../pages/Tournaments/Tournaments';
import NotFound from './NotFound';
import Contact from '../pages/Contact/Contact';

export default [
    // NavBar pages (navbar: true)
    { route: '/', localizedText: 'Home', navbar: true, exact: true, linkExact: true, component: Home },
    { route: '/tournaments', localizedText: 'Tournaments', navbar: true, component: Tournaments },
    { route: '/contact', localizedText: 'Contact', component: Contact },
    
    // Selected competition
    //{ route: '/tournaments/:id', component: TournamentDetails },

    // 404
    { route: undefined, component: NotFound }
];