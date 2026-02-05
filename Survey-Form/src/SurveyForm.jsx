import SurveyInputForm from "./SurveyInputForm";
import SurveyPreview from "./SurveyPreview";
import { useState } from "react";

export default function SurveyForm() {
    const [formData, setFormData] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    function handleChange(name, value) {
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="container">
            <h2>Campus Placement Hiring Details</h2>
            {!showPreview && !submitted && (
                <>
                    <SurveyInputForm onChange={handleChange} />
                    <button onClick={() => setShowPreview(true)}>Show Preview</button>
                    <button onClick={() => setSubmitted(true)}>Submit</button>
                </>
            )}

            {showPreview && (
                <SurveyPreview
                    data={formData}
                    onBack={() => setShowPreview(false)}
                />
            )}

            {submitted && <h3>Survey Form Submitted Successfully</h3>}
        </div>
    );
}
