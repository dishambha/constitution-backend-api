import React, { useState, useEffect } from 'react';
import { getPreamble } from '../api';
import { Link } from 'react-router-dom';
import ConstitutionFlow from '../components/ConstitutionFlow';

const Home = () => {
    const [preamble, setPreamble] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPreamble = async () => {
            try {
                const data = await getPreamble();
                if (data && data.preamble) {
                    setPreamble(data.preamble);
                }
            } catch (err) {
                setError('Failed to load Preamble.');
            } finally {
                setLoading(false);
            }
        };

        fetchPreamble();
    }, []);

    if (loading) return <div className="loading-spinner"></div>;
    // Removed early return on error so the rest of the page (Image, Links) still loads.
    // The error will be displayed inside the Preamble card instead.

    return (
        <div className="container page-transition">
            <div style={styles.hero}>
                <div style={styles.headerGroup}>
                    <h1 style={styles.title}>The Constitution <br />of <span style={styles.gradientText}>India</span></h1>
                    <p style={styles.tagline}>The supreme law of the land, digitized for the future.</p>
                </div>

                {/* Split Section: Book & History */}
                <div style={styles.splitSection}>
                    {/* Left: Book Image */}
                    <div style={styles.imageColumn}>
                        <img
                            src="/constitution_book_v2.png"
                            alt="Constitution of India Book"
                            style={styles.bookImage}
                        />
                    </div>

                    {/* Right: History Text */}
                    <div style={styles.textColumn}>
                        <h2 style={styles.historyTitle}>A Legacy of <span style={styles.gradientText}>Justice</span></h2>
                        <p style={styles.historyText}>
                            The Constitution of India is the longest written constitution of any country on Earth.
                            Drafted by the Constituent Assembly led by <strong>Dr. B.R. Ambedkar</strong>, it was adopted on
                            <strong>26 November 1949</strong> and came into effect on <strong>26 January 1950</strong>.
                        </p>
                        <p style={styles.historyText}>
                            It declares India a sovereign, socialist, secular, and democratic republic, assuring its citizens
                            justice, equality, and liberty, and endeavors to promote fraternity.
                        </p>
                    </div>
                </div>

                <div style={styles.preambleCard} className="card">
                    <div style={styles.cardHeader}>
                        <h2 style={styles.subtitle}>// Preamble</h2>
                        <div style={styles.dots}>
                            <span style={{ ...styles.dot, background: '#ef4444' }}></span>
                            <span style={{ ...styles.dot, background: '#eab308' }}></span>
                            <span style={{ ...styles.dot, background: '#22c55e' }}></span>
                        </div>
                    </div>
                    <div style={styles.preambleText}>
                        {error ? (
                            <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>
                        ) : (
                            preamble.split('\n').map((line, index) => (
                                <p key={index} style={styles.line}>{line}</p>
                            ))
                        )}
                    </div>
                </div>

                <ConstitutionFlow />

                <div style={styles.actions}>
                    <Link to="/parts" className="btn btn-primary">Browse Parts</Link>
                    <Link to="/schedules" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>View Schedules</Link>
                </div>
            </div>
        </div>
    );
};

const styles = {
    hero: {
        textAlign: 'center',
        padding: '4rem 0',
    },
    headerGroup: {
        marginBottom: '3rem',
    },
    splitSection: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
        marginBottom: '6rem',
        padding: '0 1rem',
        maxWidth: '1100px',
        margin: '0 auto 6rem',
    },
    imageColumn: {
        flex: '1 1 400px',
        display: 'flex',
        justifyContent: 'center',
    },
    bookImage: {
        maxWidth: '100%',
        maxHeight: '500px',
        width: 'auto',
        borderRadius: '8px',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
        transform: 'perspective(1000px) rotateY(-5deg)',
        transition: 'transform 0.3s ease',
    },
    textColumn: {
        flex: '1 1 400px',
        textAlign: 'left',
    },
    historyTitle: {
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
        color: 'var(--text-main)',
        lineHeight: '1.2',
    },
    historyText: {
        fontSize: '1.1rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
    },
    title: {
        fontSize: '4.5rem',
        marginBottom: '1rem',
        lineHeight: '1.1',
        fontWeight: '700',
        letterSpacing: '-0.02em',
    },
    gradientText: {
        background: 'linear-gradient(to right, #6366f1, #14b8a6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    tagline: {
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto',
        fontWeight: '300',
    },
    preambleCard: {
        maxWidth: '800px',
        margin: '0 auto 4rem',
        background: 'rgba(30, 41, 59, 0.4)', // More transparent
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '24px',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        background: 'rgba(15, 23, 42, 0.3)',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    subtitle: {
        textAlign: 'left',
        color: 'var(--text-secondary)',
        marginBottom: '0',
        fontSize: '0.9rem',
        fontFamily: 'monospace',
        letterSpacing: '1px',
    },
    dots: {
        display: 'flex',
        gap: '8px',
    },
    dot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        display: 'inline-block',
        background: '#334155', // Slate 700 default
        opacity: 0.5,
    },
    preambleText: {
        fontSize: '1.15rem',
        lineHeight: '2',
        fontFamily: 'var(--font-heading)',
        textAlign: 'center',
        color: 'var(--text-main)',
        padding: '0 2rem 2rem',
    },
    line: {
        marginBottom: '1.2rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
        gap: '16px',
    },
};

export default Home;
