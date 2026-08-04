import { round, format } from "mathjs";
import { useEffect, useState } from "react";
import Display from "./components/Display";
import NumberGrid from "./components/NumberGrid";
import OperatorGrid from "./components/OperatorGrid";
import Calculator from "./components/Calculator";
import Flex from "./components/Flex";
import FlexVertical from "./components/FlexVertical";
import MiscRow from "./components/MiscRow";
import { useNavigate } from "react-router-dom";
import VersionLabel from "./components/VersionLabel";

function App() {
    const navigate = useNavigate();

  	const [currentValue, setCurrentValue] = useState("");
  	const [calcString, setCalcString] = useState("");
	const [justCalculated, setJustCalculated] = useState(false);
    const [version, setVersion] = useState<string>("v1");

	const ops = ["+", "-", "*", "/"];
	const LAST_VALUE = calcString.slice(-1);

    useEffect(() => {
        if (version === "v1") {
            navigate("/v1");
            import("bootstrap/dist/css/bootstrap.css");
        }
        else {
            navigate("/v2");
            import("./index.css");
        }
    }, [version]);

	const displayCalc = (value: string) => {
		if (ops.includes(value) && (calcString === "" || ops.includes(LAST_VALUE))) return;

		if (justCalculated && calcString !== "" && !ops.includes(value)) {
			setCalcString(value);
			setCurrentValue(value);
			setJustCalculated(false);
			return;
		}

		if (value.includes(".") && (calcString === "" || ops.includes(LAST_VALUE))) {
			setCalcString(calcString + "0.");
			setJustCalculated(false);
			return;
		}
		
		if (!ops.includes(value)) {
			setCurrentValue(round(eval(calcString + value), 6));
		}

		setCalcString(calcString + value);

		setJustCalculated(false);
	}

	const calcResult = () => {
		if (calcString === "" || ops.includes(LAST_VALUE)) return;
		if (!justCalculated) {
			setCalcString(format(currentValue));
			setCurrentValue("");
			setJustCalculated(true);
		}
	}

	const allClear = () => {
		setCurrentValue("");
		setCalcString("");
		setJustCalculated(false);
	}

	const deleteLastValue = () => {
		let value = calcString.slice(0, -1);
		if (!value) {
			allClear();
			return;
		} 

		setCalcString(value);

		if (value && ops.includes(value.slice(-1))) {
			value = value.slice(0, -1);
		}

		setCurrentValue(round(eval(value), 6));

		setJustCalculated(false);
	}

	const changeSign = () => {
		if (!calcString) return;
		if(!ops.includes(LAST_VALUE)) {
			let num = -eval(calcString);
			setCalcString(num.toString());
			setCurrentValue("");
			setJustCalculated(false);
		}
	}

	const changeToPercent = () => {
		if (calcString === "") return;
		if (!ops.includes(LAST_VALUE)) {
			let percentage = eval(calcString) / 100;
			setCalcString(percentage.toString());
			setCurrentValue(""); 
			setJustCalculated(false);
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
                        <NumberGrid logNumber={displayCalc} />
                    </FlexVertical>
                    <OperatorGrid logOperator={displayCalc} logResult={calcResult} />
                </Flex>
            </Calculator>
            <VersionLabel version={version} setVersion={setVersion} />
        </div>
    );
}

export default App;