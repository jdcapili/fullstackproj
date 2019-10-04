import { connect } from 'react-redux';
import { fetchChannels } from '../../../actions/channel_actions';
import { logout } from '../../../actions/session_actions';
import SideBar from './side_bar';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id]
  };
}

const mdp = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout())
  }
}

export default connect(msp,mdp)(SideBar)