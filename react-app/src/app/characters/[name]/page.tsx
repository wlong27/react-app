export default function CharacterDetailsPage({
  params,
}: {
  params: { name: string };
}) {
  const name = decodeURIComponent(params.name);
  return (
    <div>
      <h1>Character Details: {name}</h1>
    </div>
  );
}
