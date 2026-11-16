import { hasDb } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="a-login">
      {hasDb() ? (
        <LoginForm />
      ) : (
        <div className="a-notice">
          <h1>Admin is not connected yet</h1>
          <p>Add your Supabase keys to the environment variables, then reload this page. The setup guide in the project README explains each step.</p>
        </div>
      )}
    </div>
  );
}
