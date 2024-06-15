"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

import { Button } from "@/app/_components/ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterDropdown() {
    const [filterStatus, setFilterStatus] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleChangeFilter = (value: "" | "peding" | "completed") => {
        const params = new URLSearchParams(searchParams);
        setFilterStatus(value);

        if (value) {
            params.set("status", value);
        } else {
            params.delete("status");
        }

        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size={"default"}
                    className="flex gap-2 text-slate-600"
                >
                    <Filter className="h-4 w-4" />
                    Status
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-16">
                <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={filterStatus}
                    onValueChange={handleChangeFilter}
                >
                    <DropdownMenuRadioItem value="">
                        Todos
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pending">
                        Pendente
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="completed">
                        Completo
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
