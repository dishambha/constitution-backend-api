import React, { useEffect, useState } from 'react';
import { getParts, getSchedules } from '../api';

const ConstitutionFlow = () => {
    const [stats, setStats] = useState({
        partsCount: 0,
        schedulesCount: 0,
        articlesCount: 448
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Add safety checks or default values if API fails
                const parts = await getParts() || {};
                const schedules = await getSchedules() || {};

                setStats(prev => ({
                    ...prev,
                    partsCount: Object.keys(parts).length || 0,
                    schedulesCount: Object.keys(schedules).length || 0
                }));
            } catch (error) {
                console.error("Failed to load stats", error);
                // Keep default stats to prevent crash
            }
        };
        fetchData();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Structure Overview</h2>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Level 1: Constitution */}
                <div style={styles.node}>
                    <span style={styles.icon}>⚖️</span>
                    <span style={{ color: '#fff' }}>Constitution</span>
                </div>

                {/* Vertical Line from Root */}
                <div style={{ width: '2px', height: '40px', background: 'rgba(99, 102, 241, 0.3)' }}></div>

                {/* Horizontal Connector Bar */}
                <div style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '2px',
                    background: 'rgba(99, 102, 241, 0.3)',
                    marginBottom: '0'
                }}></div>

                {/* Vertical Lines to Branches */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    maxWidth: '600px',
                    marginBottom: '0'
                }}>
                    <div style={{ width: '2px', height: '30px', background: 'rgba(99, 102, 241, 0.3)' }}></div>
                    <div style={{ width: '2px', height: '30px', background: 'rgba(99, 102, 241, 0.3)' }}></div>
                    <div style={{ width: '2px', height: '30px', background: 'rgba(99, 102, 241, 0.3)' }}></div>
                </div>

                {/* Level 2: Branches */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    width: '100%',
                    maxWidth: '1000px'
                }}>

                    {/* Preamble */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '200px' }}>
                        <div style={styles.node}>
                            <span style={styles.label}>Preamble</span>
                            <span style={styles.subtext}>Introduction</span>
                        </div>
                    </div>

                    {/* Parts */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '200px' }}>
                        <div style={styles.nodeActive}>
                            <span style={styles.label}>Parts</span>
                            <span style={styles.countBadge}>{stats.partsCount}</span>
                        </div>
                        <div style={{ width: '2px', height: '30px', background: 'rgba(99, 102, 241, 0.3)' }}></div>

                        {/* Level 3: Articles */}
                        <div style={styles.nodeSmall}>
                            <span style={styles.labelSmall}>Articles</span>
                            <span style={styles.subtext}>~{stats.articlesCount}</span>
                        </div>
                    </div>

                    {/* Schedules */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '200px' }}>
                        <div style={styles.node}>
                            <span style={styles.label}>Schedules</span>
                            <span style={styles.countBadge}>{stats.schedulesCount}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Explainer / Legend Section */}
            <div style={styles.legendContainer}>
                <h3 style={styles.legendTitle}>Key Terms</h3>
                <div style={styles.legendGrid}>
                    <div style={styles.legendItem}>
                        <h4 style={styles.legendHeading}>Preamble</h4>
                        <p style={styles.legendText}>The introductory statement setting out the guiding purpose, principles, and philosophy of the Constitution.</p>
                    </div>
                    <div style={styles.legendItem}>
                        <h4 style={styles.legendHeading}>Parts</h4>
                        <p style={styles.legendText}>The individual chapters that group Articles together by topic (e.g., Fundamental Rights, The Union).</p>
                    </div>
                    <div style={styles.legendItem}>
                        <h4 style={styles.legendHeading}>Articles</h4>
                        <p style={styles.legendText}>The specific rules, laws, and provisions numbered sequentially throughout the document.</p>
                    </div>
                    <div style={styles.legendItem}>
                        <h4 style={styles.legendHeading}>Schedules</h4>
                        <p style={styles.legendText}>Additional lists and tables providing deeper details that support various Articles.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginBottom: '6rem',
        marginTop: '2rem',
        width: '100%',
        padding: '0 1rem',
    },
    title: {
        textAlign: 'center',
        fontSize: '2rem',
        marginBottom: '3rem',
        color: 'var(--text-main)',
    },
    node: {
        background: 'rgba(30, 41, 59, 0.6)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        padding: '1.5rem 2rem',
        borderRadius: '16px',
        color: '#f8fafc',
        fontWeight: 'bold',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 2,
    },
    nodeActive: {
        background: 'rgba(99, 102, 241, 0.1)',
        border: '1px solid #6366f1',
        padding: '1.5rem 2rem',
        borderRadius: '16px',
        color: '#fff',
        fontWeight: 'bold',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
        position: 'relative',
        zIndex: 2,
    },
    nodeSmall: {
        background: 'rgba(30, 41, 59, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        minWidth: '180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
    },
    icon: {
        fontSize: '1.75rem',
        marginBottom: '0.5rem',
    },
    label: {
        color: '#f8fafc',
        fontSize: '1.2rem',
        marginBottom: '0.25rem',
    },
    labelSmall: {
        color: '#94a3b8',
        fontSize: '1.1rem',
    },
    subtext: {
        fontSize: '0.85rem',
        color: '#64748b', // Slate 500
        fontWeight: '500',
        marginTop: '4px',
    },
    countBadge: {
        background: 'rgba(99, 102, 241, 0.15)', // Indigo transparent
        color: '#818cf8', // Indigo 400
        border: '1px solid rgba(99, 102, 241, 0.3)',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '0.9rem',
        marginTop: '8px',
        fontWeight: 'bold',
    },
    legendContainer: {
        marginTop: '4rem',
        padding: '2rem',
        background: 'rgba(30, 41, 59, 0.3)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    legendTitle: {
        textAlign: 'center',
        paddingBottom: '1.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        color: 'var(--text-main)',
        fontSize: '1.5rem',
    },
    legendGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
    },
    legendItem: {
        textAlign: 'left',
    },
    legendHeading: {
        color: '#818cf8', // Indigo 400
        marginBottom: '0.5rem',
        fontSize: '1.1rem',
    },
    legendText: {
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        lineHeight: '1.6',
    },
};

export default ConstitutionFlow;
