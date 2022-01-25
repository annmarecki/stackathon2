import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {fetchPosesThunk} from "../store/poses"
class Yoga extends React.Component {
  componentDidMount(){
    this.props.fetchPoses()
  }

  render(){
    if (!this.props.poses){
      return (
        <div>Page Loading!</div>
      )
    } else {
  return (
    <div>
     <div className ="container" >
    <h2>Going to your first class can be stressful, Your Yoga is here to help! Below, you'll see 6 basic yoga poses with pictures and instructions, take a look!
    </h2>
     <div>
     {this.props.poses.map((pose)=> (
       <div key={pose.id}>
         <div>
         <h2>{pose.name}</h2>
         </div>
         <img
           src={pose.image}
            style={{ width: "600px", height: "400px" }}
                    />
                    <div className="container3">
          <h3>{pose.description}</h3>
          </div>
         </div>

     ))}
      </div>

    <h2> Now that you've looked at the poses and maybe even tried them out, click the start practicing button to begin training with our virtual coach!
    </h2>
      <div className ="container3">
      <Link to="/practice-room">Start Practicing</Link>
     </div>
     <div className ="container3">
      <Link to="/practice-room2">Start Practicing</Link>
     </div>
      </div>
    </div>
  )
}
}
}

const mapState = (state) => {
  return {
    poses: state.poses
  }
}

const mapDispatch = (dispatch) => ({
  fetchPoses: () => dispatch(fetchPosesThunk())
})

export default connect(mapState, mapDispatch)(Yoga)
