export default function Training(props) {
  // const trainer = "Jasper";
  // const dag = "vrijdag";
  // const datum = "25/11/2022";
  // const startuur = "19u30";
  // const einduur = "21u30";
  const {trainer, dag, datum, startuur, einduur} = props;
  return <div>{trainer} geeft op {dag} {datum} van {startuur} tot {einduur} training</div>;
}