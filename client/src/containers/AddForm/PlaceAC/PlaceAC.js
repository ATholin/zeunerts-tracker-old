import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceAC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        this.setState({ address }, () => {
            this.props.onSubmit(this.state.address)
        });
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div>
                        <input
                            required
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'bg-white w-full p-4 block location-search-input shadow rounded mb-2',
                            })}
                        />
                        <div className="autocomplete-dropdown-container rounded shadow mb-2">
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active bg-white w-full p-3 block location-search-input shadow'
                                    : 'suggestion-item bg-white w-full p-3 block location-search-input shadow';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default PlaceAC;