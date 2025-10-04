// Enhanced Booking Form with Better UX
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50
        });
    }

    const projectForm = document.getElementById('projectForm');
    const submitBtn = projectForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formControls = document.querySelectorAll('.form-control');

    // Enhanced form validation
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const validationMessage = field.parentNode.querySelector('.validation-message') || createValidationMessage(field);
        
        // Clear previous states
        field.classList.remove('invalid');
        validationMessage.style.display = 'none';
        
        if (isRequired && !value) {
            field.classList.add('invalid');
            validationMessage.textContent = 'This field is required';
            validationMessage.style.display = 'block';
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('invalid');
                validationMessage.textContent = 'Please enter a valid email address';
                validationMessage.style.display = 'block';
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
            if (!phoneRegex.test(value)) {
                field.classList.add('invalid');
                validationMessage.textContent = 'Please enter a valid phone number';
                validationMessage.style.display = 'block';
                return false;
            }
        }
        
        return true;
    }

    function createValidationMessage(field) {
        const validationMessage = document.createElement('div');
        validationMessage.className = 'validation-message';
        field.parentNode.appendChild(validationMessage);
        return validationMessage;
    }

    // Real-time validation
    formControls.forEach(control => {
        control.addEventListener('blur', function() {
            validateField(this);
        });
        
        control.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
            // Add visual feedback for filled fields
            if (this.value.trim()) {
                this.style.borderColor = 'var(--primary)';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }
        });

        // Prevent form zoom on iOS
        if (control.tagName === 'SELECT') {
            control.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        }
    });

    // Enhanced form submission
    projectForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formControls.forEach(control => {
            if (!validateField(control)) {
                isValid = false;
            }
        });

        if (!isValid) {
            // Scroll to first invalid field
            const firstInvalid = document.querySelector('.form-control.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                firstInvalid.focus();
            }
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            serviceText: document.querySelector(`#service option[value="${document.getElementById('service').value}"]`).textContent,
            budget: document.getElementById('budget').value,
            budgetText: document.getElementById('budget').value ? 
                document.querySelector(`#budget option[value="${document.getElementById('budget').value}"]`).textContent : 'Not specified',
            timeline: document.getElementById('timeline').value,
            timelineText: document.getElementById('timeline').value ? 
                document.querySelector(`#timeline option[value="${document.getElementById('timeline').value}"]`).textContent : 'Not specified',
            message: document.getElementById('message').value.trim()
        };

        try {
            // Format WhatsApp message
            const whatsappMessage = `New Project Inquiry%0A%0A` +
                `👤 Name: ${formData.name}%0A` +
                `📧 Email: ${formData.email}%0A` +
                `📞 Phone: ${formData.phone || 'Not provided'}%0A` +
                `🛠️ Service: ${formData.serviceText}%0A` +
                `💰 Budget: ${formData.budgetText}%0A` +
                `⏰ Timeline: ${formData.timelineText}%0A` +
                `📋 Project Details: ${formData.message || 'No additional details provided'}`;

            // Show success state
            submitBtn.style.background = 'var(--success)';
            btnLoading.textContent = 'Success! Opening WhatsApp...';
            
            // Small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Open WhatsApp
            window.open(`https://wa.me/254112268873?text=${whatsappMessage}`, '_blank');
            
            // Reset form after delay
            setTimeout(() => {
                projectForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                
                // Reset border colors
                formControls.forEach(control => {
                    control.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                });
            }, 2000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error state
            submitBtn.style.background = '#ef4444';
            btnLoading.textContent = 'Error! Try Again';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.style.background = '';
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
            }, 3000);
        }
    });

    // Enhanced mobile experience
    function enhanceMobileUX() {
        // Prevent zoom on input focus for iOS
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
            document.addEventListener('focus', function(e) {
                if (e.target.matches('input, select, textarea')) {
                    document.body.style.fontSize = '16px';
                }
            }, true);
            
            document.addEventListener('blur', function(e) {
                if (e.target.matches('input, select, textarea')) {
                    document.body.style.fontSize = '';
                }
            }, true);
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize mobile enhancements
    enhanceMobileUX();

    console.log('Booking form enhanced successfully!');
});