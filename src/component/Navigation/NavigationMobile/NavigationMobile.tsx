import {
    useState,
    useEffect,
    useRef
} from 'react';
import { useLocation } from 'react-router';
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
    const location = useLocation();
    const ref = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            document.querySelector('body')!.classList.add('disable-scrolling');
        } else {
            document.querySelector('body')!.classList.remove('disable-scrolling');
        }
    }, [isExpanded]);

    useEffect(() => { // when we click on a navigation item, close the menu, but first wait for the animations
        const id = setTimeout(() => setIsExpanded(false), 300);
        return () => clearTimeout(id);
    }, [location]);

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
                    </div>
                    <div elem="Mobile-Menu-Exit" onClick={() => setIsExpanded(false)}>
                        <CloseIcon />
                    </div>
                </div>
            </Transition>
        )
    );

    // can we get this to work with portal? conditional rendering?
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