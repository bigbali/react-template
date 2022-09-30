import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/Navigation';
import Settings from 'Component/Settings';
import './Header.style';

export const Header = () => {
    const { isMobile, isDesktop } = useDevice();

    const label = isMobile ? 'Template: Mobile' : 'Template: Desktop';

    return (
        <div block="Header">
            <h1 elem="Branding">
                {label}
            </h1>
            <Navigation />
            {isDesktop && <Settings />}
        </div>
    );
};

export default Header;
