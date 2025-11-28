'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useScrollAnimation, WEBHOOK_CONFIG, scheduleSiteVisit, useMapsDirections, type CalendlyOptions } from '@/lib/utils';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  message: Yup.string()
    .max(500, 'Message must be less than 500 characters')
});

// Initial form values
const initialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const { elementRef, fadeInUp, staggerAnimation } = useScrollAnimation();
  const { getDirectionsToVillament } = useMapsDirections();
  
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;


    // Animate section header
    fadeInUp('.contact-header');
    
    // Animate form and contact info with stagger
    staggerAnimation('.contact-form, .contact-info', { 
      from: { opacity: 0, x: -30 },
      to: { duration: 0.8, stagger: 0.2 }
    });
    
    // Animate contact items
    staggerAnimation('.contact-item', { 
      from: { opacity: 0, y: 20 },
      to: { duration: 0.6, stagger: 0.1 }
    });
  }, [fadeInUp, staggerAnimation]);

  const handleFormSubmit = async (
    values: typeof initialValues, 
    { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    if (!WEBHOOK_CONFIG.FORM_CONFIG.ENABLED || !WEBHOOK_CONFIG.WEBHOOK_URL) {
      console.log('Form submitted (no webhook configured):', values);
      alert('Thank you for your interest! We will contact you shortly.');
      resetForm();
      return;
    }

    setSubmitStatus('idle');

    try {
      const configuredUrl = WEBHOOK_CONFIG.WEBHOOK_URL;
      // If the configured URL points at Google Apps Script, route via our server proxy
      // to avoid browser CORS/preflight issues. Otherwise, use the configured URL.
      const sheetsUrl = configuredUrl && configuredUrl.includes('script.google.com')
        ? '/api/proxy-google'
        : configuredUrl;

      if (sheetsUrl) {
        const sheetsPayload = {
          fullName: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          timestamp: new Date().toISOString(),
        };

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };

        const sheetsResp = await fetch(sheetsUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(sheetsPayload),
        });

        if (sheetsResp.ok) {
          setSubmitStatus('success');
          resetForm();
        } else {
          console.error('Sheets webhook responded with status', sheetsResp.status);
          setSubmitStatus('error');
        }

        setSubmitting(false);
        return;
      }

      // If we somehow reach here without a configured sheets URL, mark error
      console.warn('No Sheets webhook configured to receive form submissions.');
      setSubmitStatus('error');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleScheduleSiteVisit = () => {
    const calendlyOptions: CalendlyOptions = {
      message: 'Site visit request from Villament website',
    };
    
    scheduleSiteVisit(calendlyOptions);
  };

  return (
    <section ref={elementRef} id="contact" className="py-12 sm:py-16 md:py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
          <div className="contact-header text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block">
            <div className="w-12 sm:w-16 h-px bg-gold mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="gold-shimmer">Touch</span>
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-px bg-gold/30 mx-auto" />
          </div>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Interested in making The Villament your home? Contact us today to schedule a site visit 
            or to learn more about our exclusive units.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form w-full">
            <div className="mx-auto w-full max-w-md sm:max-w-none bg-gray-50 p-6 md:p-8 border border-gray-100 rounded-lg h-full flex flex-col justify-between text-center sm:text-left">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4 sm:space-y-6  ml-8 sm:ml-0">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm sm:text-base"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors resize-none text-sm sm:text-base"
                      placeholder="Tell us about your requirements"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1" />
                  </div>

                  {/* Form Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        ✅ Thank you! Your inquiry has been submitted successfully. We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">
                        ❌ Sorry, there was an error submitting your inquiry. Please try again or contact us directly.
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gold text-white font-semibold tracking-wider hover:bg-gold-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    {isSubmitting ? 'SENDING...' : 'SUBMIT INQUIRY'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info w-full ml-8 sm:ml-0">
            <div className="mx-auto w-full max-w-md sm:max-w-none bg-gray-50 p-6 md:p-8 border border-gray-100 rounded-lg h-full flex flex-col justify-between text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Phone */}
                <div className="contact-item flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gold text-gold shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Phone</div>
                    <a href="tel:+919901355340" className="text-gray-600 hover:text-gold transition-colors text-sm sm:text-base">
                      +91 99013 55340
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gold text-gold shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</div>
                    <a href="mailto:support@mahalayagroup.com" className="text-gray-600 hover:text-gold transition-colors text-sm sm:text-base break-all">
                      support@mahalayagroup.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-item flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gold text-gold shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Address</div>
                    <p className="text-gray-600 text-sm sm:text-base mb-2">
                      100m off Pune-Bangalore Highway<br />
                      Dharwad, Karnataka
                    </p>
                    <button
                      type="button"
                      onClick={getDirectionsToVillament}
                      className="text-gold hover:text-gold-dark text-xs sm:text-sm font-medium transition-colors duration-300 underline decoration-1 underline-offset-2 hover:decoration-2"
                      aria-label="Get directions to The Villament"
                    >
                      Get Directions →
                    </button>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="contact-item flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gold text-gold shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Office Hours</div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Monday - Saturday: 9:00 AM - 6:00 PM<br />
                      Sunday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleScheduleSiteVisit}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-semibold tracking-wider text-sm sm:text-base"
                >
                  SCHEDULE SITE VISIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

