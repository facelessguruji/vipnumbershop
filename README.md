# VIP Numbers Booking Website - Complete

## 📁 File Structure (14 files)

### User Portal (8 pages + 2 auth)
1. `index.html` - Main homepage with hero section
2. `user/dashboard.html` - User dashboard with quick actions
3. `user/browse.html` - Browse VIP numbers with filters
4. `user/my-bookings.html` - My bookings with renewal URLs
5. `user/profile.html` - Profile and security settings
6. `user/login.html` - User authentication page
7. `user/register.html` - User registration page
8. `user/book-number.html` - Book number form with QR payment

### Admin Panel (6 pages + 2 auth)
1. `admin/dashboard.html` - Admin dashboard with statistics
2. `admin/users.html` - User management table
3. `admin/bookings.html` - Booking management table
4. `admin/settings.html` - System settings + QR Code/UPI upload
5. `admin/login.html` - **Admin login** (auth required)
6. `admin/register.html` - **Admin registration** (auth required)

### Assets
- `css/style.css` - Comprehensive responsive stylesheet

## 🔐 Authentication System

### User Authentication
- `/user/login.html` - User login form
- `/user/register.html` - User registration form
- Accessible to all visitors

### Admin Authentication
- `/admin/login.html` - **Admin login** (gated access)
- `/admin/register.html` - **Admin registration** (new admin accounts)
- Admin section requires valid credentials

## 🎨 Design Features

- **Top bar** on all 14 pages with currency symbols: 🇧🇩 BDT, 🇮🇳 ₹, 💳 UPI
- **Fixed navigation** header that stays visible on scroll
- **Responsive grid layouts** - works on mobile, tablet, and desktop
- **Card-based designs** for numbers, features, and stats
- **Table styles** for bookings and user management
- **Flash messages** for success/error notifications
- **Hover effects** throughout the site
- **Smooth animations** and interactive elements
- **QR Code upload** functionality in admin settings

## 💳 Payment & QR Integration

- **Admin settings**: QR Code upload (PNG, JPG, SVG formats)
- **User booking**: Payment method selection (UPI/QR Code, Net Banking, Card, Wallet)
- **QR code preview** displays after upload
- **Demo payment QR code** generated via api.qrserver.com
- **UPI ID display** format: `vipnumbers@upi`
- Ready for actual payment gateway integration (Razorpay, Stripe, etc.)

## 🔗 Navigation Structure

### User Nav (on all user pages)
- Home → Dashboard → Browse → My Bookings → Profile → Login/Register

### Admin Nav (on all admin pages)
- Dashboard → Users → Bookings → Settings → Login/Register

All URLs use relative paths that work perfectly with GitHub Pages hosting.

## 🚀 Deployment

1. Push all files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Site will be live at `https://yourusername.github.io/`
4. Admin area accessible at `https://yourusername.github.io/admin/`

## 🔜 Features to Add Later

- Actual payment gateway integration (Razorpay/Stripe)
- Full affiliate system with referral codes and commissions
- Additional 100+ number detail pages
- Backend database integration for user accounts and bookings
- Real-time QR code payment verification