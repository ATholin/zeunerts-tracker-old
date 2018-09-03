import React, { Component } from "react";

import "./Place.css";
import axios from "../../axios-places";
import withError from "../../hoc/withErrorHandler/withErrorHandler";

class Place extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {},
      location: {},
      history: [],
      formatted_address: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get("/" + id).then(res => {
      if (!res.data) {
        window.location = "/";
      }
      let history = [];
      for (let key in res.data.history) {
        history.push(res.data.history[key]);
      }
      this.setState({ place: res.data, history: history }, () => {
        let service = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );

        const request = {
          placeId: id
        };

        service.getDetails(request, place => {
          this.setState(
            {
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              }
            },
            () => {
              let latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              };
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
            }
          );
        });
      });
    }).catch = () => {
      this.props.match.history.push(`/${this.state.place._id}`);
    };
  }

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
        latlng.lat +
        "," +
        latlng.lng;
      let uri = encodeURI(url);
      window.open(uri, "_blank");
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

    return (
      <div className="px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <div className="mb-4 place bg-grey-lighter shadow rounded p-3">
              <p className="text-grey-dark font-bold pb-2">{date}</p>
              <h2 className="text-black inline-block">
                {this.state.place.name}
              </h2>
              <span
                className={
                  this.state.place.julmust
                    ? "flex float-right text-white rounded-full px-2 py-1 font-bold bg-red-light"
                    : "flex float-right text-white rounded-full px-2 py-1 font-bold bg-yellow-dark"
                }
              >
                {this.state.place.price}
                kr
              </span>
              <span className="block py-2 text-grey-darker font-medium">
                {this.state.place.address}
              </span>
              <div className="hr-fade mt-4" />
              <div id="map" className="map my-4" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-4 px-4">
            <h1>Historik</h1>
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
          </div>
        </div>
      </div>
    );
  }
}

export default withError(Place, axios);
