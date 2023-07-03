
import { createSlice } from "@reduxjs/toolkit"


export const songSlice = createSlice({
  name: 'songs',
  initialState: {
    song: [

    ],
    isPlaying: false,
    currentsong:null
  
  },

  reducers: {
    play: (state, { payload }) => {
      state.isPlaying = true;
    state.currentsong = payload;
    }
  }
})


export const { play } = songSlice.actions;
export default songSlice.reducer;
