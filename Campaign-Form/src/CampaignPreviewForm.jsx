export default function CampaignPreviewForm({ campaign }) {
    return (
        <div className="preview">
            <h3>Campaign Preview</h3>

            <div className="preview-item">
                <strong>Title</strong>
                <span>{campaign.title}</span>
            </div>

            <div className="preview-item">
                <strong>Description</strong>
                <span>{campaign.description}</span>
            </div>

            <div className="preview-item">
                <strong>Goal</strong>
                <span>{campaign.goalAmount}</span>
            </div>

            <div className="preview-item">
                <strong>Deadline</strong>
                <span>{campaign.deadline}</span>
            </div>

            <div className="preview-item">
                <strong>Owner</strong>
                <span>{campaign.owner}</span>
            </div>

            <div className="preview-item">
                <strong>Email</strong>
                <span>{campaign.ownerEmail}</span>
            </div>
        </div>

    )
}