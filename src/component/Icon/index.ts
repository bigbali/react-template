// export { default } from './IconBase';
export { default as CloseIcon } from './CloseIcon';
export { default as HamburgerMenuIcon } from './HamburgerMenuIcon';

import { default as Base } from './Base';
import { default as CloseIcon } from './CloseIcon';
import { default as HamburgerMenuIcon } from './HamburgerMenuIcon';
import { default as Settings } from './Settings';

const Icon = {
    Base,
    CloseIcon,
    HamburgerMenuIcon,
    Settings
};

export default Icon;
export interface IconProps {
    color?: string
}
