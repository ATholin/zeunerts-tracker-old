import React, { Component } from "react";
import "./PlaceItem.css";
import { Link } from "react-router-dom";

// const Timestamp = require('../timestamp')

class PlaceItem extends Component {
  render() {
    let date = new Date(this.props.place.date).toLocaleString();

    let distance = (
      <span className="block py-2 text-grey-darker font-medium">
        {this.props.distance < 100
          ? this.props.distance
          : Math.round(this.props.distance)}{" "}
        km bort
      </span>
    );

    if (isNaN(this.props.distance)) {
      distance = null;
    }

    return (
      <Link
        className="no-underline w-full"
        to={"/place/" + this.props.place._id}
      >
        <div className="mb-4 place bg-grey-lighter shadow rounded px-2 py-1 sm:px-5 sm:py-4">
          <p className="text-grey-dark font-bold text-s pb-2">{date}</p>
          <h2 className="text-black inline-block w-3/4">
            {this.props.place.name}
          </h2>
          <span
            className={
              this.props.place.julmust
                ? "flex float-right text-white rounded-full px-2 py-1 font-bold bg-red-light"
                : "flex float-right text-white rounded-full px-2 py-1 font-bold bg-yellow-dark"
            }
          >
            {this.props.place.price}
            kr
          </span>
          <div className="flex justify-between">
            <span className="block py-2 text-grey-darker font-medium">
              {this.props.place.address}
            </span>
            {distance}
          </div>
          {this.props.children}
        </div>
      </Link>
    );
  }
}

export default PlaceItem;
