import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeLoader } from './components/common/ThemeLoader';
import PrivateRoute from './components/auth/PrivateRoute';
import Home from './components/home/Home';
import BaseLayout from './components/common/BaseLayout';
import Login from './components/auth/Login';
import { ReactNotifications } from 'react-notifications-component';
import LoadingContainer from './components/loading/LoadingContainer';
import ErrorPage from './components/error/ErrorPage';
import PublicEmail from './components/public/PublicEmail';
import { useDispatch } from 'react-redux';
import { setActiveTheme } from './components/theme/themeSlice';
import TagPage from './components/tag/TagPage';
import SignUp from './components/auth/SignUp';
import SearchPage from './components/searchPage/SearchPage';
import NovelDetailPage from './components/novel/novelDetailPage/NovelDetailPage';
import UserPage from './components/userPage/userPage/UserPage';
import NovelReadPage from './components/novel/novelReadPage/NovelReadPage';
import Library from './components/library/Library';
import FollowPage from './components/userPage/follow/FollowPage';
import NovelManagementPage from './components/novelManagementPage/NovelManagementPage';
import NovelManageDetail from './components/novelManagementPage/novelManageDetail/NovelManageDetail';
import ChapterEdit from './components/novelManagementPage/chapterEdit/ChapterEdit';
import AdminMainPage from './components/admin/adminMainPage/AdminMainPage';
import AuthorDashboard from './components/novelManagementPage/authorDashboard/AuthorDashboard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveTheme("light"))
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      const $this = e.target as HTMLElement;
      const $elms = document.querySelectorAll(".dropdown-menu.show");
      const $dropdownMenu = $this.closest(".dropdown-menu");
      const isDropdownToggle = $this.classList.contains("dropdown-toggle");

      const isBtnAcePopup = $this.classList.contains("btn_ace_popup");
      if (isBtnAcePopup) return;

      $elms.forEach(($el) => {
        // If click on this dropdown menu
        if ($el === $dropdownMenu || isDropdownToggle) return;
        // Hide others
        // class "showPopup" is the name of class AcePopup custom to remove when clicking out side in App.tsx
        //  After remove this class, it will be trigged by MutationObserver and hide this popup with custom function
        $el.classList.remove("showPopup");
      });
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ThemeLoader />}>
            <Route element={<BaseLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/tags/:tag" element={<TagPage />} />
              <Route path="/search/:genre" element={<SearchPage />} />
              <Route path="/search/" element={<SearchPage />} />
              <Route path="/novel/:id" element={<NovelDetailPage />} />
              <Route path="/user/:id" element={<UserPage />} />
              <Route path="/novel/:novel-id/chapter/:chapter-number" element={<NovelReadPage />} />
              <Route path="/user/library" element={<Library />} />
              <Route path="/user/:id/follow/:state" element={<FollowPage />} />
              <Route path="/user/:id/novels-management" element={<NovelManagementPage />} />
              <Route path="/user/:id/novels-management/dashboard" element={<AuthorDashboard />} />
              <Route path="/user/:id/novels-management/detail/:novelId" element={<NovelManageDetail />} />
              <Route path="/user/:id/novels-management/detail/:novelId/chapter-edit/:chapterId" element={<ChapterEdit />} />
              <Route element={<PrivateRoute />}>
              </Route>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/admin/:panel" element={<AdminMainPage />} />
          <Route path="/admin/:panel/:info" element={<AdminMainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/email" element={<PublicEmail />} />
          <Route path="/401" element={<ErrorPage code={401} />} />
          <Route path="/403" element={<ErrorPage code={403} />} />
          <Route path="/*" element={<ErrorPage code={404} />} />
        </Routes>
      </BrowserRouter>
      {/* Show notification */}
      <ReactNotifications />
      {/* Show loader */}
      <LoadingContainer />
    </>
  );
}

export default App;
