import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPart, getArticlesByPart } from '../api';

const PartDetails = () => {
    const { partId } = useParams();
    const [partData, setPartData] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [pData, aData] = await Promise.all([
                    getPart(partId),
                    getArticlesByPart(partId)
                ]);

                setPartData(pData);
                setArticles(aData);
            } catch (err) {
                console.error(err);
                setError('Failed to load Part Details.');
            } finally {
                setLoading(false);
            }
        };

        if (partId) {
            fetchData();
        }
    }, [partId]);

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="container"><p className="error">{error}</p></div>;
    if (!partData) return <div className="container"><p>Part not found</p></div>;

    return (
        <div className="container page-transition">
            <div style={styles.navBar}>
                <Link to="/parts" style={styles.backLink}>&larr; Back to Parts</Link>
            </div>

            <div style={styles.header}>
                <span style={styles.badge}>Part {partId}</span>
                <h1 style={styles.title}>{partData.title}</h1>
            </div>

            <div className="card" style={styles.explanationCard}>
                <h3 style={styles.cardTitle}>// Synopsis</h3>
                <p style={styles.explanationText}>{partData.explanation}</p>
            </div>

            <div style={styles.sectionHeader}>
                <h2 style={styles.articlesTitle}>Articles</h2>
                <div style={styles.line}></div>
            </div>

            <div style={styles.articlesList}>
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <div key={article['Article Number']} className="card" style={styles.articleCard}>
                            <div style={styles.articleHeader}>
                                <span style={styles.articleBadge}>{article['Article Number']}</span>
                            </div>
                            <h4 style={styles.articleTitle}>{article.Title}</h4>
                        </div>
                    ))
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>No articles found for this part.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    navBar: {
        marginBottom: '2rem',
    },
    backLink: {
        color: 'var(--text-secondary)',
        fontWeight: '500',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'color 0.2s',
    },
    header: {
        textAlign: 'center',
        margin: '2rem 0 4rem',
    },
    badge: {
        background: 'rgba(99, 102, 241, 0.15)', // Indigo transparent
        color: '#818cf8', // Indigo 400
        padding: '6px 16px',
        borderRadius: '24px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        display: 'inline-block',
        marginBottom: '1.5rem',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        letterSpacing: '1px',
    },
    title: {
        fontSize: '3rem',
        color: 'var(--text-main)',
        background: 'linear-gradient(to bottom right, #fff, #94a3b8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    explanationCard: {
        marginBottom: '4rem',
        background: 'var(--bg-card)',
        borderLeft: '4px solid var(--primary-color)',
    },
    cardTitle: {
        color: 'var(--secondary-color)', // Teal
        fontSize: '1rem',
        fontFamily: 'monospace',
        marginBottom: '1rem',
    },
    explanationText: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: 'var(--text-main)',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '2rem',
    },
    articlesTitle: {
        marginBottom: '0',
        color: 'var(--text-main)',
        minWidth: 'fit-content',
        fontSize: '1.5rem',
    },
    line: {
        height: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
    },
    articlesList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    articleCard: {
        height: '100%',
        background: 'rgba(30, 41, 59, 0.4)', // Slightly darker/transparent for cards
        border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    articleHeader: {
        marginBottom: '1rem',
    },
    articleBadge: {
        background: 'rgba(255, 255, 255, 0.08)',
        color: '#94a3b8',
        padding: '4px 10px',
        borderRadius: '6px',
        fontWeight: '500',
        fontSize: '0.8rem',
        fontFamily: 'monospace',
    },
    articleTitle: {
        marginBottom: 0,
        fontSize: '1.1rem',
        lineHeight: '1.5',
        color: 'var(--text-main)',
        fontWeight: '600',
    }
};

export default PartDetails;
