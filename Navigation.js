import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

/**
 * Navgation component that displays links for navigations to Home and Create Exercise page
 */
function Navigation() {
    return (
        <nav className='App-nav'>
            <div><Link to='/'>Home</Link></div>
            <div><Link to='/create-exercise'>Create Exercise</Link></div>
        </nav>
    );
}

export default Navigation;