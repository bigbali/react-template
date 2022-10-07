import { useDevice } from 'Util';
import Navigation from 'Component/Navigation/Navigation';
import './Header.style';

export const Header = () => {
    const { isMobile } = useDevice();

    const label = isMobile ? 'Template: Mobile' : 'Template: Desktop';

    return (
        <div block="Header">
            <h1 elem="Branding">
                {label}
            </h1>
            <Navigation />
        </div>
    );
};

export default Header;
