import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../auxWrapper";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor(props) {
      super(props);

      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            <div role="alert">
              <div className="bg-red text-white font-bold rounded-t px-4 py-2">
                Något gick fel!
              </div>
              <div className="border border-t-0 border-red-light rounded-b bg-red-lightest px-4 py-3 text-red-dark">
                <p>Försök igen senare.</p>
              </div>
            </div>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
