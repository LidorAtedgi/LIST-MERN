const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>

      <p>
        This application collects minimal user information such as name, email,
        and encrypted password for authentication purposes only.
      </p>

      <p>
        Passwords are encrypted using bcrypt and are never stored in plain text.
      </p>

      <p>
        User data is not sold, shared, or transferred to any third party.
      </p>

      <p>
        Users may request deletion of their data at any time.
      </p>

      <p>
        This project is for educational and personal use.
      </p>
    </div>
  );
};

export default PrivacyPolicy;

