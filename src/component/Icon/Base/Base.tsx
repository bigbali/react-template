import { DetailedHTMLProps, HTMLAttributes } from 'react';
import './Base.style.scss';

export const Base = ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    return (
        <div block="Icon" {...props}>
            {children}
        </div>
    );
};

export default Base;