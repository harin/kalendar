import * as types from '../constants/ActionTypes'

export function markFree(memberId, eventId) {
  return { type: types.MARK_FREE, memberId, eventId}
}

export function markBusy(memberId, eventId) {
  return { type: types.MARK_BUSY, memberId, eventId}
}

export function markMaybe(memberId, eventId) {
  return { type: types.MARK_MAYBE, memberId, eventId}
}

export function addMember(memberId) {
  return { type: types.ADD_MEMBER, memberId }
}

export function removeMember(memberId) {
  return { type: types.REMOVE_MEMBER, memberId}
}
