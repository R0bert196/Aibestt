

function GraphHeader({title}) {
  return (
      <div style={{ backgroundColor: '#f8f9fc', border: '1px solid #e3e6f0' }} className="p-2 rounded-t-md outline-2 text-primary font-bold ">
          <h6>{ title }</h6>
      </div>
  )
}

export default GraphHeader