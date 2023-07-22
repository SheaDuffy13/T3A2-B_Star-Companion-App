import { NavLink } from "react-router-dom";

export function Header(){

    let activeNavStyle = {
        backgroundColor: "#111",
    }

    return(
        <header>
            <nav className="NavBar">
            {/* <NavLink to="/">
                <img className="" src={logo} alt="" />
            </NavLink> */}
            <ul>
                <li>
                    <NavLink to="/" style={({isActive}) => isActive ? activeNavStyle : undefined}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <h2>Star Explorer</h2>
                </li>
                <li>
                    <NavLink to="/profile" end style={({isActive}) => isActive ? activeNavStyle : undefined}>
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>

        </header>
       
    )
}