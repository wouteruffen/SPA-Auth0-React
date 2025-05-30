
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import Header from "./components/Header"; // <-- importeer je Header
import { useAuth0 } from "@auth0/auth0-react";
import FirebaseData from "./components/FirebaseData";

function App() {
  const { isLoading, error } = useAuth0();

  return (
    <>
      <Header />

      <main className="column">


        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}

        {!error && !isLoading && (
          <>
            <LoginButton />
            {/* <LogoutButton /> */}
            <Profile />
            <main className="column">
             <FirebaseData />
            </main>
          </>
        )}
      </main>
    </>
  );
}


export default App;


