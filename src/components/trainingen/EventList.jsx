import Event from "./Event";

const EventList = ({ events, trainers, maand }) => {
  const getEventsTrainerOfMonth = (trainer) => {
    return events.filter(
      (event) =>
        event.trainer === trainer &&
        event.datum.split(" ")[1].split("/")[1] === maand.toString()
    );
  };

  const getTrainersForMonth = () => {
    let gewerkt = [];

    events.forEach((event) => {
      if (
        event.datum.split(" ")[1].split("/")[1] === maand.toString() &&
        !gewerkt.includes(event.trainer) &&
        event.trainer !== ""
      ) {
        gewerkt.push(event.trainer);
      }
    });

    return gewerkt;
  };

  return (
    <div className="flex flex-row mx-10">
      {getTrainersForMonth()
        .sort((a, b) => a.localeCompare(b))
        .map((trainer) => (
          <div key={trainer} className="mr-10">
            <div className="font-bold mb-2">{trainer}</div>
            {getEventsTrainerOfMonth(trainer).map((e) => (
              <Event key={e.trainer + e.datum} {...e} />
            ))}
          </div>
        ))}
    </div>
  );
};

export default EventList;
