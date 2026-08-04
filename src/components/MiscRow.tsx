interface Props {
    clearLog: () => void;
    clearValue: () => void;
    logSign: () => void;
    logPercent: () => void;
}

function MiscRow({ clearLog, clearValue, logSign, logPercent }: Props) {
    return (
        <div id="misc" className="container">
            <div className="row">
                <div className="col-6 col-md-3"><button className="btn btn-info w-100 m-1" onClick={clearLog}>AC</button></div>
                <div className="col-6 col-md-3"><button className="btn btn-info w-100 m-1" onClick={clearValue}>DEL</button></div>
                <div className="col-6 col-md-3"><button className="btn btn-info w-100 m-1" onClick={logSign}>+/-</button></div>
                <div className="col-6 col-md-3"><button className="btn btn-info w-100 m-1" onClick={logPercent}>%</button></div>
            </div>
        </div>
    )
}

export default MiscRow