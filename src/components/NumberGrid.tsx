import Number from './Number';

interface Props {
    logNumber: (numStr: string) => void;
}

function NumberGrid({ logNumber }: Props) {
    return (
		<div className="container numbers">
				<div className="row row-cols-3">
					<div className="col"><Number onClick={logNumber}>7</Number></div>
					<div className="col"><Number onClick={logNumber}>8</Number></div>
					<div className="col"><Number onClick={logNumber}>9</Number></div>
					<div className="col"><Number onClick={logNumber}>4</Number></div>
					<div className="col"><Number onClick={logNumber}>5</Number></div>
					<div className="col"><Number onClick={logNumber}>6</Number></div>
					<div className="col"><Number onClick={logNumber}>1</Number></div>
					<div className="col"><Number onClick={logNumber}>2</Number></div>
					<div className="col"><Number onClick={logNumber}>3</Number></div>
					<div className="col-8"><Number onClick={logNumber}>0</Number></div>
					<div className="col"><Number onClick={logNumber}>.</Number></div>
				</div>
		</div>
	)
}

export default NumberGrid