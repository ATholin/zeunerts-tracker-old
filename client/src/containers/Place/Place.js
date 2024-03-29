import React, { Component } from "react";

import "./Place.css";
import axios from "axios";
// import withError from "../../hoc/withErrorHandler/withErrorHandler";
import PlaceItem from "../../components/PlaceItem/PlaceItem";
import Spinner from "../../components/UI/Spinner/Spinner";

class Place extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
      location: {},
      history: [],
      formatted_address: "",
      nearby: [],
      error: "",
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { id } = this.props.match.params;

    this.getLocation(id);
  }

  componentDidUpdate(prevProps) {
    // respond to parameter change in scenario 3
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId) {
      this.setState({ loading: true });
      this.getLocation(newId);
    }
  }

  getLocation = id => {
    axios
      .get("/api/places/" + id)
      .then(res => {
        if (!res.data) {
          window.location = "/";
        }
        let history = [];
        for (let key in res.data.history) {
          history.push(res.data.history[key]);
        }
        this.setState({ place: res.data, history: history }, () => {
          this.getNearbyLocations();

          let latlng = new window.google.maps.LatLng(
            parseFloat(this.state.place.location[0]),
            parseFloat(this.state.place.location[1])
          );

          this.map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              zoom: 13,
              center: latlng,
              disableDefaultUI: true
            }
          );

          new window.google.maps.Marker({
            position: latlng,
            animation: window.google.maps.Animation.DROP,
            map: this.map
          });

          let dirdiv = document.createElement("div");
          this.DirectionControl(dirdiv, latlng);

          dirdiv.index = 1;
          this.map.controls[window.google.maps.ControlPosition.BOTTOM].push(
            dirdiv
          );
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: err.response.data });
        this.props.match.history.push(`/${this.state.place._id}`);
      });
  };

  DirectionControl = (dirdiv, latlng) => {
    let controlUI = document.createElement("div");
    controlUI.style.background = "linear-gradient(60deg,#48c1ff, #2f7afd)";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "20%";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    dirdiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement("div");
    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.color = "white";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "24px";
    controlText.style.paddingRight = "24px";
    controlText.innerHTML = "Vägbeskrivning";
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener("click", () => {
      let url =
        "https://www.google.com/maps/dir/?api=1&&destination=" +
        this.state.place.name +
        ",+" +
        this.state.place.city;
      let uri = encodeURI(url);
      window.open(uri, "_blank");
    });
  };

  getNearbyLocations = () => {
    this.setState({ nearby: [] });
    axios
      .post("/api/near", { _id: this.state.place._id, radius: 100 })
      .then(res => {
        if (res.data && res.status === 200) {
          this.setState({ nearby: Object.values(res.data), loading: false });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  render() {
    let date = new Date(this.state.place.date).toLocaleString();

    let nohistory = "";
    if (this.state.history.length <= 1)
      nohistory = (
        <h4 className="py-2 nohistory text-center">
          Denna plats har tyvärr ingen historik
        </h4>
      );

    let loading;
    let nearby;
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

    if (this.state.loading) {
      loading = (
        <div className="my-5">
          <Spinner />
        </div>
      );
    }

    if (this.state.nearby) {
      nearby = (
        <div>
          <h2 className="mt-10">Platser i närheten</h2>
          <div className="flex flex-wrap items-center justify-center my-4">
            {this.state.nearby.map(place => {
              return (
                <PlaceItem
                  key={place._id}
                  distance={Math.round(place.distance * 10) / 10}
                  place={place}
                />
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="px-4">
        {error}
        {loading}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <PlaceItem
              key={this.state.place._id}
              distance={Math.round(this.state.place.distance * 10) / 10}
              place={this.state.place}
            >
              <div className="hr-fade mt-4" />
              <div id="map" className="map my-4" />
            </PlaceItem>
          </div>
          <div className="w-full lg:w-1/2 mt-4 px-4">
            <h2>Historik</h2>
            <div className="flex flex-wrap items-center justify-center my-4 place bg-grey-lighter shadow rounded p-3">
              <p className="text-grey-darker">
                Senast ändrad: <strong>{date}</strong>
              </p>
              <div className="mt-4 hr-fade h-px w-full" />
              <div className="w-full mt-4">
                {nohistory}
                {this.state.history.map(hist => {
                  if (this.state.place.date !== hist.date) {
                    let histdate = new Date(hist.date).toLocaleString();
                    return (
                      <div
                        key={histdate}
                        className="flex justify-between shadow rounded my-2 bg-white p-4 font-bold"
                      >
                        <span className="text-grey-darker">{histdate}</span>
                        <span
                          className={
                            hist.julmust
                              ? "flex float-right text-white rounded-full px-2 py-1 font-bold bg-red-light"
                              : "flex float-right text-white rounded-full px-2 py-1 font-bold bg-yellow-dark"
                          }
                        >
                          {hist.price}
                          kr
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {nearby}
            {loading}
          </div>
        </div>
      </div>
    );
  }
}

// export default withError(Place, axios);
export default Place;
