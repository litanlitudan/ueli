import type { SearchResultItem } from "@common/SearchResultItem";

export interface SearchIndex {
    getSearchResultItems(): SearchResultItem[];
    addSearchResultItems(extensionId: string, searchResultItems: SearchResultItem[]): void;
    removeSearchResultItems(extensionId: string): void;
}