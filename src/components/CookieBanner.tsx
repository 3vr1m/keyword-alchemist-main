import React from 'react';
import { X, Shield } from 'lucide-react';
import { CookieConsent } from '../types';

interface CookieBannerProps {
  onAccept: (consent: CookieConsent) => void;
  onDecline: () => void;
  onSettings: () => void;
  isVisible: boolean;
}

const CookieBanner: React.FC<CookieBannerProps> = ({
  onAccept,
  onDecline,
  onSettings,
  isVisible
}) => {


  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-content">
        <div className="cookie-banner-header">
          <div className="cookie-banner-title">
            <Shield size={20} />
            <span>We value your privacy</span>
          </div>
          <button 
            className="cookie-banner-close"
            onClick={onDecline}
            aria-label="Close cookie banner"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="cookie-banner-body">
          <p>
            We use cookies and similar technologies to provide, protect, and improve our services. 
            By clicking "Accept All", you consent to our use of cookies for analytics and marketing purposes. 
            You can customize your preferences or learn more in our{' '}
            <button 
              className="cookie-banner-link"
              onClick={onSettings}
            >
              Cookie Settings
            </button>.
          </p>
          
          <div className="cookie-banner-actions">
            <button 
              className="cookie-banner-button secondary"
              onClick={onDecline}
            >
              Decline All
            </button>
            <button 
              className="cookie-banner-button primary"
              onClick={() => onAccept({
                necessary: true,
                analytics: true,
                marketing: true,
                timestamp: Date.now()
              })}
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
