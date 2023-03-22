const NavDropdown = ({ submenus }) => {
    return (
        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            {submenus.map((item, index) => (
                <li key={index}>
                    <a className="dropdown-item" href={item.url}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
};

export default NavDropdown