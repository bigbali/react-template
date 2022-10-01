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
                appear: `${classNames}-in`,
                appearActive: `${classNames}-in-active`,
                appearDone: `${classNames}-in-done`,
                enter: `${classNames}-enter`,
                enterActive: `${classNames}-enter-active`,
                enterDone: `${classNames}-enter-done`,
                exit: `${classNames}-out`,
                exitActive: `${classNames}-out-active`,
                exitDone: `${classNames}-out-done`,
            };
        }

        if (typeof classNames === 'object') {
            return classNames;
        }
    })();

    return (
        <CSSTransition {...props as CSSTransitionProps}
            in
            appear
            classNames={__classNames__}
        />
    );
};

export default Transition;