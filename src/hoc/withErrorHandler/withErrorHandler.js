import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error});
                console.log("[withErrorHandler] " + error + " state.error=" + this.state.error);
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.repsonse.eject(this.resInterceptor);
        }

        shouldComponentUpdate(nextProps, nextState) {
            console.log("[withErrorHandler] shouldcomponentupdate state.error=" + this.state.error);
            return true;
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            console.log("[withErrorHandler] state.error=" + this.state.error);
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;