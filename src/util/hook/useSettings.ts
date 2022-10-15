import { useSelector } from 'Util';
import store, {
    Color,
    settingsSlice,
    type Theme
} from 'Store';


export const useSettings = () => {
    const settings = useSelector(state => state.settings);
    const actions = {
        setTheme: (theme: Theme) => store.dispatch(settingsSlice.actions.setTheme(theme)),
        setThemeColorOverride: (color: Color) => store.dispatch(settingsSlice.actions.setThemeColorOverride(color)),
        setFontSizeOverride: (modifier: number) => store.dispatch(settingsSlice.actions.setFontSizeOverride(modifier))
    };

    return [settings, actions] as const;
};

export default useSettings;