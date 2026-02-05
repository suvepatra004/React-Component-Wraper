function SurveyPreview({ data, onBack }) {
    return (
        <>
            {Object.entries(data).map(([key, value]) => (
                <p key={key}>
                    <strong>{key}:</strong> {value}
                </p>
            ))}
            <button onClick={onBack}>Back</button>
        </>
    )
}

export default SurveyPreview
