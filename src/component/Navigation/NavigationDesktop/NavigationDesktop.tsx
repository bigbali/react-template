import { navigationMap } from '../Navigation';
import NavigationItem from '../NavigationItem';

const NavigationDesktop = () => (
    <nav block='Navigation'>
        <ul elem='List'>
            {navigationMap.map(NavigationItem)}
        </ul>
    </nav>
);

export default NavigationDesktop;