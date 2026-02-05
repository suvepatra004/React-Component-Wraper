import Inputs from "./Inputs";

export default function SurveyInputForm({ onChange }) {
    return (
        <>
            <Inputs
                onChange={onChange}
                type="text"
                name="Name"
                label="Your legal full name"
            />
            <Inputs
                onChange={onChange}
                type="text"
                name="College"
                label="Your college name"
            />
            <Inputs
                onChange={onChange}
                type="select"
                name="Graduation"
                label="Year of passing"
                options={['2021', '2022', '2023', '2024', '2025', '2026']}
            />
            <Inputs
                onChange={onChange}
                type="select"
                name="Stream"
                label="Your stream"
                options={['B.Sc.', 'B.Com.', 'BBA', 'BA', 'BCA', 'M.Com.', 'MA', 'MBA', 'M.Sc.']}
            />
            <Inputs
                onChange={onChange}
                type="textarea"
                name="Curriculam"
                label="Any extra Curriculam"
            />
            <Inputs
                onChange={onChange}
                type="text"
                name="Grade"
                label="Your Grades [CGPA/Percentage]"
            />
            <Inputs
                onChange={onChange}
                type="text"
                name="Experience"
                label="You have any experiences?"
            />
            <Inputs
                onChange={onChange}
                type="textarea"
                name="Skills"
                label="Define your skillsets"
            />
        </>
    )
}