import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

function PageSelector({ items, active, onChange }) {
  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      className='justify-content-center'
    >
      <Container className='justify-content-center'>
        
          <Nav className="">
            {items.map(item => (
              <Nav.Link className=" border border-lg" onClick={() => onChange(item)}
              style={active === item ? {backgroundColor: "#0d6efd", color: "white", cursor: "default", minWidth:"35px", textAlign: "center"} : 
              {minWidth:"35px", textAlign: "center"}}>
                {item}
              </Nav.Link>
            ))}
            
          </Nav>
      </Container>
    </BootstrapNavbar>
  );
}

export default PageSelector;
