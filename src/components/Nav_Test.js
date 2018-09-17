import React from 'react';
import { NavLink } from 'react-router-dom';

//test component
const Nav_Test = () => {
    return (
        <div>
            <nav className="nav__test">
                <NavLink to="/" className="nav__item" activeClassName="is-active" exact={true}>HOME</NavLink>
                <NavLink to="/" className="nav__item" activeClassName="is-active" exact={true}>REACT</NavLink>
                <NavLink to="/" className="nav__item" activeClassName="is-active" exact={true}>REACT ROUTER</NavLink>
            </nav>
        </div>
    )
};

export default Nav_Test;