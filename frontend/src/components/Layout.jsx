import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={styles.layout}>
            <Header />
            <main style={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

const styles = {
    layout: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        flex: 1,
        padding: '2rem 0',
    },
};

export default Layout;
