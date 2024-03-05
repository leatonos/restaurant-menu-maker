export default function Restaurant({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Restaurant ID: {params.id}</h1>
        </div>
        )
  }