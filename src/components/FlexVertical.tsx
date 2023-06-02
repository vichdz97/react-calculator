import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function FlexVertical({ children }: Props) {
    return (
        <div className="d-flex flex-column">{children}</div>
    )
}

export default FlexVertical