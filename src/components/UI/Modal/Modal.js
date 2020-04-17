import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} click={this.props.modalClosed} />
                <div
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;