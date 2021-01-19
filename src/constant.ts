import React from 'react';

export const VIEW_HOME = 1;
export const VIEW_FAVOURITE = 2;
export const VIEW_TRENDING = 3;
export const VIEW_CONFIG = 9;

export const defaultView = VIEW_FAVOURITE;

export const FormContext = React.createContext({});
export const SettingContext = React.createContext({});

export const youtube_key = 'AIzaSyBw8vuvTucv0HYaeEjlOL78YAMYDD_AyAM';
export const youtube_key2 = 'AIzaSyC4pFQSXB6EcYtiTCIORY-h02_GC_Qn4WM';
export const youtube_key3 = 'AIzaSyB8jDV4IcqOi9pYVCXIs7G9cluF3wxe0zA';

export const asyncStorageKey_favourite = 'asyncStorageKey_favourite';
export const asyncStorageKey_trending = 'asyncStorageKey_trending';
export const asyncStorageKey_setting = 'asyncStorageKey_setting';
export const asyncStorageKey_region = 'asyncStorageKey_region';

export const maxResults = 25;
