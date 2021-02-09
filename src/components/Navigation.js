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
                <NavLink className="nav-link" href="/">Dogs on things</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" href="/alphabetized">Dog breeds on things <span>by letter</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" href="/breed">Dogs on things <span>by breed</span></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" href="/subbreed">Dogs on things <span>by sub-breed</span></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
};

export default Navigation;