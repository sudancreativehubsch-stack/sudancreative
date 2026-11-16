import { signOut } from "@/lib/actions";

export default function Pending() {
  return (
    <div className="a-login">
      <div className="a-notice">
        <h1>Waiting for access</h1>
        <p>You are signed in, but an admin has not given your account access yet. Ask an admin to set your role to Editor or Admin on the Team page.</p>
        <form action={signOut}><button className="a-btn">Sign out</button></form>
      </div>
    </div>
  );
}
