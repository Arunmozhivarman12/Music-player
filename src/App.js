
import './App.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import image1 from './images/workout.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { play } from './data/songs';
import { useEffect, useState } from "react";
import axios from 'axios';
import { BiDumbbell } from "react-icons/bi";




function App() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      open spotify
    </Tooltip>
  );

  const CLIENT_ID = "caf8c16239d94e7e82d656ad1f181818"
  const REDIRECT_URI = "http://localhost:3000/callback"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")

  const [songs, setSongs] = useState([]);
  const [track, setTrack] = useState(false)

 

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async () => {

    await axios.get('https://api.spotify.com/v1/playlists/6Mp7CE4Dq4Or26YqXPumMP/tracks?limit=41', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      setSongs(response.data.items)
    }).catch((error) =>
      console.log(error.response.data)
    )
    setTrack(true);
    setTimeout(function () {
     window.scrollTo(0,500);
    }, 50)
  


  }




  
  const audio = useSelector(state => state.song);
 


  const dispatch = useDispatch();
  return (
    <div>
      {!token ? (
        <Container className='loginpage '>
          <Row className='justify-content-center loginbox'>
            <Col className='bg-dark text-center p-5' lg='4'>
              <p className='text-light'>Login to continue</p>
              <Button className='logoutbtn'><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} className='fs-6 '>
                Login</a></Button>
            </Col></Row>
        </Container>) : (<><Container fluid className='back'>
          <Container fluid className='bg-transparent naav '>
            <Row>
              <Col>
               <BiDumbbell className='fs-1'/>
              </Col>
              <Col className='ss'>
              
                <Navbar bg="transparent" expand={false} className="" variant='dark'>
                  <Container fluid>

                    <Navbar.Toggle className='toggle' aria-controls={`offcanvasNavbar-expand-false`} />
                    <Navbar.Offcanvas
                      id={`offcanvasNavbar-expand-false`}
                      aria-labelledby={`offcanvasNavbarLabel-expand-false`}
                      placement="end"
                      className='offsetb text-white'

                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                         <h3 className='main d-inline'>GYM PLAYLIST</h3>
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        
                        </Nav>

                      </Offcanvas.Body>
                    </Navbar.Offcanvas>
                  </Container>
                </Navbar>
              </Col>
            </Row>
          </Container>
          <Container className='inner '>
            <Row className=' mt-5 align-items-center cntr '>
              <Col lg='6' md='12' sm='12' className=' '>
                <img className='img ' src={image1} alt='image1'></img>
              </Col>
              <Col lg='6' md='12' sm='12' className='col2 pt-4'>
                <div >
                  <p className='main fs-1'>GYM PLAYLIST</p>
                  <Button className='me-3 b1' onClick={searchArtists}>LISTEN NOW</Button><Button className='b2' onClick={logout}>LOGOUT</Button>
                 {track?(<></>):( <p className='fs-5 mt-4'>Click listen now to view!</p>)}</div>
              </Col>
            </Row>
          </Container>
        </Container>
          <Container fluid className='songc ps-0 pe-0'>
            <Container className=' hello pt-5'>
              <Row className=' spotrow'>
                <p className='fs-1'>STREAM IT ON
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                    variant='outline-light'
                  >

                    <Link to={'https://open.spotify.com/playlist/6Mp7CE4Dq4Or26YqXPumMP?si=17c37f22aa3c46aa'}> <Button className='bg-transparent bt5' variant='outline-transparent'>
                      <box-icon type='logo' color='#79ed71' name='spotify' size='50px'></box-icon>
                    </Button></Link>
                  </OverlayTrigger>
                </p>
                {track ?
                (<> <p className='mt-5 fs-1'>TRACK LIST</p>{songs.map(song => (
              <Row key={song.track.id} className='mb-4 mt-4'>
                <Col lg='2' md='2' sm='12' xs='12' className=''>
                  <img className=' d-block ms-auto me-auto  w-50' src={song.track.album.images[0].url} type={'button'} onClick={() => {dispatch(play(song.track))}} alt='song'></img>
                </Col>
                <Col lg='4' md='4' sm='12' xs='12' className='fs-5 m-auto text-center'>
                  <p>{song.track.name}</p>
                </Col>
                <Col lg='4' md='4' sm='12' xs='12' className='fs-5 m-auto text-center'>
                <p>{song.track.artists[0].name}</p>
                </Col>
                <Col lg='2' md='2' sm='12' xs='12' className='fs-5 m-auto text-center'>
                  <p>{((song.track.duration_ms/1000)/60).toFixed(2)}</p>
                </Col>
                
              </Row>
            ))}</>) : (<></>)}
 
              </Row>

            </Container>
            <Container fluid className='ps-0 pe-0 sticky'>{audio.isPlaying ? (
              <Container fluid className='aplayer'>
                <Row className='justify-content-center'>
                  <Col lg='1 my-auto' md='2' sm='4' xs='4'>
                <img src={audio.currentsong.album.images[0].url} className='audioimg d-block  ms-auto' alt='song'></img>
                </Col>
                <Col lg='2' md='3' sm='8' xs='8'>
                <p className='mt-2 mb-0 fs-6 trackname'>{audio.currentsong.name}</p>
                <p>{audio.currentsong.artists[0].name}</p>
                </Col>
                <Col lg='4 my-auto' md='4' sm='12' xs='12'>
              <audio src={audio.currentsong.preview_url} className='player w-100 ' controls autoPlay ></audio>
              </Col>
             </Row>
              </Container>) : (
              <div></div>)}</Container>
          </Container></>)}

    </div>
  );
}

export default App;

