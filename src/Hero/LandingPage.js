import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Swal from 'sweetalert2';

function LandingPage() {
  const getStarted = () => {
    Swal.fire({
      title: 'Welcome to Agora!',
      text: 'Are you ready to start your journey?',
      icon: 'success',
      confirmButtonText: 'Let\'s Go!',
      showCancelButton: true,
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'https://app.agora.com/signup';
      }
    });
  };

  const showDocs = () => {
    Swal.fire({
      title: 'Documentation',
      text: 'Our comprehensive documentation is coming soon. Stay tuned!',
      icon: 'info',
      confirmButtonText: 'Got it!'
    });
  };

  return (
    <div className={styles.body}>
      <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbar}`}>
        <div className="container">
          <a className={`navbar-brand ${styles.navbarBrand}`} href="#">Agora</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="#features">Features</a>
              </li>
              <li className="nav-item">
                <Link to="/login" className={`nav-link ${styles.navLink}`} >Get Started</Link>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${styles.navLink}`} href="#" onClick={showDocs}>Documentation</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className={`${styles.heroTitle} animate__animated animate__fadeInLeft`}>Connect and Collaborate with Agora</h1>
              <p className={`${styles.heroText} animate__animated animate__fadeInLeft animate__delay-1s`}>Bring your team together with our powerful group chat application. Share ideas, files, and stay connected anytime, anywhere.</p>
              <button className={`btn ${styles.btnPrimary} btn-lg animate__animated animate__fadeInUp animate__delay-2s`} onClick={getStarted}>Let's Start</button>
              <button className={`btn ${styles.btnDocs} btn-lg ms-3 animate__animated animate__fadeInUp animate__delay-2s`} onClick={showDocs}>Documentation</button>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.chatBubbles} animate__animated animate__fadeInRight`}>
                <div className={styles.chatBubble1}>Hey team, any updates on the project?</div>
                <div className={styles.chatBubble2}>Just finished the design, sharing it now!</div>
                <div className={styles.chatBubble3}>Great work everyone, let's discuss in our next meeting.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className="container">
          <h2 className="text-center mb-5 text-white">Why Choose Agora?</h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className={`${styles.featureItem} text-center`}>
                <div className={styles.featureIcon}>🚀</div>
                <h3 className={styles.featureTitle}>Lightning Fast</h3>
                <p>Experience real-time messaging with zero lag. Stay connected and productive.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className={`${styles.featureItem} text-center`}>
                <div className={styles.featureIcon}>🔒</div>
                <h3 className={styles.featureTitle}>Secure & Private</h3>
                <p>Your conversations are encrypted and protected. Your privacy is our top priority.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className={`${styles.featureItem} text-center`}>
                <div className={styles.featureIcon}>🌐</div>
                <h3 className={styles.featureTitle}>Cross-Platform</h3>
                <p>Access Agora from any device. Stay synced across desktop and mobile.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className={styles.cta}>
        <div className="container text-center">
          <h2 className="mb-4">Ready to transform your team communication?</h2>
          <p className="mb-4">Join thousands of teams already using Agora to boost their productivity.</p>
          <button className={`btn ${styles.btnPrimary} btn-lg`} onClick={getStarted}>Get Started Now</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h5>Agora</h5>
              <p>Connecting teams, one message at a time.</p>
            </div>
            <div className="col-lg-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className={styles.footerLink}>Home</a></li>
                <li><a href="#features" className={styles.footerLink}>Features</a></li>
                <li><a href="#" className={styles.footerLink} onClick={showDocs}>Documentation</a></li>
                <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5>Contact Us</h5>
              <p>Email: support@agora.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <p>&copy; 2024 Agora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default LandingPage;