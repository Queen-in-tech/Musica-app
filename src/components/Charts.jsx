import Chart from "./Chart"

const Charts = ({charts}) => {
  return (
    <div className="mt-10 lg:mt-0 lg:ml-5">
      <p className="text-2xl font-bold text-white mb-4">Top charts</p>
      <div className="flex lg:flex-col gap-8 lg:gap-0 shrink-0 overflow-x-scroll lg:overflow-hidden">
      {charts.map((chart) => {
        return <Chart chart= {chart} key={chart.id}/>
      })
      }
      </div>
    </div>
  )
}

export default Charts
