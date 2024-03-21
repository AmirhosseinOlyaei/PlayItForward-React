import styles from "./LoginPage.module.css";
import TermsAndConditions from "./TermsAndConditions";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the page where users can log in to their accounts.</p>
      <TermsAndConditions />
    </div>
  );
};

export default LoginPage;
