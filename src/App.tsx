import { format } from "mathjs";
import { useState } from "react";
import Display from "./components/Display";
import NumberGrid from "./components/NumberGrid";
import OperatorGrid from "./components/OperatorGrid";
import Calculator from "./components/Calculator";
import Flex from "./components/Flex";
import FlexVertical from "./components/FlexVertical";
import MiscRow from "./components/MiscRow";

function App() {
  	const [currentValue, setCurrentValue] = useState("");
  	const [calcString, setCalcString] = useState("");

	const ops = ["+", "-", "*", "/"];
	const LAST_VALUE = calcString.slice(-1);

	const calculator = document.querySelector('.calculator');
	const width = document.body.offsetWidth - (calculator?.clientWidth || 0);
	calculator?.setAttribute('style', `width: ${width}px`);

	const displayCalc = (value: string) => {
		if (ops.includes(value) && (calcString === "" || ops.includes(LAST_VALUE))) return;

		if (value.includes(".") && (calcString === "" || ops.includes(LAST_VALUE))) {
			setCalcString(calcString + "0.");
			return;
		}
		
		if (!ops.includes(value)) {
			setCurrentValue(eval(calcString + value).toString());
		}

		setCalcString(calcString + value);
	}

	const calcResult = () => {
		if (calcString === "" || ops.includes(LAST_VALUE)) return;
		setCalcString(format(eval(calcString)));
		setCurrentValue("");
	}

	const allClear = () => {
		setCurrentValue("");
		setCalcString("");
	}

	const deleteLastValue = () => {
		let value = calcString.slice(0, -1);
		if (!value) {
			allClear();
			return;
		} 

		setCalcString(value);

		if (ops.includes(value.slice(-1)) && value) {
			value = value.slice(0, -1);
		}

		setCurrentValue(eval(value).toString());
	}

	const changeSign = () => {
		if (!calcString) return;
		if(!ops.includes(LAST_VALUE)) {
			let num = -eval(calcString);
			setCalcString(num.toString());
			setCurrentValue("");
		}
	}

	const changeToPercent = () => {
		if (calcString === "") return;
		if (!ops.includes(LAST_VALUE)) {
			let percentage = eval(calcString) / 100;
			setCalcString(percentage.toString());
			setCurrentValue(""); 
		}
	}

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<h1>My React Calculator</h1>
			<Calculator>
				<Display result={currentValue} numString={calcString} />
				<Flex>
					<FlexVertical>
						<MiscRow clearLog={allClear} clearValue={deleteLastValue} logSign={changeSign} logPercent={changeToPercent} />
						<NumberGrid logNumber={displayCalc}/>
					</FlexVertical>
					<OperatorGrid logOperator={displayCalc} logResult={calcResult}/>
				</Flex>
			</Calculator>
    	</div>
  	)
}

export default App
