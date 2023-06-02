interface Props {
    children: string;
    onClick: () => void;
}

function Operator({ children, onClick }: Props) {
    return (
        <button className="btn btn-danger w-100 m-1" onClick={onClick}>{children}</button>
    )
}

export default Operator