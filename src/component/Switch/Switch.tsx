import { ChevronIcon } from 'Component/Icon';
import { Direction } from 'Component/Icon/ChevronIcon/ChevronIcon';
import React, { useCallback, useState } from 'react';
import './Switch.style';

interface SwitchProps {
    onSwitch: (value: any) => void,
    valueLeft?: any,
    valueRight?: any,
    iconLeft?: JSX.Element,
    iconRight?: JSX.Element,
    textLeft?: string,
    textRight?: string,
    label?: string,
    initiallySelectRight?: boolean
};

const Switch = ({
    onSwitch,
    valueLeft,
    valueRight,
    iconLeft,
    iconRight,
    textLeft,
    textRight,
    label,
    initiallySelectRight = false
}: SwitchProps) => {
    const [value, setValue] = useState<any>(initiallySelectRight
        ? valueRight
        : valueLeft);

    console.log(value);

    const onClick = useCallback(() => {
        const newValue = value === valueLeft ? valueRight : valueLeft;
        onSwitch(newValue);
        setValue(newValue);
    }, [value]);

    return (
        <button
            block='Switch'
            onClick={onClick}
            mods={{ isSwitched: value === valueRight }}>
            <div elem='Value'>
                <div elem='Value-Left'>
                    {iconLeft && ( // bem transform doesnt work here
                        <span block='Switch-Value-Left-Icon'>
                            {iconLeft}
                        </span>
                    )}
                    {textLeft && (
                        <span block='Switch-Value-Left-Text'>
                            {textLeft}
                        </span>
                    )}
                </div>
                <div elem='Value-Right'>
                    {iconRight && (
                        <span block='Switch-Value-Right-Icon'>
                            {iconRight}
                        </span>
                    )}
                    {textRight && (
                        <span block='Switch-Value-Right-Text'>
                            {textRight}
                        </span>
                    )}
                </div>
                <ChevronIcon
                    direction={
                        value === valueRight
                            ? Direction.LEFT
                            : Direction.RIGHT
                    }
                />
            </div>
            <p elem='Label'>
                {label}
            </p>
        </button>
    );
};

export default Switch;