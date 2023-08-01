import Countdown from 'react-countdown';
import { SalePhase } from '../../hook';
import './style.css';

const ReactCountdown = Countdown as any;

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: SalePhase;
  onComplete?: () => void;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
}) => {
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    if (completed) {
          return (
            <div className="countdown-timer-wrapper">
                <span className="timer-text">{getText()}</span>
            </div>
          )
    } else {
      return (
          <div className="countdown-timer-wrapper">
            <span className="timer-text">{getText()}</span>
            <div className="countdown-timer">
                <div className="timer-item-view">
                    <span className="time-number">
                    {days < 10 ? `0${days}` : days}
                    </span>
                    <span className="label">d</span>
                </div>
                <div className="timer-item-view">
                    <span className="time-number">
                    {hours < 10 ? `0${hours}` : hours}
                    </span>
                    <span className="label">h</span>
                </div>
                <div className="timer-item-view">
                    <span className="time-number">
                    {minutes < 10 ? `0${minutes}` : minutes}
                    </span>
                    <span className="label">m</span>
                </div>
            </div>
        </div>
      );
    }
  };

  const getText = () => {
    switch(status) {
        default:
            return 'Sale is live!';
    }
  };

  if (date) {
    return (
      <ReactCountdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return <></>;
  }
};