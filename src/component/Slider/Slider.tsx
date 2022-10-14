import React, { ChangeEvent } from 'react';
import './Slider.style';

export interface SliderProps {
    onChange: (newValue: ChangeEvent<HTMLInputElement>) => void,
    min: number,
    max: number,
    step: number,
    label?: string,
    name?: string,
    defaultValue?: number | null
}

const Slider = ({ min, max, step, label, name, defaultValue, onChange }: SliderProps) => {
    return (
        <div block='Slider'>
            <input
                elem='Input'
                type='range'
                min={min}
                max={max}
                step={step}
                name={name}
                id={name}
                defaultValue={defaultValue || min}
                onChange={onChange}
            />
            <label
                elem='Label'
                htmlFor={name}>
                {label}
            </label>
        </div>
    );
};

export default Slider;