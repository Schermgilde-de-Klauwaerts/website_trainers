import Event from "./Event";

const EventList = ({ events, trainers }) => {
  return (
    <div className="flex flex-col ml-10">
      {trainers
        .sort((a, b) => a.localeCompare(b))
        .map((trainer) => (
          <div key={trainer}>
            <div className="font-bold mb-2">{trainer}</div>
            {events
              .filter((event) => event.trainer === trainer.split(" ")[0])
              .map((e) => (
                <Event key={e.trainer + e.datum} {...e} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default EventList;
