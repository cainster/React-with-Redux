import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {fetchStreams} from '../../actions';

// const StreamList = () => {
//   return <div>StreamList</div>;
// };
//use class bassed comp bc we to call our action creator inside compdidmount ( attempt fetch stream one tiome)
class StreamList extends React.Component {
  componentDidMount(){
    this.props.fetchStreams();
  }

  renderCheckUser(stream){
    if(stream.userId === this.props.currentUserId){
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderList(){
      return this.props.streams.map(stream => {
        return (
            <div className="item" key={stream.id}>
              {this.renderCheckUser(stream)}
              <i className="large middle icon camera"/>
              <div className="content">
                <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
                <div className="description">{stream.description}</div>
              </div>
            </div>
        );
      });
  }

  renderCreate(){
    if(this.props.isSignedIn){
      return (
        <div>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render(){
    //console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div>
          {this.renderCreate()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //turn streams object into an array into our component
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };

};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
