'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;
    const [expandedAbstractId, setExpandedAbstractId] = useState<string | null>(null);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                        {pub.preview && (
                            <div className="w-full md:w-48 flex-shrink-0">
                                <div className="aspect-video md:aspect-[4/3] relative rounded-lg overflow-hidden bg-white">
                                    <Image src={`/papers/${pub.preview}`} alt={pub.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 192px" />
                                </div>
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-primary mb-2 leading-tight">
                            <a href={pub.doi ? `https://doi.org/${pub.doi}` : pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                                <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                            </a>
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                        {author.name}
                                    </span>
                                    {author.isCorresponding && (
                                        <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                            {pub.journal || pub.conference}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
                                {pub.description}
                            </p>
                        )}
                        {pub.doi && (
                            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs text-accent hover:text-accent-dark break-all">
                                DOI: {pub.doi}
                            </a>
                        )}
                        {pub.abstract && (
                            <div className="mt-3">
                                <button
                                    onClick={() => setExpandedAbstractId(expandedAbstractId === pub.id ? null : pub.id)}
                                    aria-expanded={expandedAbstractId === pub.id}
                                    aria-controls={`selected-abstract-${pub.id}`}
                                    className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium transition-colors ${expandedAbstractId === pub.id
                                        ? 'bg-accent text-white'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent hover:text-white'}`}
                                >
                                    <DocumentTextIcon className="h-3 w-3 mr-1.5" />
                                    {messages.publications.abstract}
                                </button>
                                <AnimatePresence>
                                    {expandedAbstractId === pub.id && (
                                        <motion.div
                                            key="abstract"
                                            id={`selected-abstract-${pub.id}`}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden mt-4"
                                        >
                                            <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                                                <p className="text-sm text-neutral-600 dark:text-neutral-500 leading-relaxed">{pub.abstract}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                        </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
