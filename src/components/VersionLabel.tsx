interface Props {
    version: string;
    setVersion: (value: string) => void;
}

function VersionLabel({ version, setVersion }: Props) {
    return (
        <div className="d-flex flex gap-1 absolute bottom-0 right-0 m-2 text-secondary">
            <label htmlFor="versions">Version:</label>
            <select id="versions" name="versions" value={version} onChange={(e) => setVersion(e.target.value)}>
                <option value="v1" disabled={version === "v1"}>v1.0</option>
                <option value="v2" disabled={version === "v2"}>v2.0</option>
            </select>
        </div>
    );
}

export default VersionLabel;