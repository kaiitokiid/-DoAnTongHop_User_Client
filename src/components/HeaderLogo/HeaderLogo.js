import { Link } from 'react-router-dom';
import "./HeaderLogo.css";


function HeaderLogo() {

    return (
        <header className="headerLogo">
            <Link to="/">
                <img src={require(`../../assets/ToMe-white.png`).default} alt="logo" />
            </Link>
        </header>
    );
}

export default HeaderLogo;