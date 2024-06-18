"use client";

import { useEffect, useState } from "react";
import FilterDropdown from "./_components/filter-dropdown";
import OrdersTable from "./_components/orders-table";
import Pagination from "./_components/pagination";
import SearchInput from "./_components/search-input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./_components/ui/card";
import axios from "axios";

type ComponentProps = {
    searchParams?: {
        search?: string;
        status?: string;
        sort?: string;
        page?: number;
    };
};

export default function Home({ searchParams }: ComponentProps) {
    const [orders, setOrders] = useState([]);
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "https://apis.codante.io/api/orders-api/orders",
                {
                    params: {
                        search: searchParams?.search,
                        status: searchParams?.status,
                        sort: searchParams?.sort,
                        page: searchParams?.page,
                    },
                }
            );
            setOrders(response.data.data);
            setLinks(response.data.meta.links);
        };

        fetchData();
    }, [searchParams]);

    return (
        <main className="container px-1 py-10 md:p-10">
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Pedidos</CardTitle>
                    <CardDescription>
                        Uma listagem de pedidos do seu negócio.
                    </CardDescription>
                    <div className="flex pt-10 gap-4">
                        <SearchInput />
                        <FilterDropdown />
                    </div>
                </CardHeader>
                <CardContent>
                    <OrdersTable orders={orders} />
                    <div className="mt-8">
                        <Pagination links={links} />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
