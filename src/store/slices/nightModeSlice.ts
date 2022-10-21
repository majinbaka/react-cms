import { Config } from '@app/config/cms.config';
import { createAction, createSlice, PrepareAction } from '@reduxjs/toolkit';

const DEFAULT_NIGHT_MODE_INTERVAL = [20 * 3600 * 1000, 8 * 3600 * 1000];

interface NightModeState {
  isNightMode: boolean;
  nightTime: number[];
}

const currentNightTimeJSON = Config.storageDefaut.getItem('nightTime');
const currentNightTime: number[] = currentNightTimeJSON
  ? (JSON.parse(currentNightTimeJSON) as number[])
  : DEFAULT_NIGHT_MODE_INTERVAL;

const isNightMode = Config.storageDefaut.getItem('nightMode') === 'true';

Config.storageDefaut.setItem('nightTime', JSON.stringify(currentNightTime));
Config.storageDefaut.setItem('nightMode', JSON.stringify(isNightMode));

const initialState: NightModeState = {
  isNightMode,
  nightTime: currentNightTime,
};

export const setNightMode = createAction<PrepareAction<boolean>>('nightMode/setNightMode', (isNightMode) => {
  Config.storageDefaut.setItem('nightMode', JSON.stringify(isNightMode));

  return {
    payload: isNightMode,
  };
});

export const setNightTime = createAction<PrepareAction<number[]>>('nightMode/setNightTime', (nightTime) => {
  Config.storageDefaut.setItem('nightTime', JSON.stringify(nightTime));

  return {
    payload: nightTime,
  };
});

export const nightModeSlice = createSlice({
  name: 'nightMode',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setNightMode, (state, action) => {
      state.isNightMode = action.payload;
    });
    builder.addCase(setNightTime, (state, action) => {
      state.nightTime = action.payload;
    });
  },
});

export default nightModeSlice.reducer;
