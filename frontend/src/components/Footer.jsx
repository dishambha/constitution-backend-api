import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div className="container">
                <p style={styles.text}>&copy; {new Date().getFullYear()} Indian Constitution Explorer</p>

                <div style={styles.branding}>
                    <p style={styles.credit}>Developed by <span style={styles.name}>Dishambha Awasthi</span></p>
                    <div style={styles.description}>
                        A custom-built <span style={styles.highlight}>OOPs</span> based <span style={styles.highlight}>Backend</span> architecture utilizing <span style={styles.highlight}>Python</span> & <span style={styles.highlight}>FastAPI</span>, paired with an
                        interactive modern frontend crafted through <span style={styles.highlight}>Vibe Coding</span>.
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#020617', // Slate 950
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#94a3b8',

        padding: '3rem 0',
        textAlign: 'center',
        marginTop: 'auto',
    },
    text: {
        fontWeight: '500',
        letterSpacing: '0.05em',
    },
    subText: {
        fontSize: '0.8rem',
        opacity: 0.6,
        marginTop: '0.5rem',
    },
    branding: {
        marginTop: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '1.5rem',
        maxWidth: '600px',
        margin: '1.5rem auto 0',
    },
    credit: {
        fontSize: '1rem',
        color: 'var(--text-main)',
        marginBottom: '0.5rem',
    },
    name: {
        color: 'var(--primary-color)',
        fontWeight: '600',
    },
    description: {
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.6',
        maxWidth: '500px',
        margin: '0 auto',
    },
    highlight: {
        color: '#2dd4bf', // Teal
        fontWeight: '500',
    },
};

export default Footer;
