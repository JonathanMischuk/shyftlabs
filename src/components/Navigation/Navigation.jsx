import { NavLink } from 'react-router-dom';
import navigationItems from "../../data/navigation";
import './styles.scss';

// top sticky bar that contains primary navigation
function Navigation() {
    return <nav className='primary-nav'>
        {navigationItems.map((item, i) => <NavLink
            key={i}
            to={item.path}>{item.name}</NavLink>)}
    </nav>
}

export default Navigation;