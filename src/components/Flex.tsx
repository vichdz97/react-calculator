import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

function Flex({ children }: Props) {
    return (
        <div className="d-flex justify-content-center align-items-center">{children}</div>
    )
}

export default Flex