import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './layouts/Layout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Admission from './pages/Admission';
import Students from './pages/Students';
import Library from './pages/Library';
import News from './pages/News';
import Contact from './pages/Contact';
import Faculty from './pages/Faculty';
import FacultyDetails from './pages/FacultyDetails';
import Partners from './pages/Partners';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';


const PageTitleUpdater = () => {
  const location = useLocation();
  useEffect(() => {
    const routeTitles = {
      '/': 'Home',
      '/about': 'About Us',
      '/programs': 'Academic Programs',
      '/admission': 'Admission',
      '/students': 'Student Life',
      '/library': 'E-Library',
      '/news': 'News',
      '/contact': 'Contact Us',
      '/faculty': 'Faculty',
      '/partners': 'Partners',
      '/login': 'Portal Login',
      '/admin': 'Admin Dashboard'
    };

    // Handle dynamic routes like /programs/faculty/1
    let currentTitle = routeTitles[location.pathname];
    if (!currentTitle) {
      if (location.pathname.startsWith('/programs/faculty/')) currentTitle = 'Faculty Profile';
      else currentTitle = 'Welcome';
    }
    
    document.title = `${currentTitle} | Bonamary University`;
  }, [location]);
  
  return null;
};

const App = () => {
  return (
    <>
      <PageTitleUpdater />
      <Routes>
      {/* Public Website Routes wrapped in student/public Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="admission" element={<Admission />} />
        <Route path="students" element={<Students />} />
        <Route path="library" element={<Library />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="programs/faculty/:id" element={<FacultyDetails />} />
        <Route path="partners" element={<Partners />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Isolated Executive Admin Routes wrapped in AdminLayout (NO student header/footer) */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/dashboard/*" element={<AdminDashboard />} />
      </Route>
    </Routes>
    </>
  );
};

export default App;
