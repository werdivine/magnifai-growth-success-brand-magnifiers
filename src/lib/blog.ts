import fs from 'fs';
import path from 'path';
import { BLOG_POSTS as STATIC_POSTS, BlogPost } from '@/data/blogPosts';

const BLOG_JSON_PATH = path.join(process.cwd(), 'src/data/blog.json');

export function getBlogPosts(): BlogPost[] {
    let dynamicPosts: BlogPost[] = [];
    
    try {
        if (fs.existsSync(BLOG_JSON_PATH)) {
            const fileContent = fs.readFileSync(BLOG_JSON_PATH, 'utf8');
            const data = JSON.parse(fileContent);
            if (data.articles && Array.isArray(data.articles)) {
                dynamicPosts = data.articles.map((article: any) => ({
                    id: article.id,
                    slug: article.id,
                    title: article.title,
                    excerpt: article.snippet || article.excerpt || '',
                    content: article.content,
                    category: article.category,
                    author: article.author,
                    date: article.date,
                    image: article.image || '/images/card-strategy.png'
                }));
            }
        }
    } catch (error) {
        console.error('Error reading blog.json:', error);
    }

    // Merge and sort by date (descending)
    const allPosts = [...dynamicPosts, ...STATIC_POSTS];
    
    return allPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getBlogPost(slug: string): BlogPost | undefined {
    const allPosts = getBlogPosts();
    return allPosts.find(post => post.slug === slug);
}

export function convertMarkdownToHtml(markdown: string): string {
    if (!markdown) return '';
    
    // Check if it's already HTML (e.g. starts with <p> or has HTML tags)
    if (markdown.trim().startsWith('<') && markdown.includes('</')) {
        return markdown;
    }
    
    let html = markdown;
    
    // Convert headings
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    
    // Convert bold text **text** to <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert bullet lists
    let inList = false;
    let isFirstParagraph = true;
    const lines = html.split('\n');
    const processedLines = lines.map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const listContent = trimmed.substring(2);
            let result = `<li>${listContent}</li>`;
            if (!inList) {
                inList = true;
                result = `<ul>${result}`;
            }
            return result;
        } else {
            let result = '';
            if (inList) {
                inList = false;
                result = '</ul>';
            }
            if (trimmed) {
                if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<li')) {
                    result += trimmed;
                    isFirstParagraph = false;
                } else {
                    if (isFirstParagraph && trimmed.length > 30) {
                        result += `<section class="aeo-summary" style="padding: 1.5rem; background: var(--surface-100, #f8f9fa); border-left: 4px solid var(--accent, #6366f1); margin-bottom: 2rem; border-radius: 0 0.5rem 0.5rem 0;"><strong>Executive Summary:</strong> ${trimmed}</section>`;
                        isFirstParagraph = false;
                    } else {
                        result += `<p>${trimmed}</p>`;
                    }
                }
            }
            return result;
        }
    });
    
    if (inList) {
        processedLines.push('</ul>');
    }
    
    return processedLines.filter(line => line).join('\n');
}

