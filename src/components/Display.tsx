interface Props {
    result: string;
    numString: string;
}

function Display({ result, numString }: Props) {
    return (
        <div className="container p-3">
            <div className="display form-control d-flex align-items-center justify-content-end">
                <span className="mx-1 text-secondary">{result ? `(${result})` : ""}</span>
                <span id="final-result" className="h2 m-0 p-0">{ numString || "0" }</span>
            </div>
        </div>
    )
}

export default Display