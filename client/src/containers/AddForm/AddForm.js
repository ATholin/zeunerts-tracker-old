import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./AddForm.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import PlaceAC from "./PlaceAC/PlaceAC";
import axios from "axios";

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      price: "",
      julmust: true,
      error: "",
      loading: false,
      success: false
    };

    this.submitPlaceHandler = this.submitPlaceHandler.bind(this);
  }

  onPriceChanged = event => {
    this.setState({
      price: event.target.value.replace(/[^0-9]/, "")
    });
  };

  onJulmustChanged = event => {
    const julmust = event.target.value === "Julmust";
    this.setState({
      julmust: julmust
    });
  };

  onSubmitHandler = address => {
    this.setState({
      address: address
    });
  };

  submitPlaceHandler = event => {
    event.preventDefault();

    this.setState({
      loading: true,
      error: ""
    });

    const payload = {
      address: this.state.address,
      price: this.state.price,
      julmust: this.state.julmust
    };

    axios
      .post("/api/places", payload)
      .then(res => {
        if (res.data && res.status === 200) {
          this.setState({
            success: true,
            loading: false
          });
          setTimeout(() => {
            window.location = "/";
          }, 2000);
        }
      })
      .catch(err => {
        this.setState({
          error: err.response.data.error,
          loading: false
        });
      });
  };

  render() {
    let content = (
      <form>
        <PlaceAC onSubmit={this.onSubmitHandler} />
        <div className="flex items-stretch justify-around flex-wrap">
          <input
            required
            onChange={this.onPriceChanged.bind(this)}
            type="text"
            placeholder="Pris"
            className="flex-grow w-3/5 bg-white p-4 mb-2 location-search-input shadow rounded"
          />
          <select
            required
            onChange={this.onJulmustChanged.bind(this)}
            className="w-full sm:w-auto bg-white sm:ml-3 p-4 mb-2 location-search-input shadow rounded"
          >
            <option value="julmust">Julmust</option>
            <option value="påskmust">Påskmust</option>
          </select>
        </div>
        <button
          onClick={this.submitPlaceHandler}
          className="add-button bg-blue text-white font-bold py-3 px-5 rounded shadow m-0 mt-2 w-full sm:w-auto sm:float-right shadow-md"
        >
          Lägg till plats
        </button>
      </form>
    );

    if (this.state.loading) {
      content = <Spinner />;
    }

    if (this.state.success) {
      content = (
        <div className="flex justify-center items-center p-5 bg-green-lightest rounded">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check text-green mr-2"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <h4>Tack för ditt bidrag! Du omdirigeras nu till startsidan.</h4>
        </div>
      );
    }

    let error;
    if (this.state.error) {
      error = (
        <div
          className="mt-4 shadow bg-red-lightest border border-red-lighter text-red-dark px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{this.state.error}</strong>
        </div>
      );
    }

    return (
      <div className="mx-auto md:w-3/5 form-wrapper">
        <h1 className="ml-4">Lägg till plats</h1>
        <div
          className={
            (this.state.loading
              ? "w-1/3 h-1/3 mx-auto"
              : "xs:w-full md:w-full flex flex-col") +
            " sm:shadow-md justify-center rounded p-4 mt-5 sm:bg-grey-lightest addformcontainer"
          }
        >
          {content}
        </div>
        {error}
      </div>
    );
  }
}

export default withRouter(AddForm);
