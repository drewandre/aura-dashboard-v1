import React from 'react';
import PaletteTiles from '../components/PaletteTiles';
import CurrentPaletteDisplay from '../components/CurrentPaletteDisplay';

class PaletteContainer extends React.Component {

  showSettings(event) {
    event.preventDefault();
  }

  constructor(props) {
    super(props)
    this.state = {
      color_palettes: [null, null, null, null, null, null, null, null],
      current_palette_number: null,
      current_palette: [null],
      currentUser: []
    }
    this.loadUserData = this.loadUserData.bind(this);
    this.loadUserPalettes = this.loadUserPalettes.bind(this);
  }

  loadUserData() {
    fetch('/api/v1/users.json', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        currentUser: body.current_user
      })
    })
  }

  loadUserPalettes() {
    fetch(`/api/v1/users/${this.state.currentUser.handle}/palettes`)
    .then(response => response.json())
    .then(body => {
      const palettes = this.state.color_palettes;
      for(var i = 0; i < this.state.color_palettes.length; i++) {
        palettes[i] = body[i]
      }
      this.setState({ color_palettes: palettes })
    })
    // fetch(`/api/v1/users/${this.state.currentUser.handle}/products`)
    // .then(response => response.json())
    // .then(body => {
    //   this.setState({ current_palette_number: body.active_color_palette })
    // })

    // fetch(`/api/v1/palettes/${this.state.current_palette_number}`)
    // fetch(`/api/v1/palettes/120`)
    // .then(response => response.json())
    // .then(body => {
    //   this.setState({ current_palette: body })
    // })
  }


  componentDidMount() {
    this.loadUserData();
    this.loadUserPalettes();
  }

  render() {
    return(
      <div className={this.props.className} >
        <div>
          <i className="fa fa-paint-brush fa-2x" id="box-icon" aria-hidden="true"></i>
          <div className='container-title'>Palettes</div>
        </div>

        <PaletteTiles
          className='palette-list'
          data={this.state.color_palettes}
        />

        {/* <PaletteTiles
          className='current-palette'
          data={this.state.current_palette}
        /> */}

        <div className='container-settings'>
          <i className="fa fa-search fa-2x" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default PaletteContainer;
