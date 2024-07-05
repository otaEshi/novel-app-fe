import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import themeSlice from '../components/theme/themeSlice';
import loadingSlice from '../components/loading/loadingSlice';
import authSlice from '../components/auth/authSlice';
import homeSlice from '../components/home/homeSlice';
import tagSlice from '../components/tag/tagSlice';
import novelDetailPageSlice from '../components/novel/novelDetailPage/novelDetailPageSlice';
import novelReadPageSlice from '../components/novel/novelReadPage/novelReadPageSlice';
import searchSlice from '../components/searchPage/searchSlice';
import librarySlice from '../components/library/librarySlice';
import userSlice from '../components/userPage/userPage/userSlice';
import followSlice from '../components/userPage/follow/followSlice';
import reviewSlice from '../components/review/reviewSlice';
import novelManagementSlice from '../components/novelManagementPage/novelManagementSlice';
import adminSlice from '../components/admin/adminMainPage/adminSlice';
import dashboardSlice from '../components/admin/adminDashboard/dashboardSlice';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const loggerMiddleWare = (store: any) => (next: any) => (action: any) => {
//   // Log only on debug mode
//   if (process.env.NODE_ENV !== 'development') {
//     return next(action);
//   }
//   console.log('dispatching', action);
//   let tic = new Date().getTime();
//   let result = next(action);
//   // console.log('next state', store.getState());
//   let toc = new Date().getTime();
//   console.log('action took', toc - tic, 'ms');
//   return result;
// };


export const store = configureStore({
  reducer: {
    theme: themeSlice,
    loading: loadingSlice,
    auth: authSlice,
    home: homeSlice,
    tag: tagSlice,
    novelDetail: novelDetailPageSlice,
    novelReadPage: novelReadPageSlice,
    search: searchSlice,
    library: librarySlice,
    user: userSlice,
    follow: followSlice,
    review: reviewSlice,
    novelManagement: novelManagementSlice,
    admin: adminSlice,
    dashboard: dashboardSlice,
  },
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;