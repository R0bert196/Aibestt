import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IndicatorCard({ text, number, icon, height, color }) {
  return (
    <div
      style={{ border: "1px solid #e3e6f0", height: height }}
      className='bg-white mb-6 py-6 px-4 rounded-lg flex justify-center align-center font-bold'
    >
      <div>
        <div className='flex-1 w-9/12 mr-2 mb-2 text-primary text-xs'>
          <span style={{ color: `${color}` }}>{text}</span>
        </div>
        <div className='font-bold text-lg'>
          <span>{number}</span>
        </div>
      </div>
      <div className='mt-6'>
        <FontAwesomeIcon
          style={{ color: "#dddfeb" }}
          icon={icon}
          className='text-2xl'
        />
      </div>
    </div>
  );
}

export default IndicatorCard;
