import PropTypes from 'prop-types'

interface ITimeDisplayProps {
  timeSet: number
  timeElapsed: number
}
export default function TimeDisplay({ timeSet, timeElapsed }: ITimeDisplayProps) {
  const remainingTime = timeSet - timeElapsed
  const minutes = remainingTime > 60 ? Math.floor(remainingTime/60) : 0
  const seconds = remainingTime > 60 ? remainingTime % 60 : remainingTime
  return (<div>
    <div>Time</div>
    <div>{`${minutes > 9 ? minutes : "0".concat(minutes.toString())}:${seconds > 9 ? seconds : (seconds > 0 ? "0".concat(seconds.toString()) : '00')}`}</div>
  </div>)
}

TimeDisplay.propTypes = {
  timeSet: PropTypes.number.isRequired,
  timeElapsed: PropTypes.number.isRequired
}