import React, { Component } from "react";

import "./Places.css";
import Aux from "../../hoc/auxWrapper";
import PlaceItem from "../../components/PlaceItem/PlaceItem";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import { tryGeolocation, userlocation } from "../../util/geolocate";

class Places extends Component {
  state = {
    places: [],
    loading: false,
    sort: "distance",
    location: {},
    gpsAllow: false,
    error: ""
  };

  componentDidMount() {
    this.setState({ loading: true });

    tryGeolocation();
    this.setState({ location: userlocation });

    axios
      .get("/")
      .then(res => {
        let places = [];
        for (let key in res.data) {
          places.push(res.data[key]);
        }

        this.setState({ places: places, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  updateSort(event) {
    this.setState({ sort: event.target.value });
  }

  sortPlaces(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  render() {
    if (this.state.sort === "distance" || this.state.sort === "-distance") {
      this.state.places.forEach(place => {
        let distance = this.getDistanceFromLatLonInKm(
          this.state.location.latitude,
          this.state.location.longitude,
          place.location[0],
          place.location[1]
        );
        place.distance = distance;
      });
    }

    this.state.places.sort(this.sortPlaces(this.state.sort));

    let content = (
      <ul className="mt-4 list-reset py-5">
        {this.state.places.map(place => {
          return (
            <PlaceItem
              key={place._id}
              distance={Math.round(place.distance * 10) / 10}
              place={place}
            />
          );
        })}
      </ul>
    );

    if (this.state.loading)
      content = (
        <div className="mt-10">
          <Spinner />
        </div>
      );

    return (
      <Aux>
        <div className="xs:w-full md:w-3/5 mx-auto">
          <div>
            <h1 className="pl-2 inline">Platser</h1>
            <div className="float-right">
              <span className="text-grey-darker mr-4">Sortera efter: </span>
              <select
                className="shadow appearance-none border rounded py-2 px-3 mr-2 text-grey-darker leading-tight"
                type="select"
                value={this.state.search}
                onChange={this.updateSort.bind(this)}
              >
                {this.state.location.latitude &&
                this.state.location.longitude ? (
                  <option value="distance">Plats (närmast)</option>
                ) : null}
                {this.state.location.latitude &&
                this.state.location.longitude ? (
                  <option value="-distance">Plats (längst bort)</option>
                ) : null}
                <option value="price">Pris (billigast)</option>
                <option value="-price">Pris (dyrast)</option>
                <option value="city">Stad (a-ö)</option>
                <option value="-city">Stad (ö-a)</option>
              </select>
              {!this.state.gpsAllow ? (
                <button
                  onClick={this.getLocation}
                  className="shadow appearance-none border rounded py-2 px-3 mr-2 text-grey-darker leading-tight"
                >
                  GPS
                </button>
              ) : null}
            </div>
          </div>
          {content}
        </div>
      </Aux>
    );
  }
}

export default withError(Places, axios);
