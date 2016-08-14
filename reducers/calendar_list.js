import { CREATE_CALENDAR, DELETE_CALENDAR } from '../constants/ActionTypes'
import calendar, { createCalendar } from './calendar'

const initialState = []

export default function calendarList(state = initialState, action) {
  switch (action.type) {
    case CREATE_CALENDAR:
      return [
        createCalendar(action.name, action.ownerId),
        ...state
      ]
    case DELETE_CALENDAR:
      return state.filter( calendar => calendar.id !== action.calendarId)
    default:
      return state.map((_calendar) => {
        if (action.calendarId !== _calendar.id) return _calendar
        return calendar(_calendar, action)
      })
  }
}
