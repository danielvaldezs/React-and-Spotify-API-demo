import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import { Z_BLOCK } from 'zlib';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name:'not Checked',
        albumArt:''
      }

      }
      if(params.access_token){
spotifyWebApi.setAccessToken(params.access_token)
    }

    console.log(params);
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });console.log(response)
      })
  }

  getTopArtists(){
    spotifyWebApi.getMyTopArtists()
    .then((response) => {
   ;console.log(response.items[4])
    })
}
  

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' ><button> Login to Spotify</button> </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt="Album Art"/>
        </div>
        
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        <div>
          <button onClick={()=>this.getTopArtists()}style={{ margin:100,border:'2px solid #4CAF50' ,borderRadius:5,padding:15,display:"inline_block",position:"relative"} }>Boton para Top Artistas</button>
        </div>
      </div>
    );
  }
}

export default App;
