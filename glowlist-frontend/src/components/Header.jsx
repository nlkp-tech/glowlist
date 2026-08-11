import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <link to="/" className="navbar-brand">Glowlist</link>
            <button className="btn btn-danger">Logout</button>
        </nav>
    );
}