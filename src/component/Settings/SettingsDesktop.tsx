import { useCallback, useState } from 'react';
import { useSettings } from 'Util';
import {
    Color,
    DefaultColors,
    Theme
} from 'Store';
import Switch from 'Component/Switch';
import Slider from 'Component/Slider';
import {
    MoonIcon,
    SettingsIcon,
    SunIcon
} from 'Component/Icon';
import './Settings.style';

const ColorMap = [
    null,
    ...Object.values(DefaultColors)
];

export const SettingsDesktop = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [settings, actions] = useSettings();

    const handleThemeSwitch = (theme: Theme) => {
        actions.setTheme(theme);
    };

    const handleThemeColorOverride = (color: Color) => {
        actions.setThemeColorOverride(color);
    };

    const handleFontSizeOverride = (modifier: number) => {
        actions.setFontSizeOverride(modifier);
    };

    const getOutlineStyle = useCallback((color: Color) => { // when we have the default selected, null === null,
        if (settings.themeColorOverride === color           // but when we select another color, that is an object,
            || (color && settings.themeColorOverride        // therefore between page reloads their reference will change
                && (color.value === settings.themeColorOverride.value))) { // -> so we compare their values, not their references
            return `4px solid${getComputedStyle(document.body)
                .getPropertyValue(`--color-border-${settings.theme === Theme.LIGHT
                    ? 'dark'
                    : 'light'}`
                )}`;
        }
    }, [settings, actions]);

    const colorMapper = (color: Color) => {
        if (color === null) {
            return (
                <button
                    className='DefaultColor'
                    onClick={() => handleThemeColorOverride(null)}
                    title='Default (Red)'
                    style={{ outline: getOutlineStyle(null) }}
                />
            );
        }

        return (
            <button
                style={{ backgroundColor: color.value, outline: getOutlineStyle(color) }}
                onClick={() => handleThemeColorOverride(color)}
                title={color.name}
            />
        );
    };

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
                <div elem='ColorPicker'>
                    <div elem='ColorPicker-ColorsContainer'>
                        {ColorMap.map(colorMapper)}
                    </div>
                    <p elem='ColorLabel'>
                        Accent Color
                    </p>
                </div>
            </div>
        </div >
    );
};

export default SettingsDesktop;