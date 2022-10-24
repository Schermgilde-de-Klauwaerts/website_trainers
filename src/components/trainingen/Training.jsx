const Training = ({trainer, dag, datum, startuur, einduur}) => {
  return (
  <div className="card bg-light border-dark mb-4">
      <div className="card-body">
        <h5 className="card-title">{trainer}</h5>
        <h5 className="card-title">{dag}</h5>
        <h5 className="card-title">{datum}</h5>
        <h5 className="card-title">{startuur}</h5>
        <h5 className="card-title">{einduur}</h5>
      </div>
    </div>
  );
}

export default Training;