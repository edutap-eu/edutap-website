import * as React from "react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { Eye, FileX } from "lucide-react";
import "pdfjs-dist/build/pdf.worker.mjs";

export type PresentationType = {
    title: string;
    file: string;
    description?: string;
    type: 'lightning' | 'conference';
};

export const Presentation = ({ presentation }: { presentation: PresentationType }) => {
    const { title, file, description } = presentation;
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageError, setPageError] = useState(false);

    // PDF path
    const pdfPath = `/presentations/${file}`;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    function onDocumentLoadError(error: Error) {
        console.error("Error loading PDF:", error);
        setPageError(true);
    }

    return (
        <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200">
            {/* PDF Preview */}
            <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                {pageError ? (
                    <div className="flex items-center justify-center h-full w-full bg-gray-200">
                        <FileX className="h-12 w-12 text-gray-400" />
                    </div>
                ) : (
                    <Document
                        file={pdfPath}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                            <div className="flex items-center justify-center h-full w-full">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="bg-gray-300 h-24 w-full rounded"></div>
                                </div>
                            </div>
                        }
                        className="flex items-center justify-center h-full w-full"
                    >
                        <Page
                            pageNumber={1}
                            width={400}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="pdf-thumbnail"
                        />
                    </Document>
                )}

                {/* Type badge */}
                {/*<div className="absolute top-2 right-2">*/}
                {/*    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${*/}
                {/*        presentation.type === 'lightning'*/}
                {/*            ? 'bg-yellow-100 text-yellow-800'*/}
                {/*            : 'bg-blue-100 text-blue-800'*/}
                {/*    }`}>*/}
                {/*        {presentation.type === 'lightning' ? 'Lightning' : 'Conference'}*/}
                {/*    </span>*/}
                {/*</div>*/}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-4">
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
                {description && (
                    <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{description}</p>
                )}
                <div className="mt-auto pt-2">
                    <a
                        href={pdfPath}
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        View Presentation
                    </a>
                </div>
            </div>
        </div>
    );
};