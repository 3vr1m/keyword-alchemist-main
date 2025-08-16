import React, { useState } from 'react';
import { X, Shield, BarChart3, Megaphone, Save, Info } from 'lucide-react';
import { CookieConsent } from '../types';

interface CookieSettingsProps {
  isOpen: boolean;
  currentConsent: CookieConsent | null;
  onSave: (consent: CookieConsent) => void;
  onClose: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({
  isOpen,
  currentConsent,
  onSave,
  onClose
}) => {
  const [consent, setConsent] = useState<CookieConsent>(
    currentConsent || {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    }
  );

  const handleSave = () => {
    onSave(consent);
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now()
    };
    setConsent(allAccepted);
  };

  const handleDeclineAll = () => {
    const allDeclined = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now()
    };
    setConsent(allDeclined);
  };

  if (!isOpen) return null;

  return (
    <div className="cookie-settings-overlay" onClick={onClose}>
      <div className="cookie-settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cookie-settings-header">
          <div className="cookie-settings-title">
            <Shield size={24} />
            <span>Cookie Settings</span>
          </div>
          <button 
            className="cookie-settings-close"
            onClick={onClose}
            aria-label="Close cookie settings"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="cookie-settings-body">
          <p className="cookie-settings-intro">
            Manage your cookie preferences. You can customize which types of cookies you allow us to use.
          </p>
          
          <div className="cookie-settings-actions">
            <button 
              className="cookie-settings-button secondary"
              onClick={handleDeclineAll}
            >
              Decline All
            </button>
            <button 
              className="cookie-settings-button secondary"
              onClick={handleAcceptAll}
            >
              Accept All
            </button>
          </div>
          
          <div className="cookie-settings-options">
            {/* Necessary Cookies - Always enabled */}
            <div className="cookie-option necessary">
              <div className="cookie-option-header">
                <div className="cookie-option-info">
                  <h4>Necessary Cookies</h4>
                  <p>Essential for the website to function properly</p>
                </div>
                <div className="cookie-option-toggle">
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    readOnly
                  />
                  <span className="toggle-label">Always Active</span>
                </div>
              </div>
              <div className="cookie-option-description">
                <Info size={16} />
                <span>These cookies are required for basic site functionality and cannot be disabled.</span>
              </div>
            </div>
            
            {/* Analytics Cookies */}
            <div className="cookie-option">
              <div className="cookie-option-header">
                <div className="cookie-option-info">
                  <h4>
                    <BarChart3 size={16} />
                    Analytics Cookies
                  </h4>
                  <p>Help us understand how visitors interact with our website</p>
                </div>
                <div className="cookie-option-toggle">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                  />
                  <span className="toggle-label">{consent.analytics ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
              <div className="cookie-option-description">
                <Info size={16} />
                <span>These cookies help us improve our website by collecting information about how you use it.</span>
              </div>
            </div>
            
            {/* Marketing Cookies */}
            <div className="cookie-option">
              <div className="cookie-option-header">
                <div className="cookie-option-info">
                  <h4>
                    <Megaphone size={16} />
                    Marketing Cookies
                  </h4>
                  <p>Used to deliver relevant advertisements and track marketing campaign performance</p>
                </div>
                <div className="cookie-option-toggle">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                  />
                  <span className="toggle-label">{consent.marketing ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
              <div className="cookie-option-description">
                <Info size={16} />
                <span>These cookies are used to make advertising messages more relevant to you and your interests.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cookie-settings-footer">
          <button 
            className="cookie-settings-button secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="cookie-settings-button primary"
            onClick={handleSave}
          >
            <Save size={16} />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
