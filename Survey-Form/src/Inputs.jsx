export default function Inputs({ label, type, name, options = [], onChange }) {
    return (
        <div className="field">
            <label htmlFor={name}>{label}</label>

            {type === 'textarea' && (
                <textarea
                    id={name}
                    onChange={e => onChange(name, e.target.value)}
                />
            )}

            {type === 'select' && (
                <select
                    id={name}
                    defaultValue=""
                    onChange={e => onChange(name, e.target.value)}
                >
                    <option value="" disabled>-- Select an option --</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            )}

            {type !== 'textarea' && type !== 'select' && (
                <input
                    id={name}
                    type={type}
                    onChange={e => onChange(name, e.target.value)}
                />
            )}
        </div>
    )
}
