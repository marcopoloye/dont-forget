import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MobileSideBar.scss';
import { Link } from 'react-router-dom';

function MobileSideBar() {
    return (
        <Menu width={200}>
            <Link to='/'>
                <p className="menu-item">
                    Home
                </p>
            </Link>
            <Link to='/my-lists'>
                <p className="menu-item">
                    My Lists
                </p>
            </Link>
            <Link to='/profile'>
                <p className="menu-item">
                    Profile
                </p>
            </Link>
        </Menu>
    );
}

export default MobileSideBar;