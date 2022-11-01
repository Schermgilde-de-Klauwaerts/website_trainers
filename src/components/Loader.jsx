export default function Loader({ loading }) {
  if (loading) {
    return (
      <className>
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading...</p>
      </className>
    );
  }

  return null;
}
