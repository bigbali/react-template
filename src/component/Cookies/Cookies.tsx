import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDevice } from 'Util';
import { CloseIcon } from 'Component/Icon';
import './Cookies.style';

export const Cookies = () => {
    const isCookiesNoticeClosed = localStorage.getItem('is_cookies_notice_closed');
    const [isClosed, setIsClosed] = useState(false);
    const { isMobile } = useDevice();

    if (isCookiesNoticeClosed || isClosed) {
        return null;
    }

    const tapOrClick = isMobile ? 'Tap' : 'Click';

    return (
        <div block='Cookies'>
            <div elem='Header'>
                Cookies notice
                <div elem='Close'>
                    <button
                        elem='CloseButton'
                        onClick={() => {
                            localStorage.setItem('is_cookies_notice_closed', 'true');
                            setIsClosed(true);
                        }}>
                        <CloseIcon />
                    </button>
                </div>
            </div>
            <div elem='Body'>
                We must inform you that we are using cookies to ensure your experience browsing this page is nothing less than amazing.
                <br />
                By continuing to browse this page, you automatically agree to our cookie policy.
                <br />
                <Link
                    elem='CookiePolicy'
                    to='cookie-policy'
                    target='_blank'
                >
                    {tapOrClick} here to read about our Cookie Policy.
                </Link>
            </div>
        </div>
    );
};

export default Cookies;