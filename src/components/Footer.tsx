import React from 'react';
import { Shield, FileText, Cookie } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'cookies') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <span 
            className="footer-link"
            onClick={() => onOpenPolicy('privacy')}
          >
            <Shield size={14} />
            Privacy Policy
          </span>
          <span 
            className="footer-link"
            onClick={() => onOpenPolicy('terms')}
          >
            <FileText size={14} />
            Terms of Service
          </span>
          <span 
            className="footer-link"
            onClick={() => onOpenPolicy('cookies')}
          >
            <Cookie size={14} />
            Cookie Policy
          </span>
        </div>
        
        <div className="footer-disclaimer">
          Results may vary based on competition, timing, and keyword complexity. AI-generated content is for reference only. &copy; {currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
