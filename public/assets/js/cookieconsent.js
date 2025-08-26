
class CookieConsent {
    constructor() {
        this.cookieName = 'cookie-consent';
        this.banner = document.getElementById('cookie-consent');
        this.acceptBtn = document.getElementById('accept-cookies');
        this.rejectBtn = document.getElementById('reject-cookies');
        this.init();
    }
    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        }
        this.acceptBtn.addEventListener('click', () => this.acceptCookies());
        this.rejectBtn.addEventListener('click', () => this.rejectCookies());
    }
    showBanner() {
        this.banner.style.display = 'block';
        setTimeout(() => {
            this.banner.style.opacity = '1';
            this.banner.style.transform = 'translateY(0)';
        }, 100);
    }
    hideBanner() {
        this.banner.style.opacity = '0';
        this.banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            this.banner.style.display = 'none';
        }, 300);
    }
    acceptCookies() {
        this.setCookie('accepted', 365);
        this.hideBanner();
        this.enableTrackingCookies();
    }
    rejectCookies() {
        this.setCookie('rejected', 365);
        this.hideBanner();
        this.disableTrackingCookies();
    }
    setCookie(value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${this.cookieName}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
    getCookie() {
        const name = this.cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    hasConsent() {
        const consent = this.getCookie();
        return consent === 'accepted' || consent === 'rejected';
    }
    isAccepted() {
        return this.getCookie() === 'accepted';
    }
    enableTrackingCookies() {
        console.log('Tracking cookies enabled');
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }
    disableTrackingCookies() {
        console.log('Tracking cookies disabled');
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('cookie-consent');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(100%)';
        banner.style.transition = 'all 0.3s ease';
        new CookieConsent();
    }
});
window.CookieConsent = CookieConsent;
