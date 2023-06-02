import Operator from "./Operator";

interface Props {
    logOperator: (str: string) => void;
    logResult: () => void;
}

function OperatorGrid({ logOperator, logResult }: Props) {
    return (
        <div className="container w-25 operators">
            <div className="row row-cols-1">
                <div className="col"><Operator onClick={() => logOperator("/")}>&divide;</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("*")}>&times;</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("-")}>-</Operator></div>
                <div className="col"><Operator onClick={() => logOperator("+")}>+</Operator></div>
                <div className="col"><Operator onClick={logResult}>=</Operator></div>
            </div>
        </div>
    )
}

export default OperatorGrid