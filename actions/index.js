import * as types from '../constants/ActionTypes'

export function markStatus(memberId, eventId, status) {
  return { type: types.MARK_STATUS, memberId, eventId, status}
}

export function addMember(memberId) {
  return { type: types.ADD_MEMBER, memberId }
}

export function removeMember(memberId) {
  return { type: types.REMOVE_MEMBER, memberId}
}
