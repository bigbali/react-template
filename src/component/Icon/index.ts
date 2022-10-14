export { default as CloseIcon } from './CloseIcon';
export { default as ChevronIcon } from './ChevronIcon';
export { default as HamburgerMenuIcon } from './HamburgerMenuIcon';
export { default as SettingsIcon } from './SettingsIcon';
export { default as SunIcon } from './SunIcon';
export { default as MoonIcon } from './MoonIcon';

import { default as Base } from './Base';
import { default as Close } from './CloseIcon';
import { default as Chevron } from './ChevronIcon';
import { default as HamburgerMenu } from './HamburgerMenuIcon';
import { default as Settings } from './SettingsIcon';
import { default as Sun } from './SunIcon';
import { default as Moon } from './MoonIcon';

const Icon = {
    Base,
    Close,
    Chevron,
    HamburgerMenu,
    Settings,
    Sun,
    Moon
};

export default Icon;
export interface IconProps {
    color?: string
}
