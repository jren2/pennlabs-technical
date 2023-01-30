/**
 * Rating is a component for the sidebar.
 * This accepts the attribute values and displays the given values with a progress bar.
 */
const Rating = ({widthPercentage, cartPercentage, backgroundColor, attribute} : any) => (
  <div className="my-1 mx-3 py-2 rounded-lg hover:bg-zinc-700 duration-300">
    {/* Display average value */}
    <div className="text-center text-2xl font-bold tracking-wide">{cartPercentage.toFixed(2)}</div>
    <div className="col-span-6 px-4">
      <div className=" bg-gray-400 my-1 rounded-full h-2.5">
        <div
          style={{
            backgroundColor: backgroundColor,
            width: `${widthPercentage}%`,
          }}
          className="h-2.5 duration-500 rounded-full"
        ></div>
      </div>
      <div className="text-center">{attribute}</div>
    </div>
  </div>
)

export default Rating