import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./Timetable.css";
import "./my-theme.css";

const Timetable = () => {
  const calendarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [navigatorStartDate, setNavigatorStartDate] = useState(new DayPilot.Date());
  const cityName = location.state?.cityName;

  const goBack = () => {
    navigate(-1);
  };

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("일정 수정:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  const [calendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    cssClassPrefix: "timetable",
    eventCss: "timetable_event", 
    eventInnerCss: "timetable_event_inner",
    onTimeRangeSelected: async args => {
      const dp = calendarRef.current.control;
      const modal = await DayPilot.Modal.prompt("일정 추가", "");
      dp.clearSelection();
      if (!modal.result) { return; }

      dp.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "일정 삭제",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "수정",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          }
        }
      ];


      const participants = args.data.participants;
      if (participants > 0) {
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `https://picsum.photos/24/24?random=${i}`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
          });
        }
      }
    }
  });

  useEffect(() => {
    const selectedStartDate = location.state?.startDate
        ? new DayPilot.Date(location.state.startDate)
        : DayPilot.Date.today();

    console.log('Selected start date:', selectedStartDate.toString());
    console.log('Day of the week:', selectedStartDate.dayOfWeek());

    setNavigatorStartDate(selectedStartDate || DayPilot.Date.today());

    const daliyPilorCal = calendarRef.current?.control;
    if (daliyPilorCal) {
      daliyPilorCal.startDate = selectedStartDate || DayPilot.Date.today();
      daliyPilorCal.update();
    }

    if (calendarRef.current?.control) {
      calendarRef.current.control.startDate = selectedStartDate;
      calendarRef.current.control.update();
    }

  }, [location.state?.startDate]);

  const titleStyle = {
    color: '#2c3e50',
    letterSpacing: '1px',
  };

  const wrapStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  };

  return (
      <div className="wrap" style={wrapStyle}>
        <div className="cityname">
          <h1 className="title1" style={titleStyle}>Schedule Your Trip</h1>
          {cityName && <h1 className="title3" style={{...titleStyle, textAlign: 'center'}}>To <span style={{color: '#1f73c7'}}>{cityName}</span></h1>
          }
        </div>
        <div className='timetable'>
          <div className="left">
            <DayPilotNavigator
                selectMode={"Week"}
                showMonths={2}
                skipMonths={1}
                startDate={navigatorStartDate}
                onTimeRangeSelected={args => {
                  console.log("Navigator onTimeRangeSelected : ", args.day.toString());
                  setNavigatorStartDate(args.day);
                  if (calendarRef.current?.control) {
                    console.log("Updating DayPilotCalendar startDate to : ", args.day.toString());
                    calendarRef.current.control.update({ startDate: args.day });
                  }
                }}
                className = "left-calendar"
            />
            <div onClick = {goBack} className = "left-back">취소</div>
          </div>
          <div className="main">
            <DayPilotCalendar
                {...calendarConfig}
                ref={calendarRef}
                startDate={navigatorStartDate}
            />
          </div>
        </div>

      </div>
  );
}

export default Timetable;