import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "gatsby";

interface NewsItemProps {
  date: string;
  title: string;
  description: string;
  url?: string;
  className?: string;
  isInternal?: boolean;
}

export function NewsItem({ date, title, description, url, className, isInternal = false }: NewsItemProps) {
  // Format date to a more readable format
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={cn("border-b border-gray-200 py-6 last:border-0", className)}>
      <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      {url && isInternal ? (
        <Button variant="link" className="p-0" asChild>
          <Link to={url}>
            Read more
          </Link>
        </Button>
      ) : url && (
        <Button variant="link" className="p-0" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </Button>
      )}
    </div>
  );
}