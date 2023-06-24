import { createSlice } from '@reduxjs/toolkit'

export const tumeySlice = createSlice({
  name: 'taskList',
  initialState: {
    list: [],
    taskIndexToEdit: null,
    day1Date: null,
    day2Date: null,
    day3Date: null,
    calendarWidthRange: [0, 0],
    calendarHeightRange: [0, 0],
    day1Position: null,
    day2Position: null,
    day3Position: null,
  },
  reducers: {
    // increment: (state) => {
    //     // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //     // doesn't actually mutate the state because it uses the Immer library,
    //     // which detects changes to a "draft state" and produces a brand new
    //     // immutable state based off those changes
    //     state.value += 1;
    // },
    // decrement: (state) => {
    //     state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //     state.value += action.payload;
    // },

    addTask: (oldList, action) => {
      oldList.list = [...oldList.list, action.payload]
    },
    removeTask: (oldList, action) => {
      const newList = oldList.list.filter((item, index) => {
        return index !== action.payload
      })
      oldList.list = newList
      oldList.taskIndexToEdit = null
    },
    editTask: (oldList, action) => {
      oldList.taskIndexToEdit = action.payload
    },
    saveTask: (oldList, action) => {
      oldList.list[action.payload.taskIndex] = action.payload
      oldList.taskIndexToEdit = null
    },
    updateCalendarDays: (oldList, action) => {
      let days = action.payload
      oldList.day1Date = days.day1Date
      oldList.day2Date = days.day2Date
      oldList.day3Date = days.day3Date
    },
    calculateCalendarSize: (oldList, action) => {
      let cal = action.payload
      oldList.calendarWidthRange = [cal.x, cal.x + cal.width]
      oldList.calendarHeightRange = [cal.y, cal.y + cal.height]
    },
    calendarDaysPosition: (oldList, action) => {
      let position = action.payload
      oldList.day1Position = position.day1Position
      oldList.day2Position = position.day2Position
      oldList.day3Position = position.day3Position
    },
    dropInCalendar: (oldList, action) => {
      const x = action.payload.x
      const y = action.payload.y
      const task = oldList.list[oldList.taskIndexToEdit]
      if (
        x > oldList.calendarWidthRange[0] &&
        x < oldList.calendarWidthRange[1] &&
        y > oldList.calendarHeightRange[0] &&
        y < oldList.calendarHeightRange[1]
      ) {
        if (x > oldList.day1Position && x < oldList.day2Position) {
          task.taskDate = oldList.day1Date
          task.showOnCalendar = true
        } else if (x > oldList.day2Position && x < oldList.day3Position) {
          task.taskDate = oldList.day2Date
          task.showOnCalendar = true
        } else {
          task.taskDate = oldList.day3Date
          task.showOnCalendar = true
        }
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addTask,
  removeTask,
  editTask,
  saveTask,
  updateCalendarDays,
  calculateCalendarSize,
  calendarDaysPosition,
  dropInCalendar,
} = tumeySlice.actions

export default tumeySlice.reducer
