"use client";

import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    links: {
        url: string;
        label: string;
        active: boolean;
        id: number;
    }[];
}

export default function Pagination({ links }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleClickPage(key: number) {
        const params = new URLSearchParams(searchParams);

        if (key > 1) {
            params.set("page", key.toString());
        } else {
            params.delete("page");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <PaginationComponent>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious className="cursor-pointer" />
                </PaginationItem>

                {links.map((link) => {
                    if (
                        link.label.includes("Anterior") ||
                        link.label.includes("Próximo")
                    ) {
                        return null;
                    }

                    if (link.label === "...") {
                        return (
                            <PaginationItem
                                key={link.id}
                                className="hidden md:inline-flex"
                            >
                                <PaginationEllipsis></PaginationEllipsis>
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={link.id}>
                            <PaginationLink
                                onClick={() =>
                                    handleClickPage(Number(link.label))
                                }
                                isActive={link.active}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="md:inline-flex hidden cursor-pointer"
                            ></PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext className="cursor-pointer" />
                </PaginationItem>
            </PaginationContent>
        </PaginationComponent>
    );
}
