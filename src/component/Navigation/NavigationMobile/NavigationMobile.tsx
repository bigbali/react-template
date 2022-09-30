import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTimer } from 'Util';
import { navigationMap } from '../Navigation';
import { HamburgerMenuIcon } from 'Component/Icon';
import NavigationItem from '../NavigationItem';
import '../Navigation.style';
import Settings from 'Component/Settings';

const NavigationMobile = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [keepRendered, setkeepRendered] = useState(false);
    const [createTimer, clearTimer] = useTimer();

    useEffect(() => {
        if (isExpanded) {
            document.querySelector('body')!.classList.add('disable-scrolling');
        } else {
            document.querySelector('body')!.classList.remove('disable-scrolling');
        }

        createTimer(() => setkeepRendered(isExpanded), 100);
        return () => { clearTimer(); };
    }, [isExpanded]);

    const Menu = isExpanded && keepRendered ? (
        <div block="Navigation" elem="MobileMenu">
            <nav elem="Nav">
                <h1 elem="MobileHeader">
                    Menu
                </h1>
                <ul elem="List">
                    {navigationMap.map(NavigationItem)}
                </ul>
            </nav>
            <div elem="SettingsWrapper">
                <Settings />
            </div>
        </div>
    ) : null;


    const MenuPortal = createPortal(Menu, document.querySelector('#root')!);

    return (
        <>
            <div block="Navigation" elem="HamburgerIconWrapper" onClick={() => { setIsExpanded(true); }}>
                <HamburgerMenuIcon isExpanded={isExpanded} />
            </div>
            {MenuPortal}
        </>
    );
};

export default NavigationMobile;