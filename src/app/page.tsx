'use client';

import Header from '@/components/Header';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';
import LeadCapture from '@/components/LeadCapture';
import styles from './page.module.css';
import { Bot, Zap, Globe, Rocket, Shield, ArrowRight, TrendingUp, Target, Terminal, BookOpen, ChevronRight } from 'lucide-react';
import TrustedBy from '@/components/TrustedBy';
import ValueProp from '@/components/ValueProp';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget';
import ResourceFeed from '@/components/ResourceFeed';
import PromptCarousel from '@/components/PromptCarousel';
import MagazineGrid from '@/components/MagazineGrid';
import ROICalculator from '@/components/ROICalculator';
import FAQ from '@/components/FAQ';
import Section from '@/components/Section';
import ProblemSection from '@/components/ProblemSection';
// New Components
import InlineCTA from '@/components/InlineCTA';
import StatsCounter from '@/components/StatsCounter';
import ServicesGrid from '@/components/ServicesGrid';
import AIQuiz from '@/components/AIQuiz';
import IntelligenceBrief from '@/components/IntelligenceBrief';
import TerminalDemo from '@/components/TerminalDemo';
import { motion } from 'framer-motion';

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/lib/prismic";
import { components } from "@/slices";

export default async function Home() {
    const client = createClient();
    const page = await client.getSingle("homepage");

    return (
        <>
            <Header />
            <main className={styles.main}>
                <SliceZone slices={page.data.slices} components={components} />
            </main>
            <Footer />
        </>
    );
}

export async function generateMetadata() {
    const client = createClient();
    const page = await client.getSingle("homepage");

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}
