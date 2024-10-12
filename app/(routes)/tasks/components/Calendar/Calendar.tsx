"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js";

import axios from "axios";

import { formatDate } from "@/lib/formatDate";

import { CalendarProps } from "./Calendar.types";
import { ModalAddEvent } from "../ModalAddEvent";
import { toast } from "@/components/ui/use-toast";

export function Calendar(props: CalendarProps) {
  const { tasks,  events } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DateSelectArg>();
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    taskSelected: {
      name: "",
      id: "",
    },
    description: "",
  });

  const handleDateClick = async (selected: DateSelectArg) => {
    setOpen(true);
    setSelectedItem(selected);
  };

  useEffect(() => {
    if (onSaveNewEvent && selectedItem?.view.calendar) {
      const calendarApi = selectedItem.view.calendar;
      calendarApi.unselect();
  
      const newEventPrisma = {
        taskId: newEvent.taskSelected.id,
        title: newEvent.eventName,
        start: new Date(selectedItem.start),
        allDay: false,
        timeFormat: "H(:mm)",
        description: newEvent.description || "", // Asegúrate de que 'description' esté presente
      };
  
      console.log("Datos enviados al servidor:", newEventPrisma); // Agregar log para verificar los datos
  
      axios
        .post(
          `/api/company/${newEvent.taskSelected.id}/event`,
          newEventPrisma
        )
        .then(() => {
          toast({ title: "Evento creado" });
          router.refresh();
        }) 
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error al crear el evento",
            variant: "destructive",
          });
          console.error(error);
        });
  
      setNewEvent({
        eventName: "",
        taskSelected: {
          name: "",
          id: "",
        },
        description: "",
      });
  
      setOnSaveNewEvent(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSaveNewEvent, selectedItem, events]);
  const handleEventClick = async (selected: any) => {
    if (
      window.confirm(
        `Estas seguro que quieres eliminar este evento? => ${selected.event.title}`
      )
    ) {
      try {
        await axios.delete(`/api/event/${selected.event._def.publicId}`);
        toast({ title: "Event deleted" });
        router.refresh();
      } catch (error) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      <div className="md:flex gap-x-3">
        <div className="w-[200px] relative">
          <div className="absolute top-0 left-0 w-full h-full overflow-auto">
            <p className="mb-3 text-xl">Listado de tareas</p>
            {events.map((currentEvent) => (
              <div
                key={currentEvent.id}
                className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background"
              >
                <p className="font-bold">{currentEvent.title}</p>
                <p>{formatDate(currentEvent.start)}</p>
                {currentEvent.task && (
                  <p className="text-sm text-gray-500">Tarea: {currentEvent.task.title}</p> 
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 calendar-container">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
              multiMonthPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right:
                "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth",
            }}
            height="80vh"
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={renderEventContent}
            editable={true}
            selectable={true}
            selectMirror={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            selectLongPressDelay={30}
          />
        </div>
      </div>
      <ModalAddEvent
        open={open}
        setOpen={setOpen}
        setOnSaveNewEvent={setOnSaveNewEvent}
        tasks={tasks}
        setNewEvent={setNewEvent}
      />
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  const taskName = eventInfo.event.extendedProps.task?.title || "No asignada";
  return (
    <div className="bg-slate-200 dark:bg-background w-full p-1">
      <i>{eventInfo.event.title}</i>
      <p className="text-sm text-gray-500">Tarea: {taskName}</p>
    </div>
  );
}