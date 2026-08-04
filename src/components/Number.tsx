interface Props {
    children: string;
    onClick: (numStr: string) => void;
}

function Number({ children, onClick }: Props) {
	return (
  		<button className="btn btn-light w-100 m-1" onClick={() => onClick(children)}>{children}</button>
  	)
}

export default Number