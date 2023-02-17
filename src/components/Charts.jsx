import Chart from "./Chart"

const Charts = () => {
  return (
    <div className="ml-5">
      <p className="text-2xl font-bold text-white mb-4">Top charts</p>
      <div>
      <Chart image="Rectangle 17.png" title="Golden age of 80s" artist="Sean Swadder" time="2:34:45"/>
      <Chart image="Rectangle 1.png" title="Reggae 'n' blues"  artist="Dj YK mule" time="1:02:42"/>
      <Chart image="Rectangle 17.svg" title="Tomorrow's tunes" artist="Obi Datti" time="2:01:25"/>
      </div>
    </div>
  )
}

export default Charts
