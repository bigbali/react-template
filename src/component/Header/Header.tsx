import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/Navigation';
import './Header.style';
import SettingsDesktop from 'Component/Settings';

export const Header = () => {
    const { isDesktop } = useDevice();

    return (
        <div block="Header">
            <h1 elem="Branding">
                Template
            </h1>
            <Navigation />
            {isDesktop && <SettingsDesktop />}
        </div>
    );
};

export default Header;
