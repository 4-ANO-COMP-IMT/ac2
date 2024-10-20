export function ReviewCard(props: {
  img: string
  review: string
  name: string
  position: string
}) {
  return (
    <div className="flex h-auto w-80 flex-col items-center justify-center gap-2 rounded-2xl bg-blue-secondary px-6 py-6 shadow-lg shadow-blue-primary">
      <img src={props.img} alt="Bruno Vilardi" className="w-2/5 rounded-full" />
      <p className="text-wrap text-white">{props.review}</p>
      <div>
        <p className="text-black">{props.name}</p>
        <p className="text-blue-500">{props.position}</p>
      </div>
    </div>
  )
}
