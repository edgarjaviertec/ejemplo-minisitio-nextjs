import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
export default function MenuPrincipal() {
    const router = useRouter();
    const actual = router.pathname;
    const [visible, setVisible] = useState(false);
    const alternarMenu = () => {
        setVisible(!visible);
    }
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/" legacyBehavior>
                    <a className="navbar-brand">Expand at lg</a>
                </Link>
                <button className="navbar-toggler"
                        type="button" onClick={alternarMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${visible ? "show" : ""}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/" legacyBehavior>
                                <a className={`nav-link ${actual === "/" ? "active" : ""}`}>Inicio</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contacto" legacyBehavior>
                                <a className={`nav-link ${actual === "/contacto" ? "active" : ""}`}>Contacto</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}