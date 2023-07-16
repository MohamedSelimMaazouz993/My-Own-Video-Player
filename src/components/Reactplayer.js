import React from 'react';
import ReactPlayer from 'react-player';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class ReactPlayerComponent extends React.Component {
  state = {
    playlist: [
      {
        id: 1,
        title: 'A Vava Inouva Instrumental Guitar Cover',
        url: '/videos/video1.mp4',
        duration: 0,
      },
      {
        id: 2,
        title: 'Hallmore - Dead of the Night',
        url: '/videos/video2.mp4',
        duration: 0,
      },
      {
        id: 3,
        title: '“Plastic Love” by Mariya Takeuchi ',
        url: 'https://www.youtube.com/watch?v=CsR4c4LKBVw',
      },
    ],
    currentVideoIndex: 0,
    isPlaying: false,
  };

  componentDidMount() {
    this.updateVideoDurations();
  }

  updateVideoDurations = () => {
    const { playlist } = this.state;

    const updatedPlaylist = playlist.map((video) => {
      if (video.url.startsWith('/videos/')) {
        const videoElement = document.createElement('video');
        videoElement.src = video.url;
        videoElement.addEventListener('loadedmetadata', () => {
          video.duration = videoElement.duration;
          this.forceUpdate(); // Force re-render to update the playlist
        });
      }

      return video;
    });

    this.setState({ playlist: updatedPlaylist });
  };

  playVideo = () => {
    this.setState({ isPlaying: true });
  };

  pauseVideo = () => {
    this.setState({ isPlaying: false });
  };

  selectVideo = (index) => {
    this.setState({ currentVideoIndex: index });
  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  render() {
    const { playlist, currentVideoIndex, isPlaying } = this.state;
    const currentVideo = playlist[currentVideoIndex];

    return (
      <Container>
        <h1>My React Video Player</h1>
        <Row>
          <Col md={8}>
            <div className='video-container'>
              <ReactPlayer
                className='react-player'
                url={currentVideo.url}
                playing={isPlaying}
                controls
                width='100%'
                height='100%'
              />
              <div className='controls'>
                {isPlaying ? (
                  <MdPause onClick={this.pauseVideo} />
                ) : (
                  <MdPlayArrow onClick={this.playVideo} />
                )}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className='playlist'>
              <h5>Playlist</h5>
              {playlist.map((video, index) => (
                <div
                  key={video.id}
                  className={`playlist-item ${
                    index === currentVideoIndex ? 'active' : ''
                  }`}
                  onClick={() => this.selectVideo(index)}
                >
                  <span className='playlist-title'>{video.title} </span>
                  <span className='playlist-duration'>
                    {video.duration ? this.formatTime(video.duration) : ''}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReactPlayerComponent;
