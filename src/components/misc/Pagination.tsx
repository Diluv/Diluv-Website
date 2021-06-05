import React from "react";
// @ts-ignore
import ReactPaginate from "@jaredlll08/react-paginate";
import { SlugName } from "../../interfaces";
import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from "@heroicons/react/solid";

export function buildURL({
    search,
    page,
    sort,
    version,
    tags,
    defaultSort = "popular"
}: {
    search?: string;
    page?: number;
    sort?: string;
    version?: string;
    tags?: SlugName[];
    defaultSort?: string;
}): string {
    const params = new URLSearchParams();

    if (search) {
        params.append("search", search);
    }
    if (page !== 1) {
        params.append("page", page + "");
    }
    if (sort && sort !== defaultSort) {
        params.append("sort", sort);
    }
    if (version) {
        params.append("version", version);
    }
    if (tags && tags.length) {
        for (const tag of tags) {
            params.append("tags", tag.slug);
        }
    }
    params.sort();
    if (params.toString().length) {
        return `?${params.toString()}`;
    }
    return ``;
}

export default function Pagination({
    maxPage,
    page,
    asBuilder,
    hrefBuilder
}: {
    maxPage: number;
    page: number;
    asBuilder: (pageIndex: number) => string;
    hrefBuilder: (pageIndex: number) => string;
}): JSX.Element {
    return (
        <>
            <ReactPaginate
                previousLabel={<ChevronLeftIcon className={`mx-auto`} width={`1rem`} height={`1rem`} />}
                nextLabel={<ChevronRightIcon className={`mx-auto`} width={`1rem`} height={`1rem`} />}
                breakLabel={<DotsHorizontalIcon className={`mx-auto`} width={`1rem`} height={`1rem`} />}
                pageCount={maxPage === 0 ? 1 : maxPage}
                marginPagesDisplayed={1}
                initialPage={page - 1}
                forcePage={page - 1}
                disableInitialCallback={true}
                pageRangeDisplayed={3}
                containerClassName={`grid grid-cols-pagination`}
                activeClassName={`!bg-gray-400 hover:!bg-gray-400 dark:!bg-dark-800 dark:!hover:bg-dark-400`}
                activeLinkClassName={`!block`}
                pageClassName={`block bg-gray-200 hover:bg-gray-300 dark-hover:bg-dark-600 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                pageLinkClassName={`block py-1`}
                previousClassName={`border dark:border-dark-600 text-center px-auto ${
                    page === 1 || maxPage === 0 ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`
                }`}
                previousLinkClassName={`block fill-current py-2`}
                breakClassName={`block bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 border dark:border-dark-600 text-center`}
                breakLinkClassName={`block fill-current py-2`}
                nextClassName={`block border dark:border-dark-600 text-center ${
                    page === maxPage ? `bg-white dark:bg-dark-900` : `bg-gray-200 hover:bg-gray-300 dark:bg-dark-700`
                }`}
                nextLinkClassName={`block fill-current py-2`}
                asBuilder={(pageIndex: number) => {
                    if (pageIndex === 1 && maxPage === 0) {
                        return "";
                    }
                    return asBuilder(pageIndex);
                }}
                hrefBuilder={(pageIndex: number) => {
                    if (pageIndex === 1 && maxPage === 0) {
                        return "";
                    }
                    return hrefBuilder(pageIndex);
                }}
            />
        </>
    );
}
