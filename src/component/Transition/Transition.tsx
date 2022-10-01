import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { type CSSTransitionProps } from 'react-transition-group/CSSTransition';

export const Transition = ({ classNames, ...props }: CSSTransitionProps) => {
    const __classNames__ = (() => {
        if (!classNames) {
            classNames = 'element';
        }

        if (typeof classNames === 'string') {
            return {
                appear: `${classNames}_in`,
                appearActive: `${classNames}_in-active`,
                appearDone: `${classNames}_in-done`,
                enter: `${classNames}_enter`,
                enterActive: `${classNames}_enter-active`,
                enterDone: `${classNames}_enter-done`,
                exit: `${classNames}_out`,
                exitActive: `${classNames}_out-active`,
                exitDone: `${classNames}_out-done`,
            };
        }

        if (typeof classNames === 'object') {
            return classNames;
        }
    })();

    return (
        <CSSTransition
            {...props as CSSTransitionProps}
            classNames={__classNames__}
        />
    );
};

export default Transition;