import React, { Component } from 'react';

import './Places.css'
import Aux from '../../hoc/auxWrapper'
import PlaceItem from '../../components/PlaceItem/PlaceItem'
import axios from '../../axios-places'
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withErrorHandler/withErrorHandler'

class Places extends Component {

    state = {
        search: '',
        places: [],
        loading: false,
        error: ''
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/')
            .then(res => {
                let places = []
                for (let key in res.data) {
                    places.push(res.data[key])
                }

                this.setState({ places: places, loading: false })
            })
            .catch(error => {
                this.setState({ error, loading: false })
            })
    }

    updateSearch(event) {
        this.setState({ search: event.target.value })
    }

    render() {
        let filteredPlaces = this.state.places.filter(
            (place) => {
                return place.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        let content = (
            <ul className="mt-4 list-reset py-5">
                {
                    filteredPlaces.map(place => {
                        return (
                            <PlaceItem key={place._id} place={place} />
                        )
                    })
                }
            </ul>
        )

        if (this.state.loading) content = <div className="mt-10"><Spinner /></div>

        return (
            <Aux>
                <div className="xs:w-full md:w-3/5 mx-auto">
                    <h1 className="pl-2 inline">Platser</h1>
                    <input
                        className="float-right shadow appearance-none border rounded py-2 px-3 mr-2 text-grey-darker leading-tight"
                        type="text"
                        placeholder="Filtrera"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                    />
                    {content}
                </div>
            </Aux>
        );
    }
}

export default withError(Places, axios);
