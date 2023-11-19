import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./Timetable.css";

const Timetable = () => {
  const calendarRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [navigatorStartDate, setNavigatorStartDate] = useState(new DayPilot.Date());

  const goBack = () => {
      navigate(-1);
  };

  const editEvent = async (e) => {
    const dp = calendarRef.current.control;
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    dp.events.update(e);
  };

  const [calendarConfig] = useState({
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
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
          text: "Delete",
          onClick: async args => {
            const dp = calendarRef.current.control;
            dp.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
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
    console.log("Current location state : ", location.state);
    // location.state에서 startDate를 가져옵니다.
    const selectedStartDate = location.state?.startDate
    ? new DayPilot.Date(location.state.startDate)
    : DayPilot.Date.today();
    console.log("useEffect selectedStartDate : ", selectedStartDate.toString());
    // navigatorStartDate 상태를 업데이트합니다.
    setNavigatorStartDate(selectedStartDate);

    const daliyPilorCal = calendarRef.current?.control;
    if(daliyPilorCal){
      daliyPilorCal.startDate = selectedStartDate;
      daliyPilorCal.update();
      console.log("useEffect DayPilot calendar updated")
    }

    // DayPilotCalendar의 상태를 업데이트합니다.
    if (calendarRef.current?.control) {
      //calendarRef.current.control.update({ startDate: selectedStartDate, events:[] });
      calendarRef.current.control.startDate = selectedStartDate;
      calendarRef.current.control.update();
    }
  }, [location.state?.startDate]);

  return (
    <div className="wrap">
      <div className="left">
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={1}
          skipMonths={1}
          startDate={navigatorStartDate}
          //selectionDay={"2023-10-02"}
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
  );
}

export default Timetable;
