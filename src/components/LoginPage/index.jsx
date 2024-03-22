import styles from "./LoginPage.module.css";
import LicenseAgreement from "./LicenseAgreement";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the page where users can log in to their accounts.</p>
      <LicenseAgreement />
    </div>
  );
};

export default LoginPage;
