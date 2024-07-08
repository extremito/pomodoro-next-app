import PropTypes from 'prop-types'

interface ITimeDisplayProps {
  timeSet: number
  timeElapsed: number
}
export default function TimeDisplay({ timeSet, timeElapsed }: ITimeDisplayProps) {
  const remainingTime = timeSet - timeElapsed
  const minutes = remainingTime > 59 ? Math.floor(remainingTime/60) : 0
  const seconds = remainingTime > 59 ? remainingTime % 60 : remainingTime
  return (<div className='flex flex-col flex-auto items-center'>
    <div className='text-3xl'>Time</div>
    <div className='bg-white border-2 border-slate-900 p-1 text-2xl'>{`${minutes > 9 ? minutes : "0".concat(minutes.toString())}:${seconds > 9 ? seconds : (seconds > 0 ? "0".concat(seconds.toString()) : '00')}`}</div>
  </div>)
}

TimeDisplay.propTypes = {
  timeSet: PropTypes.number.isRequired,
  timeElapsed: PropTypes.number.isRequired
}