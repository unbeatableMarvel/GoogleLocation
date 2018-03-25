import axios from 'axios';

import React, {PropTypes} from 'react';

import AutoComplete from 'material-ui/AutoComplete';
console.log("AutoComplete",AutoComplete)

class GoogleSearchPlaces extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      dataSource: []
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  componentWillMount() {

  }
//key='AIzaSyCFX86RAQOSMbiKYS5Vb9C6QpQsUshS7WY' will be changed.It's free key for developer for few months.
  handleUpdateInput(searchText) {
    debugger;
    this.setState({
      searchText: searchText
    });

    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&key=AIzaSyCFX86RAQOSMbiKYS5Vb9C6QpQsUshS7WY`).then(
      (response) => {
        this.setState({dataSource: response.data.predictions})
      }
    );
  }

  handleNewRequest(chosenRequest, index) {
    debugger;
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${chosenRequest.place_id}&key=AIzaSyCFX86RAQOSMbiKYS5Vb9C6QpQsUshS7WY`).then(
      (response) => {
        this.setState({
          formatted_address: response.data.result.formatted_address,
          lat: response.data.result.geometry.location.lat,
          lng: response.data.result.geometry.location.lng});
      }
    );
  }
/*<AutoComplete searchText={this.state.searchText} dataSource={this.state.dataSource} dataSourceConfig={{text: 'description', value: 'place_id'}}   filter={(searchText, key) => (key.indexOf(searchText) !== -1)} onUpdateInput={this.handleUpdateInput} onNewRequest={this.handleNewRequest}/>*/
  render() {
    return(
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="Full width"
          fullWidth={true}
          prepareStyles={{margin:'10px'}}
        />
        
        <br />
        <br />
        <br />
        Selected Location<br />
        <div>
          Name: {this.state.formatted_address}<br />
          Latitude: {this.state.lat}<br />
          Longitude: {this.state.lng}
        </div>
      </div>
    );
  }
}

export default GoogleSearchPlaces;
