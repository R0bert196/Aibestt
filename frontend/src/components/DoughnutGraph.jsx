import GraphHeader from "./GraphHeader"

function DoughnutGraph() {
    return (
      <div className="w-2/4 mx-4"> 
            <GraphHeader title={'Employees Distribution'} />
            <div style={{ borderBottom: '1px solid #e3e6f0', borderLeft: '1px solid #e3e6f0', borderRight: '1px solid #e3e6f0' }} className="rounded-b-md bg-white h-80">

            </div>
      </div>
  )
}

export default DoughnutGraph