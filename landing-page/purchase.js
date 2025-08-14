// Purchase functions for landing page
async function purchasePlan(planType) {
    try {
        const response = await fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ planType })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.url) {
            // Redirect to Stripe checkout
            window.location.href = data.url;
        } else {
            console.error('No checkout URL received');
            alert('Sorry, there was an issue creating the checkout session. Please try again.');
        }
    } catch (error) {
        console.error('Error creating checkout session:', error);
        alert('Sorry, there was an issue processing your request. Please try again.');
    }
}

function purchaseBasic() {
    purchasePlan('basic');
}

function purchaseBlogger() {
    purchasePlan('blogger');
}

function purchasePro() {
    purchasePlan('pro');
}

// Add loading states when purchasing
function showLoading(button) {
    button.disabled = true;
    button.textContent = 'Loading...';
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

// Enhanced purchase functions with loading states
async function purchasePlanWithLoading(planType, buttonElement) {
    const originalText = buttonElement.textContent;
    showLoading(buttonElement);
    
    try {
        await purchasePlan(planType);
    } catch (error) {
        hideLoading(buttonElement, originalText);
    }
}
