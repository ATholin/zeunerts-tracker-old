import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import Aux from '../auxWrapper'
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Navigation/Footer/Footer'

class Layout extends Component {
    render() {
        const showFab=window.location.pathname === '/'
        return (
            <Aux>
                <Navbar />
                <main className="container mx-auto">
                    {this.props.children}
                </main>
                {
                    showFab


                        ? (
                            < Link className="no-underline m-10 fixed pin-r pin-b z-50" to="/add">
                                <div className='fab'> <Button className='fab hover:shadow-lg' variant='fab'>+</Button>
                                </div>
                            </Link>)
                        : null
                }
                <Footer />
            </Aux >
        );
    }
}

export default Layout;