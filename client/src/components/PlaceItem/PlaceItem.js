import React, { Component } from 'react';
import './PlaceItem.css';
import { Link } from 'react-router-dom'

// const Timestamp = require('../timestamp')

class PlaceItem extends Component {
    render() {
        let date = new Date(this.props.place.date).toLocaleString()

        return (
            <li className="" key={this.props.place.placeId}>
                <Link className="no-underline" to={"/place/" + this.props.place._id}>
                    <div className="mb-4 place bg-grey-lighter shadow rounded px-2 py-1 sm:px-5 sm:py-4">
                        <p className="text-grey-dark font-bold text-s pb-2">{date}</p>
                        <h2 className="text-black inline-block w-3/4">{this.props.place.name}</h2>
                        <span className={this.props.place.julmust ? "flex float-right text-white rounded-full px-2 py-1 font-bold bg-red-light" : "flex float-right text-white rounded-full px-2 py-1 font-bold bg-yellow-dark"}>{this.props.place.price}kr</span>
                        <span className="block py-2 text-grey-darker font-medium">{this.props.place.city}</span>
                    </div>
                </Link>
            </li>
        )
    }
}

export default PlaceItem;