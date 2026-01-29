const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>

      <h2>Information We Collect</h2>
      <p>
        We collect only the information necessary to provide and secure the application.
        Depending on your authentication method, this may include:
      </p>
      <ul>
        <li>Username</li>
        <li>Encrypted password (stored using bcrypt)</li>
        <li>Google account basic profile information (when signing in with Google)</li>
      </ul>
      <p>We do not store plain-text passwords or other sensitive personal data.</p>

      <h2>How We Use Your Information</h2>
      <p>Your information is used solely for:</p>
      <ul>
        <li>User authentication and account management</li>
        <li>Providing access to application features</li>
        <li>Maintaining security and preventing unauthorized access</li>
      </ul>

      <h2>Data Storage & Security</h2>
      <p>
        All user data is stored securely. Passwords are encrypted, and access to user data is
        restricted to authenticated requests only.
      </p>

      <h2>Account Deletion</h2>
      <p>
        Users may delete their account and all associated data at any time through the application interface.
        Once an account is deleted, the action is irreversible.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell, rent, or share personal data with third parties.
        Authentication via Google is handled according to Google OAuth policies.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions regarding this Privacy Policy or data handling, you can contact us at:
        <br />
        <strong>📧 lidor.atedagi@gmail.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
