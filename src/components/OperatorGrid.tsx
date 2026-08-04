import "../App.css";
import Operator from "./Operator";

interface Props {
    logOperator: (str: string) => void;
    logResult: () => void;
}

function OperatorGrid({ logOperator, logResult }: Props) {
    return (
        <div id="operators" className="container w-25">
            <div className="row row-cols-1">
                <div className="col"><Operator onClick={() => logOperator("/")}>/</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("*")}>*</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("-")}>-</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("+")}>+</Operator></div>
                <div className="col"><Operator className="operator" onClick={logResult}>=</Operator></div>
            </div>
        </div>
    )
}

export default OperatorGrid