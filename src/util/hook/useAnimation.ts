import { type AutoAnimationPlugin, getTransitionSizes } from '@formkit/auto-animate';
import { useAutoAnimate } from '@formkit/auto-animate/react';

enum Animation {
    FADE = 'fade',
    FLOAT = 'float'
};

type Coordinates = {
    left: number,
    right: number,
    top: number,
    bottom: number,
    width: number,
    height: number
};

const keyframeCreator: AutoAnimationPlugin = (el, action, oldCoords, newCoords) => {
    let keyframes;
    // supply a different set of keyframes for each action
    if (action === 'add') {
        keyframes = [
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1.15)', opacity: 1, offset: 0.75 },
            { transform: 'scale(1)', opacity: 1 }
        ];
    }
    // keyframes can have as many "steps" as you prefer
    // and you can use the 'offset' key to tune the timing
    if (action === 'remove') {
        keyframes = [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.15)', opacity: 1, offset: 0.33 },
            { transform: 'scale(0.75)', opacity: 0.1, offset: 0.5 },
            { transform: 'scale(0.5)', opacity: 0 }
        ];
    }
    if (action === 'remain') {
        // for items that remain, calculate the delta
        // from their old position to their new position
        const deltaX = oldCoords!.left - newCoords!.left;
        const deltaY = oldCoords!.top - newCoords!.top;
        // use the getTransitionSizes() helper function to
        // get the old and new widths of the elements
        const [widthFrom, widthTo, heightFrom, heightTo] = getTransitionSizes(el, oldCoords!, newCoords!);
        // set up our steps with our positioning keyframes
        const start = { transform: `translate(${deltaX}px, ${deltaY}px)` };
        const mid = { transform: `translate(${deltaX * -0.15}px, ${deltaY * -0.15}px)`, offset: 0.75 };
        const end = { transform: 'translate(0, 0)' };
        // if the dimensions changed, animate them too.
        if (widthFrom !== widthTo) {
            // @ts-ignore
            start.width = `${widthFrom}px`;
            // @ts-ignore
            mid.width = `${widthFrom >= widthTo ? widthTo / 1.05 : widthTo * 1.05}px`;
            // @ts-ignore
            end.width = `${widthTo}px`;
        }
        if (heightFrom !== heightTo) {
            // @ts-ignore
            start.height = `${heightFrom}px`;
            // @ts-ignore
            mid.height = `${heightFrom >= heightTo ? heightTo / 1.05 : heightTo * 1.05}px`;
            // @ts-ignore
            end.height = `${heightTo}px`;
        }
        keyframes = [start, mid, end];
    }
    // return our KeyframeEffect() and pass
    // it the chosen keyframes.
    // @ts-ignore
    return new KeyframeEffect(el, keyframes, { duration: 600, easing: 'ease-out' });
};

const useAnimation = <T extends Element>() => {
    const autoAnimate = useAutoAnimate<T>(keyframeCreator);

    return autoAnimate;
};

export default useAnimation;