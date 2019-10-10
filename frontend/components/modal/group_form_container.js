import { connect } from 'react-redux';
import GroupForm from './group_form';
import { closeModal } from '../../actions/modal_actions';
import { createDmGroup } from '../../actions/dm_group_actions';

const msp = state => {
  return {
    users: Object.values(state.entities.users),
    currentUserId: state.session.id
  }
}

const mdp = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createDmGroup: (userIds) => dispatch(createDmGroup(userIds))
  }
}

export default connect(msp, mdp)(GroupForm)