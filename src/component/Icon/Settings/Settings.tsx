import { SVGProps } from 'react';
import Icon from '../index';
import './Settings.style';

export const Settings = ({ fill, ...props }: SVGProps<SVGSVGElement> & { isExpanded: boolean }) => {
    return (
        <Icon.Base>
            <svg
                {...props}
                viewBox="0 0 72 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="Icon-Settings"
            >
                <path
                    d="M0 48H72V40H0V48ZM0 28H72V20H0V28ZM0 0V8H72V0H0Z"
                    fill={fill}
                />
            </svg>
        </Icon.Base>
    );
};

export default Settings;