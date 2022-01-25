import axios from 'axios'

//action type
const FETCH_POSES = "FETCH_POSES"

//action creaters

export const fetchPoses = (poses) => ({
  type: FETCH_POSES,
  poses
})

//thunk

export const fetchPosesThunk = () => {
  return async (dispatch) => {
   try {
    const {data: poses} = await axios.get('/api/poses')
    dispatch(fetchPoses(poses))
  } catch (error) {
      console.log('FETCH POSES THUNK ERROR')
    }
  }
}

export default function posesReducer(state = [], action) {
  switch (action.type){
    case FETCH_POSES:
      return action.poses
      default:
        return state
  }
}
