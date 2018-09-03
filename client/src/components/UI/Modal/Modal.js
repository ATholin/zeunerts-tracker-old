import React, { Component } from 'react';
import './Modal.css'
import Aux from '../../../hoc/auxWrapper'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className="z-900 pointer-events-none justify-center flex w-full fixed pin-l"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div
                        className="Modal z-900 container bg-white p-8 rounded shadow-lg">
                        {this.props.children}
                    </div>
                </div >
            </Aux >
        )
    }
}

export default Modal;

