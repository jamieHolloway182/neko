import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={styleSheet.container}
    >
      <Container style={{ margin:'0px 0px 0px 5%' }}>
        <BootstrapNavbar.Brand>
          <Nav.Link as={Link} to='/' style={{ fontSize: '1.5rem' }}>
            NEKO
          </Nav.Link>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ fontSize: '1.2rem' }}>
            <NavDropdown
              title="Calendar"
              id="calendar-nav-dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/calendar">
                Upcoming
              </NavDropdown.Item>

              <NavDropdown.Item as={Link} to="/calendar/previous">
                Previous
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={Link} to="/clients">
              Clients
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

const styleSheet = {
  container: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    padding: '0.5rem 1rem', // increases vertical size
  },
};

export default Navbar;
