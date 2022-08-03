import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './MobileSideBar.scss';
import { Link } from 'react-router-dom';

function MobileSideBar() {
    return (
        <Menu>
            <Link to='/about'>
                <p className="menu-item">
                    Test
                </p>
            </Link>
        </Menu>
    );
}

export default MobileSideBar;