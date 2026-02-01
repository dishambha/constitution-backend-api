import React, { useEffect, useState } from 'react';
import { getSchedules } from '../api';

const Schedules = () => {
    const [schedules, setSchedules] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await getSchedules();
                setSchedules(data);
            } catch (err) {
                setError('Failed to load Schedules.');
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="container"><p className="error">{error}</p></div>;

    return (
        <div className="container page-transition">
            <h1 style={styles.title}>Schedules</h1>
            <div style={styles.list}>
                {Object.entries(schedules).map(([key, value]) => (
                    <div key={key} className="card" style={styles.card}>
                        <div style={styles.header}>
                            <h2 style={styles.scheduleTitle}>
                                <span style={styles.scheduleKey}>{key}</span>
                                {value.title}
                            </h2>
                        </div>
                        <p style={styles.description}>{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    title: {
        textAlign: 'center',
        margin: '3rem 0',
        fontSize: '2.5rem',
        color: 'var(--text-main)',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto 3rem',
    },
    card: {
        display: 'block',
        padding: '2rem',
        background: 'var(--bg-card)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
    },
    header: {
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '1rem',
        marginBottom: '1rem',
    },
    scheduleTitle: {
        fontSize: '1.5rem',
        color: 'var(--text-main)',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
    },
    scheduleKey: {
        background: 'rgba(20, 184, 166, 0.15)', // Teal transparent
        color: '#2dd4bf', // Teal 400
        padding: '4px 12px',
        borderRadius: '8px',
        fontSize: '0.9rem',
        border: '1px solid rgba(20, 184, 166, 0.3)',
        fontWeight: '600',
    },
    description: {
        fontSize: '1.05rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.8',
    },
};

export default Schedules;
