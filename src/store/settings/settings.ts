import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

export enum DefaultColorValue {
    GREEN = '#008000',
    BLUE = '#1b6099',
    PURPLE = '#870c87',
    YELLOW = '#e0af00'
}

export const DefaultColors = {
    BLUE: {
        name: 'Blue',
        value: DefaultColorValue.BLUE
    },
    GREEN: {
        name: 'Green',
        value: DefaultColorValue.GREEN
    },
    PURPLE: {
        name: 'Purple',
        value: DefaultColorValue.PURPLE
    },
    YELLOW: {
        name: 'Yellow',
        value: DefaultColorValue.YELLOW
    }
};

export type ColorType = {
    name: string,
    value: DefaultColorValue | string
};

export type Color = ColorType | null;

export interface Settings {
    theme: Theme,
    themeColorOverride: Color | null,
    fontSizeOverride: number | null
}

const initialState: Settings = {
    theme: localStorage.getItem('theme') as Theme ?? Theme.LIGHT,
    themeColorOverride: (() => {
        const color = localStorage.getItem('theme_color_override');

        if (!color) {
            return null;
        }

        return JSON.parse(color) as Color;
    })(),
    fontSizeOverride: (() => {
        const fontSize = localStorage.getItem('font_size_override');

        if (!fontSize) {
            return null;
        }

        return Number.parseFloat(fontSize);
    })()
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, { payload }: PayloadAction<Theme>) => {
            localStorage.setItem('theme', payload);
            state.theme = payload;
        },
        setThemeColorOverride: (state, { payload }: PayloadAction<Color>) => {
            if (payload === null) {
                localStorage.removeItem('theme_color_override');
            }
            else {
                localStorage.setItem('theme_color_override', JSON.stringify(payload));
            }

            state.themeColorOverride = payload;
        },
        setFontSizeOverride: (state, { payload }: PayloadAction<number>) => {
            localStorage.setItem('font_size_override', payload.toString());
            state.fontSizeOverride = payload;
        }
    }
});

export default settingsSlice;