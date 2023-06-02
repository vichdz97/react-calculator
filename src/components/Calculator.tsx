import "../App.css";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function Calculator({ children }: Props) {
    return (
        <div className="calculator m-3 p-2 border rounded shadow bg-primary">{children}</div>
    )
}

export default Calculator