import React from 'react';
import { X, Shield, FileText, Cookie } from 'lucide-react';

interface PolicyModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | 'cookies' | null;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;

  const getModalContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Shield size={24} />,
          content: (
            <div className="policy-content">
              <h3>Privacy Policy</h3>
              <p><strong>Last updated:</strong> August 1, 2025</p>
              
              <h4>Information We Collect</h4>
              <ul>
                <li><strong>Account Information:</strong> Email address and access key for authentication</li>
                <li><strong>Keywords:</strong> Keywords you upload for content generation</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our service</li>
                <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store card details)</li>
              </ul>
              
              <h4>How We Use Your Information</h4>
              <ul>
                <li>Generate SEO-optimized blog posts based on your keywords</li>
                <li>Manage your account and provide customer support</li>
                <li>Process payments and manage subscriptions</li>
                <li>Improve our AI algorithms and service quality</li>
                <li>Send service-related communications</li>
              </ul>
              
              <h4>Data Processing</h4>
              <p>Your keywords are processed using Google's Gemini AI to generate content. We do not share your keywords or generated content with third parties for marketing purposes.</p>
              
              <h4>Data Security</h4>
              <p>We implement industry-standard security measures including encryption, secure hosting, and regular security audits to protect your data.</p>
              
              <h4>Data Retention</h4>
              <p>We retain your account data while your account is active. Generated content is stored for your access but can be deleted upon request.</p>
              
              <h4>Your Rights (GDPR)</h4>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Object to data processing</li>
              </ul>
              
              <h4>Contact Us</h4>
              <p>For privacy concerns or to exercise your rights, contact us at support@keywordalchemist.com</p>
            </div>
          )
        };
      
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText size={24} />,
          content: (
            <div className="policy-content">
              <h3>Terms of Service</h3>
              <p><strong>Last updated:</strong> August 1, 2025</p>
              
              <h4>1. Acceptance of Terms</h4>
              <p>By using Keyword Alchemist, you agree to these Terms of Service. If you disagree with any part of these terms, you may not use our service.</p>
              
              <h4>2. Service Description</h4>
              <p>Keyword Alchemist is an AI-powered SEO content generation platform that transforms keywords into blog posts using Google's Gemini AI. The service includes:</p>
              <ul>
                <li>Bulk keyword processing</li>
                <li>AI-powered article generation</li>
                <li>Multiple content format outputs (WordPress, Shopify, etc.)</li>
                <li>SEO optimization features</li>
              </ul>
              
              <h4>3. Account Terms</h4>
              <ul>
                <li>You must provide a valid email address</li>
                <li>You are responsible for maintaining account security</li>
                <li>One account per person or legal entity</li>
                <li>You must be at least 18 years old</li>
              </ul>
              
              <h4>4. Payment and Credits</h4>
              <ul>
                <li>Services are provided on a credit-based system</li>
                <li>Credits are purchased in packages and never expire</li>
                <li>All payments are processed through Stripe</li>
                <li>No refunds are provided for unused credits</li>
              </ul>
              
              <h4>5. Acceptable Use</h4>
              <p>You agree NOT to use the service to:</p>
              <ul>
                <li>Generate illegal, harmful, or offensive content</li>
                <li>Violate intellectual property rights</li>
                <li>Create spam or deceptive content</li>
                <li>Attempt to reverse-engineer our algorithms</li>
                <li>Resell or redistribute generated content as a service</li>
              </ul>
              
              <h4>6. Content Ownership</h4>
              <ul>
                <li>You retain ownership of your keywords</li>
                <li>You own the generated content and may use it freely</li>
                <li>We retain rights to our platform and technology</li>
                <li>You grant us license to process your keywords for service delivery</li>
              </ul>
              
              <h4>7. Disclaimer</h4>
              <p>Generated content is provided "as is". We do not guarantee:</p>
              <ul>
                <li>Search engine rankings or SEO performance</li>
                <li>Factual accuracy of AI-generated content</li>
                <li>Suitability for your specific needs</li>
              </ul>
              <p>You are responsible for reviewing and editing content before publication.</p>
              
              <h4>8. Limitation of Liability</h4>
              <p>Our liability is limited to the amount paid for credits in the last 12 months. We are not liable for indirect, incidental, or consequential damages.</p>
              
              <h4>9. Termination</h4>
              <p>We may terminate accounts that violate these terms. You may close your account at any time.</p>
              
              <h4>10. Contact</h4>
              <p>For questions about these terms, contact us at support@keywordalchemist.com</p>
            </div>
          )
        };
      
      case 'cookies':
        return {
          title: 'Cookie Policy',
          icon: <Cookie size={24} />,
          content: (
            <div className="policy-content">
              <h3>Cookie Policy</h3>
              <p><strong>Last updated:</strong> August 1, 2025</p>
              
              <h4>What Are Cookies</h4>
              <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.</p>
              
              <h4>Types of Cookies We Use</h4>
              <ul>
                <li><strong>Necessary cookies:</strong> Essential for the website to function properly</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              
              <h4>How to Control Cookies</h4>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
              
              <h4>Third-Party Cookies</h4>
              <p>We may use third-party services that place cookies on your device. These services help us analyze website usage and provide better services.</p>
              
              <h4>Updates to This Policy</h4>
              <p>We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            </div>
          )
        };
      
      default:
        return { title: '', icon: null, content: null };
    }
  };

  const { title, icon, content } = getModalContent();

  return (
    <div className="policy-modal-overlay" onClick={onClose}>
      <div className="policy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="policy-modal-header">
          <div className="policy-modal-title">
            {icon}
            <span>{title}</span>
          </div>
          <button 
            className="policy-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="policy-modal-body">
          {content}
        </div>
        
        <div className="policy-modal-footer">
          <button 
            className="policy-modal-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
