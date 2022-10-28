const Training = ({ trainer, dag, datum, startuur, einduur }) => {
  return (
    <div className="border bg-slate-100 my-2">
      <div className="">
        <h5 className="">{trainer}</h5>
        <h5 className="">{dag}</h5>
        <h5 className="">{datum}</h5>
        <h5 className="">{startuur}</h5>
        <h5 className="">{einduur}</h5>
      </div>
    </div>
  );
};

export default Training;
