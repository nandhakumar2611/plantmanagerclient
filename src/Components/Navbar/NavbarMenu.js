import NavDropdown from "./NavDropdown";

const NavbarMenu = ({items}) => {
  return (
    <>
    {items.submenu ? (
        <>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {items.title}{''}
                </a>
                <NavDropdown submenus={items.submenu}></NavDropdown>
            </li>
        </>
    ):(
        <>
            <li className="nav-item" >
                <a className="nav-link" href={items.url}>{items.title}</a>
            </li>
        </>
    )
    }
    </>
  );
};

export default NavbarMenu