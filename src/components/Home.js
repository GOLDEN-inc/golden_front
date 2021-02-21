import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../firebase/config";

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <h1>Home</h1>
            {currentUser ? (
                <div>
                    <p>
                        You are logged -{" "}
                        <Link to="/dashboard">View Dashboard</Link>
                    </p>
                    <button onClick={() => firebaseConfig.auth().signOut()}>
                        Sign out
                    </button>
                </div>
            ) : (
                <p>
                    <Link to="/login">Log In</Link> or{" "}
                    <Link to="/signup">Sign Up</Link>
                </p>
            )}
        </>
    );
};

export default Home;
