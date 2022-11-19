import Dag from "./Dag";

export default function Maand({
  maand,
  jaar,
  dagen,
  aantalDagenPerMaand,
  eventsForDay,
}) {
  const calculateFirstDay = () => {
    const date = new Date(jaar, maand, 1);
    return date.getDay() === 0 ? 0 : date.getDay() - 1;
  };

  return (
    <div className="mx-16 mb-16">
      <div className="grid grid-cols-7">
        {dagen.map((weekdag) => (
          <div
            className="text-center font-bold border-2 border-black"
            key={weekdag}
          >
            {weekdag}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {[...Array(calculateFirstDay())].map((dag, index) => (
          <Dag key={index + 1} dag={index + 1} previousMonth />
        ))}
        {[...Array(aantalDagenPerMaand[maand])].map((dag, index) => (
          <Dag
            key={index + 1}
            dag={index + 1}
            maand={maand}
            jaar={jaar}
            eventsForDay={eventsForDay}
          />
        ))}
      </div>
    </div>
  );
}
