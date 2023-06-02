interface Props {
    children: string;
    className?: string;
    onClick: () => void;
}

function Operator({ children, className, onClick }: Props) {
    return (
        <button className={"btn btn-danger w-100 m-1 " + className} onClick={onClick}>{children}</button>
    )
}

export default Operator