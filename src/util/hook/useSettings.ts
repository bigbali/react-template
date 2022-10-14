import { useSelector } from 'Util';
import store, {
    settingsSlice,
    type Theme
} from 'Store';


export const useSettings = () => {
    const settings = useSelector(state => state.settings);
    const actions = {
        setTheme: (theme: Theme) => store.dispatch(settingsSlice.actions.setTheme(theme))
    };

    return [settings, actions] as const;
};

export default useSettings;