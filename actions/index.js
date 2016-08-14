import * as types from '../constants/ActionTypes'

export function markStatus(calendarId, memberId, eventId, status) {
  return { type: types.MARK_STATUS, calendarId, memberId, eventId, status}
}

export function addMember(calendarId, memberId) {
  return { type: types.ADD_MEMBER, calendarId, memberId }
}

export function removeMember(calendarId, memberId) {
  return { type: types.REMOVE_MEMBER, calendarId, memberId}
}

//
// calendar list
//
export function createCalendar(ownerId) {
  return { type: types.CREATE_CALENDAR, ownerId }
}

export function deleteCalendar(calendarId) {
  return { type: types.DELETE_CALENDAR, calendarId }
}
