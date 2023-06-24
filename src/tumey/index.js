/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './index.css'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTask,
  removeTask,
  editTask,
  saveTask,
  updateCalendarDays,
  calculateCalendarSize,
  dropInCalendar,
  calendarDaysPosition,
} from '../store/tumeySlice'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import Portal from '@mui/base/Portal'

import AddTaskIcon from '@mui/icons-material/AddTask'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import { Block, BorderClearOutlined, ConstructionTwoTone } from '@mui/icons-material'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import CloudQueueTwoToneIcon from '@mui/icons-material/CloudQueueTwoTone'
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined'
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'

const formatDateToToday = () => {
  const today = new Date()
  // TODO: Splitting by T removes timezone information so date might be off by some hours
  let year = today.getFullYear()
  let month = today.getMonth() + 1
  if (month < 10) {
    month = `0${month}`
  }
  let day = today.getDate()

  let formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

// function myFunction() {
//   return null
// }

// const myFunction = () => {
//     return null;
// };

// class DailyTime extends React.Component {
//     render() {
//         const time = new Array(25).fill(0);
//         let timeIndex = time.map((hour, index) => index + ':00  ');

//         return timeIndex.map((hr, i) => (
//             <tr key={i}>
//                 <td className="hourOfDay">{hr}</td>
//                 <td width="100%" className="timelineLinesWrapper">
//                     <div className="timelineLines" />
//                 </td>
//             </tr>
//         ));
//     }
// }

// functional component = react component using hooks
// capital is important

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

const DailyTimeFC = () => {
  const time = new Array(25).fill(0)
  const times = time.map((hour, index) => `${index < 10 ? `0${index}` : index}:00`)

  // Times is an array of elements
  const Times = times.map((hr, i) => (
    <tr key={i}>
      <td className='hourOfDay'>{hr}</td>
      <td width='100%' className='timelineLinesWrapper'>
        <div className='timelineLines' />
      </td>
    </tr>
  ))

  return Times
}

// const calculateTaskHeight = () => {
// this is a regular js function, not a react component
// }
// props = { key: value, key2: value2, ... }
const TaskBlock = (props) => {
  // destructure same as doing props.taskList
  // <TaskBlock taskList={someListFromMasterBoard} />
  // remember: no "this" in hooks (functions)
  const { dayTaskList } = props
  // const [task1, task2, task3] = taskList

  // const array = [1, 2, 3, 4]
  // const [first, anything, second] = array

  // const object = { taskList: [], date: new Date() }

  //filter out from taskList tasks that have allDay=true since they will show in the allDay panel instead

  const taskList = dayTaskList.filter((task) => !task.allDay)
  // console.log(newTaskList)

  const dispatch = useDispatch()

  const calculateTaskHeight = (task) => {
    let taskDuration
    let minutes

    let endMinute = task.endTime.split(':')
    endMinute = parseInt(endMinute[1])
    let startMinute = task.startTime.split(':')
    startMinute = parseInt(startMinute[1])

    minutes = endMinute - startMinute

    taskDuration = parseInt(task.endTime) - parseInt(task.startTime) + minutes / 60

    if (taskDuration === 0) {
      taskDuration = 1
    }

    return {
      taskDuration,
      minutes: startMinute,
    }
  }

  const calculateStartHeight = (task) => {
    const { minutes } = calculateTaskHeight(task)

    let startHeight = 10 + 20 * (parseInt(task.startTime) + Math.abs(minutes / 60))

    return startHeight
  }

  return (
    <Grid container>
      {taskList.map((newTodo, index) => {
        const { taskDuration } = calculateTaskHeight(newTodo)
        return (
          <Grid container key={newTodo.taskName + (index + Math.random()).toString()}>
            {/* <motion.div
                            style={{
                                key: newTodo.taskName + (index + Math.random()).toString(),
                                backgroundColor: 'pink',
                                border: '1px solid black',
                                height: 50,
                                position: 'absolute',
                                top: calculateStartHeight(newTodo),
                                height: 20 * taskDuration,
                                width: '82%',
                                left: '50px',
                                borderRadius: 8,
                                padding: 8,
                                onClick: () => {
                                    dispatch(editTask(index));
                                },
                                className: 'newToDo'
                                //seems not able to take on a className?
                            }}
                            drag="y"
                            // dragConstraints={props.calendarRef}
                            // dragSnapToOrigin={true}
                            dragElastic={0.2}
                            onDragEnd={(event, info) => {
                                let x = info.point.x;
                                let y = info.point.y;
                                let dragLocation = {
                                    x,
                                    y
                                };
                                console.log(dragLocation, props.calendarRef);
                            }}
                            dragMomentum={false}
                        > */}
            <Box
              position='absolute'
              backgroundColor='primary.main'
              width='82%'
              left='50px'
              borderRadius={2}
              p={1}
              sx={{
                top: calculateStartHeight(newTodo),
                // left: 70 + 10 * index,
                height: 20 * taskDuration,
                opacity: 0.9,
              }}
              onClick={() => {
                dispatch(editTask(index))
              }}
              className='newToDo'
            >
              <Box>{newTodo.startTime}</Box>
              <Box fontWeight='bold'>{newTodo.taskName}</Box>
            </Box>
            {/* </motion.div> */}
          </Grid>
        )
      })}
      {/* <motion.div
                style={{
                    backgroundColor: 'pink',
                    border: '1px solid black'
                    // height: 50,
                    // width: 50
                }}
                drag="y"
                // dragConstraints={props.calendarRef}
                // dragSnapToOrigin={true}
                dragElastic={0.2}
                onDragEnd={(event, info) => {
                    let x = info.point.x;
                    let y = info.point.y;
                    let dragLocation = {
                        x,
                        y
                    };
                    console.log(dragLocation);
                }}
                dragMomentum={false}
            >
                WORDS
            </motion.div> */}
    </Grid>
  )
}

const AllDayBlock = (props) => {
  const taskList = props.taskList

  const allDayItems = taskList.map((newAllDay, index) => (
    <Box>
      <p>
        {index + 1} -- {newAllDay.taskName}
      </p>
    </Box>
  ))
  return (
    <Box position='sticky' top='0' display='flex' flexDirection='row'>
      <Box flex={1}> All day</Box>
      <Box flex={5}>{allDayItems}</Box>
    </Box>
  )
}

const Calendar = (props) => {
  // const { taskList } = props;
  const allTaskList = useSelector((state) => state.taskList.list)
  const taskList = allTaskList.filter((task) => task.showOnCalendar)
  const [currentDay, setCurrentDay] = useState(new Date())
  const dispatch = useDispatch()

  let currentMonth = currentDay.toLocaleString('default', { month: 'long' })
  let currentDate = currentDay.getDate()
  let currentMonthNumber = currentDay.getMonth() + 1

  const tomorrow = new Date(currentDay)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let tomorrowMonth = tomorrow.toLocaleString('default', { month: 'long' })
  let tomorrowDate = tomorrow.getDate()
  let tomorrowMonthNumber = tomorrow.getMonth() + 1

  const overmorrow = new Date(currentDay)
  overmorrow.setDate(overmorrow.getDate() + 2)
  let overmorrowMonth = overmorrow.toLocaleString('default', { month: 'long' })
  let overmorrowDate = overmorrow.getDate()
  let overmorrowMonthNumber = overmorrow.getMonth() + 1

  //filter out tasks based on date
  const currentDayList = taskList.filter((task, index) => {
    const [taskYear, taskMonth, taskDay] = task.taskDate.split('-')
    if (parseInt(taskMonth) === currentMonthNumber && parseInt(taskDay) === currentDate) {
      return true
    }
    return false
  })
  //filter out tasks w/allday = true
  let currentDayAllDayItemQuantity = 0
  const currentDayAllDayList = currentDayList.filter((task, index) => {
    if (task.showOnCalendar && task.allDay) {
      currentDayAllDayItemQuantity = index + 1
      return true
    }
    return false
  })

  const tomorrowList = taskList.filter((task, index) => {
    const taskDate = task.taskDate.split('-')
    const taskMonth = taskDate[1]
    const taskDay = taskDate[2]
    if (parseInt(taskMonth) === tomorrowMonthNumber && parseInt(taskDay) === tomorrowDate) {
      return true
    }
    return false
  })
  let tomorrowAllDayItemQuantity = 0
  const tomorrowAllDayList = tomorrowList.filter((task, index) => {
    if (task.showOnCalendar && task.allDay) {
      tomorrowAllDayItemQuantity = index + 1
      return true
    }
    return false
  })

  const overmorrowList = taskList.filter((task, index) => {
    const taskDate = task.taskDate.split('-')
    const taskMonth = taskDate[1]
    const taskDay = taskDate[2]
    if (parseInt(taskMonth) === overmorrowMonthNumber && parseInt(taskDay) === overmorrowDate) {
      return true
    }
    return false
  })
  let overmorrowAllDayItemQuantity = 0
  const overmorrowAllDayList = overmorrowList.filter((task, index) => {
    if (task.showOnCalendar && task.allDay) {
      overmorrowAllDayItemQuantity = index + 1
      return true
    }
    return false
  })

  //calculate the min height for all day module on calendar so that all three days all day have the same height and are aligned
  let allDayModHeight = Math.max(
    Math.max(
      currentDayAllDayItemQuantity,
      tomorrowAllDayItemQuantity,
      overmorrowAllDayItemQuantity,
    ),
    1,
  )

  //fetching weather API...
  const [todayWeather, setTodayWeather] = useState({
    daily: { weathercode: [0], temperature_2m_min: [0], temperature_2m_max: [0] },
  })
  const [tomoWeather, setTomoWeather] = useState({
    daily: { weathercode: [0], temperature_2m_min: [0], temperature_2m_max: [0] },
  })
  const [overWeather, setOverWeather] = useState({
    daily: { weathercode: [0], temperature_2m_min: [0], temperature_2m_max: [0] },
  })
  const [weatherToggle, setWeatherToggle] = useState(false)

  const getWeatherIcon = (code) => {
    switch (code) {
      case 0: {
        return <WbSunnyOutlinedIcon fontSize='small' color='primary' />
      }
      case 1:
      case 2:
      case 3: {
        return <CloudOutlinedIcon fontSize='small' color='primary' />
      }
      case 45:
      case 48: {
        return <CloudQueueTwoToneIcon fontSize='small' color='primary' />
      }
      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82: {
        return <WaterDropOutlinedIcon fontSize='small' color='primary' />
      }
      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86: {
        return <AcUnitOutlinedIcon fontSize='small' color='primary' />
      }
      case 95:
      case 96:
      case 99: {
        return <ThunderstormOutlinedIcon fontSize='small' color='primary' />
      }
    }
  }

  const fetchWeatherData = async (date) => {
    try {
      // console.log('fetching...');
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=-123.12&daily=weathercode,temperature_2m_max,temperature_2m_min&forecast_days=1&start_date=${date}&end_date=${date}&timezone=Pacific%2FAuckland`,
      )

      const jsonData = await res.json()

      if (jsonData.error) {
        console.log(jsonData)
        throw new Error(jsonData)
      }
      setWeatherToggle(false)
      return jsonData
    } catch (error) {
      const jsonData = {
        daily: { weathercode: [0], temperature_2m_min: [0], temperature_2m_max: [0] },
      }
      setWeatherToggle(true)
      return jsonData
    }

    // console.log(
    //     typeof jsonData,
    //     jsonData.daily.temperature_2m_min[0],
    //     jsonData.daily.temperature_2m_max[0],
    //     jsonData.daily.weathercode[0]
    // );
  }

  const fetchWeather = () => {
    const refDate = new Date()
    if (currentDay.getFullYear() > refDate.getFullYear()) {
      fetchTodayWeather()
      fetchTomoWeather()
      fetchOverWeather()
    } else if (currentDay.getFullYear() === refDate.getFullYear()) {
      if (currentDay.getMonth() > refDate.getMonth()) {
        fetchTodayWeather()
        fetchTomoWeather()
        fetchOverWeather()
      } else if (currentDay.getMonth() === refDate.getMonth()) {
        if (currentDay.getDate() >= refDate.getDate()) {
          // console.log('enter day');
          fetchTodayWeather()
          fetchTomoWeather()
          fetchOverWeather()
        } else {
          setWeatherToggle(true)
        }
      } else {
        setWeatherToggle(true)
      }
    } else {
      setWeatherToggle(true)
    }
  }

  const fetchTodayWeather = async () => {
    const data = await fetchWeatherData(formatDate(currentDay))
    setTodayWeather(data)
  }

  const fetchTomoWeather = async () => {
    const data = await fetchWeatherData(formatDate(tomorrow))
    setTomoWeather(data)
  }

  const fetchOverWeather = async () => {
    const data = await fetchWeatherData(formatDate(overmorrow))
    setOverWeather(data)
  }

  const formatDate = (today) => {
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    if (month < 10) {
      month = `0${month}`
    }
    let day = today.getDate()

    let formattedDate = `${year}-${month}-${day}`

    return formattedDate
  }

  const uploadCalendarDays = () => {
    const day1Date = formatDate(currentDay)
    const day2Date = formatDate(tomorrow)
    const day3Date = formatDate(overmorrow)

    const days = {
      day1Date,
      day2Date,
      day3Date,
    }

    return days
  }

  useEffect(() => {
    fetchWeather()
    dispatch(updateCalendarDays(uploadCalendarDays()))
  }, [currentDay])

  const weatherForecast = (date) => {
    if (!weatherToggle) {
      return (
        <span>
          {' | '}
          {getWeatherIcon(date?.daily.weathercode[0])} {date?.daily.temperature_2m_min[0]}°C -{' '}
          {date?.daily.temperature_2m_max[0]}
          °C
        </span>
      )
    }
  }

  //calculate visible window size and location of the calendar and dispatch to the store

  const boxRef = useRef()
  const calendarRef = props.calendarRef

  const getCalendarDaysPosition = () => {
    const calendarNodeList = boxRef?.current?.querySelectorAll('div.MuiGrid-root.MuiGrid-item')

    const day1Position = calendarNodeList?.item(3).offsetLeft - boxRef.current.scrollLeft
    const day2Position = calendarNodeList?.item(4).offsetLeft - boxRef.current.scrollLeft
    const day3Position = calendarNodeList?.item(5).offsetLeft - boxRef.current.scrollLeft

    const daysPosition = {
      day1Position,
      day2Position,
      day3Position,
    }

    dispatch(calendarDaysPosition(daysPosition))
  }

  const getPosition = () => {
    const x = boxRef.current.offsetLeft
    const y = boxRef.current.offsetTop
    const width = boxRef.current.offsetWidth
    const height = boxRef.current.offsetHeight
    const calendarSize = {
      x,
      y,
      width,
      height,
    }
    dispatch(calculateCalendarSize(calendarSize))
    getCalendarDaysPosition()
  }

  useEffect(() => {
    getPosition()
  }, [])

  useEffect(() => {
    boxRef.current.addEventListener('resize', getPosition)
    boxRef.current.addEventListener('scroll', getPosition)

    return () => {
      boxRef?.current?.removeEventListener('resize', getPosition)
      boxRef?.current?.removeEventListener('scroll', getPosition)
    }
  }, [])

  //set scroll bar position and add padding so that when all day list grows, the timeline doesn't move but the user is able to scroll up to see the full hours still

  const [currentPos, setCurrentPos] = useState(allDayModHeight)
  const prevPosRef = useRef(allDayModHeight)

  useEffect(() => {
    setCurrentPos(allDayModHeight)
  }, [allDayModHeight])

  useEffect(() => {
    const scrollbar = document.querySelector('#scrollbar')
    let timeLinePos = scrollbar.scrollTop
    if (currentPos > prevPosRef.current) {
      scrollbar.scrollTop = timeLinePos + 16
    } else if (currentPos < prevPosRef.current) {
      scrollbar.scrollTop = timeLinePos - 16
    }
    prevPosRef.current = currentPos
  }, [currentPos])

  // -16 when decreasing padding i.e. decreasing # of All Day events, + 16 when increasing padding + # All Day events

  // useEffect(() => {
  //   const scrollbar = document.querySelector('#scrollbar')
  //   scrollbar.addEventListener('scroll', (event) => {
  //     scrollbar.scrollTop = allDayModHeight * 16 + 3
  //     console.log(`scrollTop value: ${scrollbar.scrollTop}`)
  //   })
  // }, [allDayModHeight])

  return (
    <Box
      // overflow='auto'
      display='flex'
      flexDirection='column'
      m={0}
      border='1px solid #613cb0'
      borderRadius={1.5}
      backgroundColor='grey[50]'
      ref={boxRef}
      maxHeight='300px'
      // overflow='auto hidden'
      overflow='scroll'
      id='scrollbar'
    >
      <Grid>
        <Grid container wrap='nowrap' position='sticky' top='0px' zIndex={3}>
          {/* contains the three headers */}
          <Grid
            item
            position='sticky'
            top='0px'
            backgroundColor='secondary.light'
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // minWidth={`max(360px, calc(100vw - 40px - 360px - 360px))`}
          >
            <Box
              minHeight={30}
              maxHeight={30}
              component={Grid}
              container
              alignItems='baseline'
              justifyContent='left'
              pt={0.5}
            >
              <Button
                // className="TestButton"
                // variant="contained"
                size='small'
                color='secondary'
                onClick={() => {
                  setCurrentDay(new Date())
                }}
              >
                Today
              </Button>
              <Button
                size='small'
                color='secondary'
                onClick={() => {
                  let newDay = new Date(currentDay)
                  newDay.setDate(newDay.getDate() - 3)
                  setCurrentDay(newDay)
                }}
              >
                {'<'}&lt;
              </Button>
              <Box component='span' ml={0}>
                {' '}
                {currentMonth} {currentDate} {weatherForecast(todayWeather)}
              </Box>
            </Box>
            <Box
              position='absolute'
              backgroundColor='white'
              borderTop='1px solid #999'
              borderBottom='2px solid #999'
              width='100%'
              height={allDayModHeight * 16 + 3}
              // '3' to add on the border height
            >
              <AllDayBlock taskList={currentDayAllDayList} />
            </Box>
          </Grid>
          <Grid
            item
            position='sticky'
            top='0px'
            backgroundColor='#ece7f5'
            zIndex={3}
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // minWidth={`max(360px, calc(100vw - 40px - 360px - 360px))`}
          >
            <Box
              minHeight={30}
              component={Grid}
              container
              alignItems={weatherToggle ? 'center' : 'baseline'}
              justifyContent='center'
              pt={0.5}
            >
              {tomorrowMonth} {tomorrowDate} {weatherForecast(tomoWeather)}
            </Box>
            <Box
              position='absolute'
              backgroundColor='white'
              borderTop='1px solid #999'
              borderBottom='2px solid #999'
              width='100%'
              height={allDayModHeight * 16 + 3}
            >
              <AllDayBlock taskList={tomorrowAllDayList} />
            </Box>
          </Grid>
          <Grid
            item
            position='sticky'
            top='0px'
            backgroundColor='#ece7f5'
            zIndex={3}
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // minWidth={`max(360px, calc(100vw - 40px - 360px - 360px))`}
          >
            <Box
              minHeight={30}
              maxHeight={30}
              component={Grid}
              container
              alignItems='baseline'
              // justifyContent={weatherToggle ? 'space-around' : 'flex-end'}
              justifyContent='flex-end'
              pt={0.5}
              pr={4}
            >
              <Box component='span' mr={0} pr={weatherToggle ? '80px' : '0'}>
                {overmorrowMonth} {overmorrowDate} {weatherForecast(overWeather)}
              </Box>
              <Button
                size='small'
                color='secondary'
                onClick={() => {
                  let newDay = new Date(currentDay)
                  newDay.setDate(newDay.getDate() + 3)
                  setCurrentDay(newDay)
                }}
              >
                {'>>'}
              </Button>{' '}
            </Box>
            <Box
              position='absolute'
              backgroundColor='white'
              borderTop='1px solid #999'
              borderBottom='2px solid #999'
              width='100%'
              height={allDayModHeight * 16 + 3}
            >
              <AllDayBlock taskList={overmorrowAllDayList} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          wrap='nowrap'
          style={{
            paddingTop: allDayModHeight * 16 + 3,
          }}
          //this padding changes in helping to make the scrollbar scrollable to the top of the days when allDay mod grows
        >
          {/* contains the three days' timeline */}
          <Grid
            item
            borderRight='1px solid #999'
            px={1}
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // xs={1}
          >
            <Box position='relative'>
              <DailyTimeFC />

              <TaskBlock dayTaskList={currentDayList} calendarRef={boxRef} />
            </Box>
          </Grid>
          <Grid
            item
            borderRight='1px solid #999'
            position='relative'
            px={1}
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // xs={1}
          >
            <DailyTimeFC />
            <TaskBlock dayTaskList={tomorrowList} calendarRef={boxRef} />
          </Grid>
          <Grid
            item
            position='relative'
            pl={1}
            pr={3}
            minWidth={`min(360px, calc(100vw - 40px - 40px - 20px))`}
            // xs={1}
          >
            <DailyTimeFC />
            <TaskBlock dayTaskList={overmorrowList} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

function TaskField(props) {
  const [taskName, setTaskName] = useState('')
  const [taskDate, setTaskDate] = useState(formatDateToToday())
  const [allDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [showOnCalendar, setShowOnCalendar] = useState(false)
  const [error, setError] = useState(false)
  const [taskIndex, setTaskIndex] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // validate start and end time
    if (endTime[0] < startTime[0]) {
      setError(true)
      return
    }
    if (endTime[0] === startTime[0]) {
      if (endTime[1] < startTime[1]) {
        setError(true)
        return
      } else {
        setError(false)
      }
    }
    setError(false)
  }, [startTime, endTime])

  let taskIndexToEdit = useSelector((state) => state.taskList.taskIndexToEdit)
  const taskList = useSelector((state) => state.taskList.list)

  useEffect(() => {
    setTaskIndex(taskIndexToEdit)
  }, [taskIndexToEdit])

  useEffect(() => {
    if (taskIndex !== null) {
      let taskToEdit = taskList[taskIndex]
      setTaskName(taskToEdit.taskName)
      setTaskDate(taskToEdit.taskDate)
      setAllDay(taskToEdit.allDay)
      setStartTime(taskToEdit.startTime)
      setEndTime(taskToEdit.endTime)
      setShowOnCalendar(taskToEdit.showOnCalendar)
      setEditMode(true)
    }
  }, [taskIndex, taskList])

  const handleClickAway = (e) => {
    e.preventDefault()
    if (
      !e.target?.classList?.contains('newToDo') &&
      !e.target?.parentElement?.classList?.contains('newToDo') &&
      taskIndex !== null
    ) {
      setEditMode(false)
      handleSaveTask()
    }
  }

  const createNewTask = (event) => {
    event?.preventDefault()
    if (error) {
      alert('Please enter a valid end time.')
      return
    }
    const newTask = {
      taskName,
      taskDate,
      allDay,
      startTime,
      endTime,
      showOnCalendar,
    }
    if (newTask.taskName === '') {
      newTask.taskName = 'New Task'
    }
    dispatch(addTask(newTask))
    resetForm()
  }

  const handleSaveTask = () => {
    if (error) {
      alert('Please enter a valid end time.')
      return
    }
    const newTask = {
      taskName,
      taskDate,
      allDay,
      startTime,
      endTime,
      showOnCalendar,
      taskIndex,
    }
    if (newTask.taskName === '') {
      newTask.taskName = 'New Task'
    }
    dispatch(saveTask(newTask))
    resetForm()
  }

  const handleDeleteTask = (e) => {
    e?.preventDefault()
    dispatch(removeTask(taskIndex))
    resetForm()
  }

  const resetForm = (event) => {
    event?.preventDefault()
    setTaskName('')
    setTaskDate(formatDateToToday())
    setStartTime('09:00')
    setEndTime('17:00')
    setTaskIndex(null)
    setEditMode(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        component='form'
        // onSubmit={editMode ? handleClickAway : createNewTask}
        onSubmit={(e) => e.preventDefault()}
        // sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete='off'
        m={1}
        border='1px solid #613cb0'
        borderRadius={2}
      >
        <Stack spacing={2} p={1}>
          <Box textAlign='center'>Inspire yourself everyday!</Box>
          <Box>
            <TextField
              label='Task name'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              size='small'
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value)
              }}
              fullWidth
            />
          </Box>
          <FormControlLabel
            control={
              <Switch
                color='secondary'
                checked={showOnCalendar}
                onChange={(e) => {
                  setShowOnCalendar(e.target.checked)
                }}
              />
            }
            label='Show on Calendar'
            sx={{ width: 100, fontSize: 0.86 }}
          />
          <Box>
            <TextField
              type='date'
              label='Task date'
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              size='small'
              value={taskDate}
              onChange={(e) => {
                setTaskDate(e.target.value)
              }}
              min='2023-01-01'
              max='2023-12-31'
              // sx={{
              //     width: 300
              // }}
              fullWidth
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                color='secondary'
                checked={allDay}
                onChange={(e) => {
                  setAllDay(e.target.checked)
                }}
              />
            }
            label='All Day'
            sx={{ width: 100, fontSize: 0.86 }}
          />
          {allDay ? null : (
            <Stack spacing={2} p={1}>
              <Box>
                <TextField
                  type='time'
                  label='Start time'
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  display='inline-block'
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value)
                  }}
                  fullWidth
                />
              </Box>

              <Box className='endTimeWrapper'>
                <TextField
                  type='time'
                  label='End time'
                  InputLabelProps={{ shrink: true }}
                  size='small'
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value)
                  }}
                  fullWidth
                />
                <span className={error ? 'errorLine' : ''} />
              </Box>
            </Stack>
          )}

          {editMode ? (
            <Button
              variant='contained'
              color='secondary'
              size='small'
              endIcon={<DeleteForeverOutlinedIcon />}
              onClick={() => {
                handleDeleteTask()
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              type='submit'
              variant='contained'
              endIcon={<AddTaskIcon />}
              color='secondary'
              size='small'
              onClick={() => {
                createNewTask()
              }}
            >
              Create a task
            </Button>
          )}
        </Stack>
      </Box>
    </ClickAwayListener>
  )
}

function NewTodo(props) {
  // AKA "Main Board"
  const newTodoList = useSelector((state) => state.taskList.list)
  const dispatch = useDispatch()

  const listItems = newTodoList.map((newTodo, index) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Grid item key={index} xs={1} sm={1} md={1}>
      <motion.div
        style={{
          backgroundColor: '#2196F3',
          border: '1px solid black',
          borderRadius: 6,
          margin: 5,
        }}
        id={index}
        className='newToDo'
        drag
        // dragConstraints={props.calendarRef?.current}
        dragSnapToOrigin={true}
        dragElastic={0.2}
        onMouseDown={() => {
          dispatch(editTask(index))
        }}
        onDragEnd={(event, info) => {
          let x = info.point.x
          let y = info.point.y
          let dragLocation = {
            x,
            y,
          }
          dispatch(dropInCalendar(dragLocation))
        }}
        dragMomentum={false}
      >
        <Box
          p={0.5}
          m={0.5}
          minHeight={50}
          borderRadius={1.5}
          backgroundColor='#2196F3'
          color='white'
          className='newToDo'
        >
          <p>{newTodo.taskName}</p>
          <p>{newTodo.showOnCalendar ? newTodo.taskDate : null}</p>
          <p>{newTodo.allDay ? 'All Day' : null}</p>
        </Box>
      </motion.div>
    </Grid>
  ))

  return (
    <>
      <Grid
        container
        rowSpacing={1.5}
        m={1}
        minHeight={350}
        border='1px solid #613cb0'
        borderRadius={1.5}
        direction='column'
      >
        <Grid container item justifyContent='center'>
          Main Board
        </Grid>
        <Grid
          container
          item
          // spacing={{ xs: 0, sm: 0.5, md: 1.5 }}
          columns={{ xs: 2, sm: 3, md: 5 }}
          // overflow="auto"
          // maxHeight={300}
          // can't use overflow in conjunction w/ motion.div drag function
        >
          {listItems}
        </Grid>
      </Grid>
    </>
  )
}

const MasterBoard = () => {
  const calendarRef = useRef()

  return (
    <Grid container columns={{ xs: 3, sm: 3, md: 3 }} columnSpacing={1.5}>
      <Grid item xs={3} sm={3} md={3}>
        <Calendar calendarRef={calendarRef} />
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <NewTodo calendarRef={calendarRef} />
      </Grid>
      <Grid item xs={3} sm={1} md={1}>
        <TaskField />
      </Grid>
    </Grid>
  )
}

export default MasterBoard

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(<MasterBoard />);

// Hooks don’t work inside classes — they let you use React without classes.
// Hooks are a way to reuse stateful logic, not state itself
// the effect cleanup phase happens after every re-render, and not just once during unmounting
