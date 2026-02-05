export default function CampaignInputForm({ campaign, onChange }) {
    return (
        <div className="container">
            <form action="submit">
                <input
                    name="title"
                    placeholder="Enter Campaign Title"
                    value={campaign.title}
                    onChange={onChange}
                />
                <textarea
                    name="description"
                    placeholder="Enter Campaign Description"
                    value={campaign.description}
                    onChange={onChange}
                />
                <input
                    type="number"
                    name="goalAmount"
                    placeholder="Enter goal amount"
                    value={campaign.goalAmount}
                    onChange={onChange}
                />
                <input
                    type="date"
                    name="deadline"
                    placeholder="Enter Campaign Title"
                    value={campaign.deadline}
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="owner"
                    placeholder="Owner"
                    value={campaign.owner}
                    onChange={onChange}
                />
                <input
                    type="email"
                    name="ownerEmail"
                    placeholder="Email"
                    value={campaign.ownerEmail}
                    onChange={onChange}
                />
            </form>
        </div>
    );
}