import Icon from 'Component/Icon';
import { useState } from 'react';

export const SettingsOverlay = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    // settings in global store
    // usesettings hook
    // on mobile put in nav menu, on desktop is overlay with button
    // => on desktop, do as with navmenu on mobile => use portal
    // dark / light mode
    // mobile ? navigation position bottom or top
    // language
    // increased readability: increase font sizes and contrast => replace px units with em and set font size on body


    // todo: create hook to allow animation on conditionally rendered component

    return (
        <div>
            <Icon.Settings
                isExpanded={isExpanded}
                onClick={toggleIsExpanded} />
            <div>
                SettingsOverlay
            </div>
        </div>
    );
};

export default SettingsOverlay;