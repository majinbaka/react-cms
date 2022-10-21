import { Config } from '@app/config/cms.config';
import { ThemeType } from '@app/interfaces/interfaces';
import { createSlice, createAction, PrepareAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: ThemeType;
}

export const defaultTheme = (Config.storageDefaut.getItem('theme') as ThemeType) || Config.defaultTheme;

Config.storageDefaut.setItem('theme', defaultTheme);

const initialState: ThemeState = {
  theme: defaultTheme,
};

export const setTheme = createAction<PrepareAction<ThemeType>>('theme/setTheme', (theme: ThemeType) => {
  Config.storageDefaut.setItem('theme', theme);
  return {
    payload: theme,
  };
});

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setTheme, (state, action) => {
      state.theme = action.payload;
    });
  },
});

export default themeSlice.reducer;
