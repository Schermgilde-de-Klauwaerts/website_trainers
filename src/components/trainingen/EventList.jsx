import Event from "./Event";

const EventList = ({ events, trainers, maand, jaar }) => {
  const getTrainersForDate = () => {
    let gewerkt = [];

    events.forEach((event) => {
      if (
        event.datum.split("-")[1] === maand.toString() &&
        event.datum.split("-")[0] === jaar.toString() &&
        !gewerkt.includes(event.trainer) &&
        event.trainer !== null
      ) {
        gewerkt.push(event.trainer);
      }
    });
    return gewerkt;
  };

  return (
    <div className="flex flex-row mx-10 justify-center">
      {getTrainersForDate(trainers)
        .sort((a, b) => a.localeCompare(b))
        .map((trainer) => (
          <div key={trainer} className="mx-10">
            <div className="font-bold mb-2">{trainer}</div>
            {events
              .filter((e) => e.trainer === trainer)
              .map((e) => (
                <Event key={e.id} {...e} />
              ))}
          </div>
        ))}
    </div>
  );
};

export default EventList;
