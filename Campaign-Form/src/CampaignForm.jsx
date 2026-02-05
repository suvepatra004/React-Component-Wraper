import { useState } from "react";
import CampaignInputForm from "./CampaignInputForm";
import CampaignPreviewForm from "./CampaignPreviewForm";

export default function CampaignForm() {
    const [showPreview, setShowPreview] = useState(false);
    const [campaign, setCampaign] = useState({
        title: '',
        description: '',
        goalAmount: '',
        deadline: '',
        owner: '',
        ownerEmail: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCampaign(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleClickButton = () => {
        setShowPreview(true);
    }

    return (
        <div>
            <h1>Create Campaign</h1>

            <CampaignInputForm onChange={handleChange} campaign={campaign} />

            <button type="button" onClick={handleClickButton}>Show Campaign Preview</button>
            {/* Conditional Rendering */}
            {showPreview && <CampaignPreviewForm campaign={campaign} />}

        </div>
    )

}