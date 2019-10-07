import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: '',
        duration: ''
      }
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams() {
    var hashParams = {}
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((res) => {
        this.setState({
          nowPlaying: {
            name: res.item.name,
            image: res.item.album.images[0].url,
            artist: res.item.album.artists[0].name,
            device: res.device.name
          }
        })
      })
  }
  render() {
  return (
      <div className="App">
      <img class="fixed-top" style={{width: 75}} alt="Spotify" src="/original.png"/>
          <a href="http://localhost:8888">
            <button class="btn btn-outline-success">Login with Spotify</button>
          </a>
          <div>Device... {this.state.nowPlaying.device}</div>
          <div>Song: {this.state.nowPlaying.name}</div>
          <div>By: {this.state.nowPlaying.artist}</div>
          <div>
            <img alt="" src={this.state.nowPlaying.image}  style={{width: 100}}/>
          </div>
        <button class="btn btn-outline-info" onClick={() => this.getNowPlaying()}>
          Check Now Playing
        </button>
      </div>
    );
  }
}


export default App;
