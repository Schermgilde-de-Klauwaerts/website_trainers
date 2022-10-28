export default function Maand({ maand, dagen }) {
  return (
    <div className="mx-16">
      <h1 className="text-3xl text-center font-bold underline mb-10">
        {maand}
      </h1>
      <div className="grid grid-cols-7">
        {dagen.map((dag) => (
          <div className="text-center font-bold border-2 border-black">
            {dag}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {dagen.map((dag) => (
          <div className="text-center font-bold border-2 border-black h-36"></div>
        ))}
        {dagen.map((dag) => (
          <div className="text-center font-bold border-2 border-black h-36"></div>
        ))}
        {dagen.map((dag) => (
          <div className="text-center font-bold border-2 border-black h-36"></div>
        ))}
        {dagen.map((dag) => (
          <div className="text-center font-bold border-2 border-black h-36"></div>
        ))}
      </div>
    </div>
  );
}
