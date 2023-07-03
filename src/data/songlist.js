
import varava from './../data/Varava Varava.mp3';
import search from './../data/The search.mp3';
import theemai from './../data/Theemai.mp3'
import varavaim from './../data/varava.jpg';
import theemaiim from './../data/theemai.jpg';
import searchim from './../data/search.jpg'


const songs = [
    {
    id: 1,
    title: "Varavaa Varavaa",
    artist: "Anirudh",
    audioUrl: varava,
    image:varavaim,
    duration:'3:22'
  },

  {
    id: 2,
    title: "The Search",
    artist: "NF",
    audioUrl: search,
    image:searchim,
    duration:'4:51'
  },

  {
    id: 3,
    title: "Theemai dhan vellum",
    artist: "Hip Hop Tamizha",
    audioUrl: theemai,
    image:theemaiim,
    duration:'3:32'
  }
]

const songreducer = (state = songs, action) => {
    switch(action.type){
        case'SONG_LIST':
           return state;
        default:
            return state;
    }
}

export default songreducer;