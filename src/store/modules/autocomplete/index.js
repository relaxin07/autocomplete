import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { countries } from '../../../country'

const getSearchData = createAsyncThunk(
  'autoComplete/getSearchData',
  async (payload, { getState, dispatch }) => {
    if (countries == null) return false
    return countries.filter((item) => item.toLowerCase().includes(payload))
  }
)

const autoCompleteSlice = createSlice({
  name: 'autoComplete',
  initialState: {
    data: [],
  },
  extraReducers: {
    [getSearchData.fulfilled]: (state, action) => {
      state.data = action.payload
    },
  },
})

export { getSearchData }

export default autoCompleteSlice
