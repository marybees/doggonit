import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Navigation = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/" className="mr-auto">Doggonit</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/home">Random Dogs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Alphabetically Ordered Dogs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Dog Breed Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">Dog Sub-Breed Search</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
};

export default Navigation;