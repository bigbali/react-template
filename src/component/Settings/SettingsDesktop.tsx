import { useState } from 'react';
import { useSettings } from 'Util';
import { Theme } from 'Store';
import Switch from 'Component/Switch';
import Slider from 'Component/Slider';
import {
    MoonIcon,
    SettingsIcon,
    SunIcon
} from 'Component/Icon';
import './Settings.style';


export const SettingsDesktop = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [settings, actions] = useSettings();

    const handleThemeSwitch = (theme: Theme) => {
        actions.setTheme(theme);
    };

    const handleFontSizeOverride = (modifier: number) => {
        console.log(modifier);
        actions.setFontSizeOverride(modifier);
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
                    iconLeft={<SunIcon />}
                    iconRight={<MoonIcon />}
                    textLeft='Light'
                    textRight='Dark'
                    label='Color Scheme'
                    initiallySelectRight={settings.theme === Theme.DARK}
                />
                <Slider
                    onChange={(e) => handleFontSizeOverride(Number.parseFloat(e.currentTarget.value))}
                    min={1}
                    max={1.4}
                    step={0.1}
                    name='fontsize-override'
                    label='Font Size'
                    defaultValue={settings.fontSizeOverride}
                />
            </div>
        </div>
    );
};

export default SettingsDesktop;