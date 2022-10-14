import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

export interface Settings {
    theme: Theme,
    themeColorOverride: string | null,
    fontSizeOverride: number | null
}

const initialState: Settings = {
    theme: localStorage.getItem('theme') as Theme ?? Theme.LIGHT,
    themeColorOverride: localStorage.getItem('theme_color_override'),
    fontSizeOverride: (() => {
        const fso = localStorage.getItem('font_size_override');

        if (fso === null) return fso;

        return Number.parseFloat(fso);
    })(),
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // update() {
        //     const isMobile = getIsMobile();
        //     return {
        //         isMobile,
        //         isDesktop: !isMobile
        //     };
        // },
        setTheme: (state, { payload }: PayloadAction<Theme>) => {
            localStorage.setItem('theme', payload);
            state.theme = payload;
        },
        setFontSizeOverride: (state, { payload }: PayloadAction<number>) => {
            localStorage.setItem('font_size_override', payload.toString());
            state.fontSizeOverride = payload;
        }
    }
});

export default settingsSlice;