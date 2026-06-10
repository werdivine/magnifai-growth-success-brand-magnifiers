/**
 * Local Slice Types for Prismic Slices
 * These types define the structure of slice data used in the Prismic CMS integration.
 * Generated locally to avoid Slice Machine sync dependency.
 */

import type * as prismic from "@prismicio/client";

// Base slice type with variation included
interface SliceWithVariation<
    TSliceType extends string,
    TPrimary extends Record<string, unknown>,
    TItem extends Record<string, unknown>
> {
    id: string;
    slice_type: TSliceType;
    slice_label: string | null;
    variation: string;
    version: string;
    primary: TPrimary;
    items: TItem[];
}

// =====================================================
// HERO SLICE
// =====================================================
interface HeroSlicePrimary {
    badge_text?: prismic.KeyTextField;
    title?: prismic.RichTextField;
    description?: prismic.RichTextField;
    primary_cta_label?: prismic.KeyTextField;
    primary_cta_link?: prismic.LinkField;
    secondary_cta_label?: prismic.KeyTextField;
    secondary_cta_link?: prismic.LinkField;
}

export type HeroSlice = SliceWithVariation<"hero", HeroSlicePrimary, Record<string, never>>;

// =====================================================
// BENTO GRID SLICE
// =====================================================
interface BentoGridSlicePrimary {
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface BentoGridSliceItem {
    icon_name?: prismic.KeyTextField;
    item_title?: prismic.KeyTextField;
    item_description?: prismic.KeyTextField;
    span?: number;
}

export type BentoGridSlice = SliceWithVariation<"bento_grid", BentoGridSlicePrimary, BentoGridSliceItem>;

// =====================================================
// SERVICES SLICE
// =====================================================
interface ServicesSlicePrimary {
    eyebrow?: prismic.KeyTextField;
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface ServicesSliceItem {
    icon_name?: prismic.KeyTextField;
    title?: prismic.KeyTextField;
    description?: prismic.KeyTextField;
    link_label?: prismic.KeyTextField;
    link_url?: prismic.LinkField;
}

export type ServicesSlice = SliceWithVariation<"services", ServicesSlicePrimary, ServicesSliceItem>;

// =====================================================
// TRUSTED BY SLICE
// =====================================================
interface TrustedBySlicePrimary {
    title?: prismic.KeyTextField;
}

interface TrustedBySliceItem {
    company_name?: prismic.KeyTextField;
    logo?: prismic.ImageField;
}

export type TrustedBySlice = SliceWithVariation<"trusted_by", TrustedBySlicePrimary, TrustedBySliceItem>;

// =====================================================
// TESTIMONIALS SLICE
// =====================================================
interface TestimonialsSlicePrimary {
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface TestimonialsSliceItem {
    quote?: prismic.KeyTextField;
    author_name?: prismic.KeyTextField;
    author_title?: prismic.KeyTextField;
    author_image?: prismic.ImageField;
    company?: prismic.KeyTextField;
}

export type TestimonialsSlice = SliceWithVariation<"testimonials", TestimonialsSlicePrimary, TestimonialsSliceItem>;

// =====================================================
// FAQ SLICE
// =====================================================
interface FAQSlicePrimary {
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface FAQSliceItem {
    question?: prismic.KeyTextField;
    answer?: prismic.RichTextField;
}

export type FAQSlice = SliceWithVariation<"faq", FAQSlicePrimary, FAQSliceItem>;

// =====================================================
// STATS COUNTER SLICE
// =====================================================
interface StatsCounterSlicePrimary {
    title?: prismic.KeyTextField;
}

interface StatsCounterSliceItem {
    value?: prismic.KeyTextField;
    label?: prismic.KeyTextField;
    suffix?: prismic.KeyTextField;
    prefix?: prismic.KeyTextField;
}

export type StatsCounterSlice = SliceWithVariation<"stats_counter", StatsCounterSlicePrimary, StatsCounterSliceItem>;

// =====================================================
// CALL TO ACTION SLICE
// =====================================================
interface CallToActionSlicePrimary {
    title?: prismic.KeyTextField;
    description?: prismic.KeyTextField;
    cta_label?: prismic.KeyTextField;
    cta_link?: prismic.LinkField;
    secondary_cta_label?: prismic.KeyTextField;
    secondary_cta_link?: prismic.LinkField;
    variant?: prismic.KeyTextField; // 'audit' | 'consultation' | 'newsletter' | 'lead_capture'
}

export type CallToActionSlice = SliceWithVariation<"call_to_action", CallToActionSlicePrimary, Record<string, never>>;

// =====================================================
// INTERACTIVE COMPONENT SLICE
// =====================================================
interface InteractiveComponentSlicePrimary {
    component?: prismic.KeyTextField; // 'roi_calculator' | 'ai_quiz' | 'prompt_carousel' | 'magazine_grid' | 'resource_feed' | 'intelligence_brief'
    component_type?: prismic.KeyTextField; // Deprecated: use component
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
    title_override?: prismic.KeyTextField;
}

export type InteractiveComponentSlice = SliceWithVariation<"interactive_component", InteractiveComponentSlicePrimary, Record<string, never>>;

// =====================================================
// VALUE PROP SLICE
// =====================================================
interface ValuePropSlicePrimary {
    eyebrow?: prismic.KeyTextField;
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface ValuePropSliceItem {
    icon_name?: prismic.KeyTextField;
    title?: prismic.KeyTextField;
    description?: prismic.KeyTextField;
}

export type ValuePropSlice = SliceWithVariation<"value_prop", ValuePropSlicePrimary, ValuePropSliceItem>;

// =====================================================
// PROBLEM SECTION SLICE
// =====================================================
interface ProblemSectionSlicePrimary {
    eyebrow?: prismic.KeyTextField;
    title?: prismic.KeyTextField;
    subtitle?: prismic.KeyTextField;
}

interface ProblemSectionSliceItem {
    problem?: prismic.KeyTextField;
    icon_name?: prismic.KeyTextField;
}

export type ProblemSectionSlice = SliceWithVariation<"problem_section", ProblemSectionSlicePrimary, ProblemSectionSliceItem>;

// =====================================================
// ALL SLICES UNION TYPE
// =====================================================
export type AllSlices =
    | HeroSlice
    | BentoGridSlice
    | ServicesSlice
    | TrustedBySlice
    | TestimonialsSlice
    | FAQSlice
    | StatsCounterSlice
    | CallToActionSlice
    | InteractiveComponentSlice
    | ValuePropSlice
    | ProblemSectionSlice;

// =====================================================
// MODULE AUGMENTATION FOR @prismicio/client
// =====================================================
declare module "@prismicio/client" {
    namespace Content {
        export type {
            HeroSlice,
            BentoGridSlice,
            ServicesSlice,
            TrustedBySlice,
            TestimonialsSlice,
            FAQSlice,
            StatsCounterSlice,
            CallToActionSlice,
            InteractiveComponentSlice,
            ValuePropSlice,
            ProblemSectionSlice,
            AllSlices,
        };
    }
}

