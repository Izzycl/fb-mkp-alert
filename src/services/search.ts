import { ISearchOption } from "../models/Common";
import { api } from "./index";

export const searchService = {
  querySearch: (searchQuery: string, locations: string[]) => {
    return api.post("/search", {
      searchQuery,
      locations,
    });
  },
};
