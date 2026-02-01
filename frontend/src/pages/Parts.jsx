import React, { useEffect, useState } from 'react';
import { getParts } from '../api';
import { Link } from 'react-router-dom';

const Parts = () => {
    const [parts, setParts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const data = await getParts();
                setParts(data);
            } catch (err) {
                setError('Failed to load Parts.');
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, []);

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="container"><p className="error">{error}</p></div>;

    return (
        <div className="container page-transition">
            <h1 style={styles.title}>Constitution Parts</h1>
            <div style={styles.grid}>
                {Object.entries(parts).map(([key, value]) => (
                    <Link to={`/parts/${key}`} key={key} className="card" style={styles.card}>
                        <div style={styles.glow}></div>
                        <div style={styles.partHeader}>
                            <span style={styles.partNumber}>{key}</span>
                        </div>
                        <h3 style={styles.partTitle}>{value.title}</h3>
                        <p style={styles.description}>{value.description}</p>
                    </Link>
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        paddingBottom: '3rem',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        borderTop: '1px solid rgba(99, 102, 241, 0.5)', // Indigo border top
        borderRadius: 'var(--border-radius)',
        padding: '1.5rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    glow: {
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1), transparent 60%)', // Indigo glow
        pointerEvents: 'none',
        zIndex: 0,
    },
    partHeader: {
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 1,
    },
    partNumber: {
        display: 'inline-block',
        background: 'rgba(99, 102, 241, 0.15)', // Indigo transparent
        color: '#818cf8', // Indigo 400
        padding: '4px 12px',
        borderRadius: '8px',
        fontSize: '0.85rem',
        fontWeight: '600',
        letterSpacing: '1px',
        border: '1px solid rgba(99, 102, 241, 0.3)',
    },
    partTitle: {
        fontSize: '1.25rem',
        marginBottom: '0.75rem',
        color: 'var(--text-main)',
        position: 'relative',
        zIndex: 1,
    },
    description: {
        fontSize: '0.95rem',
        color: 'var(--text-secondary)',
        position: 'relative',
        zIndex: 1,
        lineHeight: '1.6',
    },
};

export default Parts;
