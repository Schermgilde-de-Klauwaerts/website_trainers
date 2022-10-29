const Event = ({ soort, trainer, datum, startuur, einduur, notities }) => {
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
};

export default Event;
