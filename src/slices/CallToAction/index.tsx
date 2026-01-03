'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import InlineCTA from '@/components/InlineCTA';
import LeadCapture from '@/components/LeadCapture';
import Section from '@/components/Section';

export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

const CallToActionSlice = ({ slice }: CallToActionProps) => {
    const variant = slice.primary.variant as 'audit' | 'consultation' | 'newsletter' | 'lead_capture';

    if (variant === 'lead_capture') {
        return <LeadCapture />;
    }

    // Wrap InlineCTA in a Section to match page layout if needed, or just return it.
    // Based on page.tsx, InlineCTA is usually inside a Section.
    // We will render Section wrapper here to be safe.
    return (
        <Section theme="dark">
            <InlineCTA variant={variant} />
        </Section>
    );
};

export default CallToActionSlice;
