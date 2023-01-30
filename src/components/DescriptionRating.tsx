/**
 * DescriptionRating contains the component to display the difficulty and course quality for the description section.
 */
const DescriptionRating = ({attribute, color, percentage} : any) => (
  <div className="col-span-6 px-4 hover:bg-zinc-300 duration-300 rounded-sm">
    <div className="text-center font-bold">{Math.round(attribute * 10) / 10}</div>
    <div className=" bg-gray-400 rounded-full h-2.5">
      <div
        style={{ backgroundColor: color,
          width: `${percentage}%` }}
        className="h-2.5 duration-500 rounded-full"
      ></div>
    </div>
    <div className="text-center">Quality</div>
  </div>
)

export default DescriptionRating