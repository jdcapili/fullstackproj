import {connect} from 'react-redux';
import SidebarDmItem from './sidebar_dm_item';
import { deleteDmGroup } from '../../../actions/dm_group_actions';

const msp = (state, ownProps) => {

  
  let dmGroup = state.entities.dmGroups[ownProps.dmGroupId];
  let currentUserId = state.session.id;
  let members = []
  
  if (typeof dmGroup !== 'undefined'){
    dmGroup.member_ids.forEach((memberId) => {
      if(memberId !== currentUserId){
      members.push(state.entities.users[memberId])
    }
    })
  }
  return{
    dmGroup,
    members, 
  }
}

const mdp = dispatch => {
  return {
    deleteDmGroup: (id) => dispatch(deleteDmGroup(id))
  }
}

export default connect(msp, mdp)(SidebarDmItem);