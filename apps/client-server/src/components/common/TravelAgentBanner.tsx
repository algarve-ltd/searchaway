"use client"
import Link from "next/link";

const TravelAgentBanner = () => {
  return (
    <div className="travel-agent-banner" style={{
      backgroundColor: '#f0e9ff',
      borderRadius: '12px',
      padding: '20px 30px',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      <div style={{ flex: '1', minWidth: '250px' }}>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a1a1a'
        }}>
          Are you a Travel Agent?
        </h3>
        <p style={{
          margin: '0',
          fontSize: '15px',
          color: '#5c5c5c',
          lineHeight: '1.5'
        }}>
          Create beautiful quotes instantly with QuoteAway AI - the smart way to win more bookings
        </p>
      </div>
      <Link
        href="https://app.quoteawayai.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: '#7c3aed',
          color: '#ffffff',
          padding: '12px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#6d28d9';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#7c3aed';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Try QuoteAway Free
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
};

export default TravelAgentBanner;
