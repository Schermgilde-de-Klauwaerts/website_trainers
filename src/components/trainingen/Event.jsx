function Training({ soort, datum, startuur, einduur }) {
  return (
    <div className="border bg-slate-100 my-2 p-2">
      <p className="">
        {soort}: {datum}
      </p>
      <p className="italic">
        {startuur} - {einduur}
      </p>
    </div>
  );
}

function Wedstrijd({ soort, notities }) {
  return (
    <div className="border bg-slate-100 my-2 p-2">
      <p className="">{soort}:</p>
      <p className="italic">{notities}</p>
    </div>
  );
}

const Event = ({ soort, datum, startuur, einduur, notities }) => {
  return (
    <>
      {soort === "Training" ? (
        <Training
          soort={soort}
          datum={datum}
          startuur={startuur}
          einduur={einduur}
        />
      ) : (
        <Wedstrijd soort={soort} notities={notities} />
      )}
    </>
  );
};

export default Event;
