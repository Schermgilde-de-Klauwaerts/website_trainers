function Training({ data }) {
  const { datum, startuur, einduur } = data;
  const dag = datum.split("-")[2];
  const maand = datum.split("-")[1];
  const jaar = datum.split("-")[0];

  return (
    <div className="border bg-slate-100 my-2 py-2 px-4">
      <p className="">
        Training: {dag}/{maand}/{jaar}
      </p>
      <p className="italic">
        {startuur} - {einduur}
      </p>
    </div>
  );
}

function Wedstrijd({ data }) {
  const { naam, functie, locatie } = data;
  return (
    <div className="border bg-slate-100 my-2 py-2 px-4">
      <p className="">
        {naam} ({locatie})
      </p>
      <p className="italic">{functie}</p>
    </div>
  );
}

const Event = ({ ...props }) => {
  return (
    <>
      {props.hasOwnProperty("startuur") ? (
        <Training data={props} />
      ) : (
        <Wedstrijd data={props} />
      )}
    </>
  );
};

export default Event;
