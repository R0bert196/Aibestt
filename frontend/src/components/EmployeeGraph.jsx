function EmployeeGraph() {
    return (
        <div>
            <div style={{ backgroundColor: '#f8f9fc', border: '1px solid #e3e6f0'}} className="p-2 rounded-t-md outline-2 text-primary font-bold ">
                <h6>Employee Overview</h6>
            </div>
            <div style={{ borderBottom: '1px solid #e3e6f0', borderLeft: '1px solid #e3e6f0', borderRight: '1px solid #e3e6f0'}} className="rounded-b-md bg-white h-80">
                <canvas id="lineCanvas1" width="795" height="396" style={{ display: 'block', boxSizing: 'border-box', height: '198px', width: '397.5px'}}></canvas>
            </div>
        </div>
    
  )
}

export default EmployeeGraph