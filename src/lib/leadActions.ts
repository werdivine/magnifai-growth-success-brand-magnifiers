'use server';

// Lead capture action - stores leads and can be expanded to email services
export interface LeadData {
    email: string;
    source: string;
    data?: Record<string, unknown>;
    timestamp: string;
}

// In production, this would connect to your email service (ConvertKit, Mailchimp, etc.)
// For now, we'll return success and the client will store in localStorage
export async function captureLeadAction(leadData: LeadData): Promise<{ success: boolean; message: string }> {
    try {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(leadData.email)) {
            return { success: false, message: 'Invalid email format' };
        }

        // Log for now - in production, send to email service
        console.log('📧 New Lead Captured:', {
            email: leadData.email,
            source: leadData.source,
            timestamp: leadData.timestamp,
            data: leadData.data
        });

        // TODO: Integrate with email service
        // await sendToConvertKit(leadData);
        // await sendToMailchimp(leadData);

        return { success: true, message: 'Lead captured successfully!' };
    } catch (error) {
        console.error('Lead capture error:', error);
        return { success: false, message: 'Failed to capture lead' };
    }
}

// Helper to get stored leads (for admin purposes)
export async function getLeadsBySource(source: string): Promise<LeadData[]> {
    // In production, fetch from database
    return [];
}
