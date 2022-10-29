import EVENTS_DATA from "../../api/mock-data_events";
import Training from "./Training";

const TrainingList = () => {
  const trainingen = EVENTS_DATA;
  return (
    <div className="flex flex-col ml-10">
      {trainingen
        .sort((a, b) =>
          a.trainer.toUpperCase().localeCompare(b.trainer.toUpperCase())
        )
        .map((t) => (
          <div className="basis-3/12">
            <Training {...t} />
          </div>
        ))}
    </div>
  );
};

export default TrainingList;
