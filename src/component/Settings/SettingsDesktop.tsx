import { useState } from 'react';
import { HamburgerMenuIcon, SettingsIcon } from 'Component/Icon';
import { useSettings } from 'Util';
import { Theme } from 'Store';
import Switch from 'Component/Switch';
import './Settings.style';


export const SettingsDesktop = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [settings, actions] = useSettings();

    const handleThemeSwitch = (newTheme: Theme) => {
        actions.setTheme(newTheme);
    };

    // => on desktop, use portal?
    // mobile ? navigation position bottom or top
    // language
    // increased readability: increase font sizes and contrast => replace px units with em and set font size on body

    return (
        <div block='Settings-Desktop' mods={{ isExpanded }}>
            <button
                elem='Expander'
                onClick={() => setIsExpanded((state) => !state)}>
                <SettingsIcon isExpanded={isExpanded} />
            </button>
            <div elem='Overlay'>
                <p elem='SettingsLabel'>
                    Settings
                </p>
                <Switch
                    onSwitch={handleThemeSwitch}
                    valueLeft={Theme.LIGHT}
                    valueRight={Theme.DARK}
                    iconLeft={<HamburgerMenuIcon isExpanded={false} />}
                    iconRight={<SettingsIcon isExpanded={false} />}
                    textLeft='Light'
                    textRight='Dark'
                    label='Color Scheme'
                    initiallySelectRight={settings.theme === Theme.DARK}
                />
            </div>
        </div>
    );
};

export default SettingsDesktop;