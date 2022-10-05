import {
    useState,
    useEffect,
    useRef
} from 'react';
import { TransitionGroup } from 'react-transition-group';
import {
    CloseIcon,
    HamburgerMenuIcon
} from 'Component/Icon';
import Transition from 'Component/Transition/Transition';
import { navigationMap } from '../Navigation';
import NavigationItem from '../NavigationItem';
import '../Navigation.style';

const NavigationMobile = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            document.querySelector('body')!.classList.add('disable-scrolling');
        } else {
            document.querySelector('body')!.classList.remove('disable-scrolling');
        }
    }, [isExpanded]);

    const Menu = (
        isExpanded && (
            <Transition
                in
                appear
                timeout={{
                    enter: 200,
                    exit: 100
                }}
                nodeRef={ref}
                classNames="Navigation-Mobile"
            >
                <div block="Navigation" elem="Mobile" ref={ref}>
                    <div elem="Mobile-Menu">
                        <nav elem="Nav">
                            <h1 elem="MobileHeader">
                                Menu
                            </h1>
                            <ul elem="List">
                                {navigationMap.map(NavigationItem)}
                            </ul>
                        </nav>
                        {/* <div elem="SettingsWrapper">
                            <Settings />
                        </div> */}
                    </div>
                    <div elem="Mobile-Menu-Exit" onClick={() => setIsExpanded(false)}>
                        <CloseIcon />
                    </div>
                </div>
            </Transition>
        )
    );

    // can we get this to work with portal?
    // const MenuPortal = createPortal(Menu, document.querySelector('#root')!);

    return (
        <TransitionGroup component={null}>
            <div
                block="Navigation"
                elem="HamburgerIconWrapper"
                onClick={() => setIsExpanded((state) => !state)}
            >
                <HamburgerMenuIcon isExpanded={isExpanded} />
            </div>
            {Menu}
        </TransitionGroup>
    );
};

export default NavigationMobile;