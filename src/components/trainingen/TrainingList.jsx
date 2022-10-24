import { TRAININGEN_DATA }  from '../../api/mock-data';
import Training from './Training';

const TrainingList = () => {
  const trainingen = TRAININGEN_DATA;
  return (
    <div className="grid mt-3">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 g-3">
        {trainingen
          .sort((a, b) =>
            a.trainer.toUpperCase().localeCompare(b.trainer.toUpperCase())
          )
          .map((t) => (
            <div className="col">
              <Training {...t} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default TrainingList;