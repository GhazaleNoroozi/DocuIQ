import { useState } from "react";

type SummaryProps = {
    summary: string;
};

function Summary({ summary }: SummaryProps) {
    const [summaryOpen, setSummaryOpen] = useState(true);

    return (
        <section className="document-section summary">
            <div className="section-header">
                <h2>Summary</h2>

                <button onClick={() => setSummaryOpen(!summaryOpen)}>
                    {summaryOpen ? "Collapse" : "Expand"}
                </button>
            </div>

            {summaryOpen && (
                <div className="section-content">
                    <p>{summary}</p>
                </div>
            )}
        </section>
    );
}

export default Summary;