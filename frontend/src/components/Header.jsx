import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <span style={styles.emblem}>⚖️</span>
                    <span style={styles.logoText}>Indian <span style={{ color: 'var(--primary-color)' }}>Constitution</span></span>
                </Link>
                <nav>
                    <ul style={styles.navList}>
                        <li>
                            <NavLink
                                to="/"
                                style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/parts"
                                style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
                            >
                                Parts
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/schedules"
                                style={({ isActive }) => isActive ? { ...styles.link, ...styles.activeLink } : styles.link}
                            >
                                Schedules
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)', // Slate 900
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '1rem 0',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontFamily: 'var(--font-heading)',
        letterSpacing: '-0.02em',
    },
    logoText: {
        color: '#f8fafc',
    },
    emblem: {
        fontSize: '1.75rem',
        filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))',
    },
    navList: {
        display: 'flex',
        gap: '2.5rem',
    },
    link: {
        color: 'var(--text-secondary)',
        fontWeight: '500',
        fontSize: '0.95rem',
        padding: '0.5rem 0',
        borderBottom: '2px solid transparent',
        letterSpacing: '0.01em',
        position: 'relative',
        transition: 'color 0.2s',
    },
    activeLink: {
        color: '#f8fafc',
        borderBottom: '2px solid var(--primary-color)',
    },
};

export default Header;
