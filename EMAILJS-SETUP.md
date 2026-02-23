# EmailJS Setup Instructions

Your contact forms are now integrated with EmailJS for reliable email delivery. Follow these steps to complete the setup:

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the instructions to connect your email account
4. **Copy your Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Templates

### Template 1: Contact Form

1. Go to "Email Templates" and click "Create New Template"
2. Name it: `Contact Form Submission`
3. Set the template content:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Interested In: {{service}}

Message:
{{message}}

--------------------
Submitted: {{submission_date}}
```

4. **Copy your Template ID** (e.g., `template_xyz789`)

### Template 2: Tour Customization

1. Create another template
2. Name it: `Tour Customization Request`
3. Set the template content:

```
Subject: Tour Customization Request from {{from_name}}

CONTACT INFORMATION:
--------------------
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Country: {{country}}

TOUR PREFERENCES:
-----------------
Destination: {{destination}}
Experience Type: {{experience}}
Number of Guests: {{guests}} (Adults: {{adults}}, Children: {{children}}, Infants: {{infants}})
Tour Class: {{tour_class}}
Travel Dates: {{dates}}
Duration: {{duration}} Days
Budget: {{budget}}

SPECIAL REQUESTS:
-----------------
{{special_requests}}

--------------------
Submitted: {{submission_date}}
```

4. **Copy your Template ID** (e.g., `template_abc456`)

## Step 4: Get Your Public Key

1. In EmailJS dashboard, go to "Account" → "General"
2. Find your **Public Key** (it starts with a letter and contains numbers/letters)
3. Copy this key

## Step 5: Update Your Website

Open `script.js` and replace the placeholder values:

1. **Line 1-6**: Replace `'YOUR_PUBLIC_KEY'` with your actual public key
   ```javascript
   emailjs.init('YOUR_ACTUAL_PUBLIC_KEY_HERE');
   ```

2. **Line 155**: Replace `'YOUR_SERVICE_ID'` and `'YOUR_TEMPLATE_ID'` with your IDs
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_FOR_TOUR', templateParams)
   ```

3. **Line 358**: Replace `'YOUR_SERVICE_ID'` and `'YOUR_CONTACT_TEMPLATE_ID'` with your IDs
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID_FOR_CONTACT', templateParams)
   ```

## Step 6: Test Your Forms

1. Open your website
2. Fill out the contact form and submit
3. Check your email to confirm you received the message
4. Test the "Customize Your Tour" form as well

## Fallback Option

If EmailJS is not configured, the forms will automatically fall back to opening the user's email client with a pre-filled message. This ensures your forms always work!

## Troubleshooting

### Forms not sending?
- Check browser console (F12) for error messages
- Verify all IDs are correctly entered in `script.js`
- Make sure your EmailJS service is active
- Check your EmailJS account quota (free tier has monthly limits)

### Not receiving emails?
- Check your spam folder
- Verify the email address in templates is correct
- Test with EmailJS dashboard's "Send Test Email" feature

## EmailJS Free Tier Limits

- 200 emails per month
- 2 email services
- 2 email templates
- Community support

If you need more, consider upgrading to a paid plan.

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/docs/faq/

---

**Quick Reference:**
- Public Key Location: EmailJS Dashboard → Account → General
- Service ID Location: EmailJS Dashboard → Email Services
- Template ID Location: EmailJS Dashboard → Email Templates

**Configuration Status:**
- ✅ EmailJS SDK added to website
- ✅ Contact form updated
- ✅ Customize tour form updated
- ⏳ Need to add your EmailJS credentials
