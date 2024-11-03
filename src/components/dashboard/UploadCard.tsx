import { Download } from 'lucide-react';

export function UploadCard() {
  const handleDownload = () => {
    // Create sample RFP template data
    const template = `RFP Response Template

1. Executive Summary
-------------------
[Company Name] Response to [Client Name]'s Request for Proposal
Date: ${new Date().toLocaleDateString()}

2. Company Overview
------------------
- Company Background
- Core Competencies
- Relevant Experience

3. Solution Overview
-------------------
- Proposed Solution
- Technical Approach
- Implementation Timeline

4. Pricing Structure
-------------------
- Cost Breakdown
- Payment Terms
- Additional Services

5. Team Structure
----------------
- Project Team
- Roles and Responsibilities
- Communication Plan

6. References
------------
- Client References
- Case Studies
- Testimonials`;

    // Create and trigger download
    const blob = new Blob([template], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rfp-template.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div 
      onClick={handleDownload}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Download className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Download Template</h3>
        </div>
      </div>
      <p className="text-gray-600 text-sm">
        Download our RFP template to get started with your response
      </p>
    </div>
  );
}