function LandingStatsCard() {
  return (
      <div style={{top: '-120px'}} className="flex flex-col md:flex-row gap-4 shadow-lg m-4 py-10 relative bg-white">
          <div className="px-8 flex-1">
              <div className="text-center flex flex-col gap-4">
                  <h2 className='text-5xl text-primary'>93%</h2>
                  <p className="uppercase text-gray text-sm">Of companies don't knwow the average salaries of the market</p>
                </div>   
            </div>
          <div style={{ borderLeft: '0.3px solid #6c757d', borderRight: '0.3px solid #6c757d' }} className="px-8 flex-1">
              <div className="text-center flex flex-col gap-4">
                  <h2 className='text-5xl text-primary'>No.1</h2>
                  <p className="uppercase text-gray text-sm">AIBEST offers the best solution for tracking the employees salaries</p>
                 </div>
            </div>
            <div className="px-8 flex-1">
              <div className="text-center flex flex-col gap-4">
                  <h2  className='text-5xl text-primary'>134</h2>
                  <p className="uppercase text-gray text-sm">Happy Global Customers </p>
                 </div>
            </div>
    </div>
  )
}

export default LandingStatsCard