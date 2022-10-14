export { default as CloseIcon } from './CloseIcon';
export { default as ChevronIcon } from './ChevronIcon';
export { default as HamburgerMenuIcon } from './HamburgerMenuIcon';
export { default as SettingsIcon } from './SettingsIcon';

import { default as Base } from './Base';
import { default as CloseIcon } from './CloseIcon';
import { default as ChevronIcon } from './ChevronIcon';
import { default as HamburgerMenuIcon } from './HamburgerMenuIcon';
import { default as Settings } from './SettingsIcon';

const Icon = {
    Base,
    CloseIcon,
    ChevronIcon,
    HamburgerMenuIcon,
    Settings
};

export default Icon;
export interface IconProps {
    color?: string
}
