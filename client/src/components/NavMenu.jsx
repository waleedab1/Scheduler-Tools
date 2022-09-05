import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';

import './NavMenu.css';

function NavMenu() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className='nav-menu-header'>
                        <Navbar.Brand href="/">Scheduler Tools</Navbar.Brand>
                        <FaTools className='nav-menu-header-icon' color='white' />
                    </div>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/create-schedule'>Create</Nav.Link>
                        <Nav.Link as={Link} to='/export-schedule'>Export</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavMenu;