import { MARK_FREE, MARK_MAYBE, MARK_BUSY, ADD_MEMBER, REMOVE_MEMBER } from '../constants/ActionTypes'

const initialState = {
    name: 'Untitled',
    members: [],
    id: 0
}

function cloneState(obj) {
  return JSON.parse(JSON.stringify(obj))
}
function cloneMember(obj) {
  return cloneState(obj)
}

function removeAtIndex(array, idx) {
  return array.slice(0, idx).concat(array.slice(idx+1))
}

function findMember(state, id) {
  return state.members.filter((member) => member.id === id)
}

function markStatus(state, action, status) {
  let _state = cloneState(state)
  _state.members.forEach((member) => {
    console.log(member.id, action.memberId)
    if (member.id === action.memberId) {
      member.days.forEach((day) => {
        console.log(day.id, action.eventId)
        if (day.id === action.eventId) day.status = status
      })
    }
  })
  return _state
}

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case MARK_FREE:
      return markStatus(state, action, 'free')

    case MARK_MAYBE:
      return markStatus(state, action, 'maybe')

    case MARK_BUSY:
      return markStatus(state, action, 'busy')

    case ADD_MEMBER:
      let matched = findMember(state, action.memberId)
      if (matched.length > 0) return state

      let _state = cloneState(state)
      let days = Array(31).fill(null).map((value, idx) => {
        return {
          id: idx+1,
          status: 'busy',
          note: ''
        }
      })
      _state.members.push({
        id: action.memberId,
        days: days,
        notes: ''
      })
      return _state

    case REMOVE_MEMBER:
      let index = -1
      let _members = null
      state.members.forEach((member, idx) => {
        if (member.id === action.memberId) index = idx
      })

      if (index >= 0) {
        _members = removeAtIndex(state.members, index)
        let _state = cloneState(state)
        _state.members = _members
        return _state
      } else {
        return state
      }

    default:
      return state
  }
}
