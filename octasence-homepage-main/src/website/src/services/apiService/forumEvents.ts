import BaseApiService, { ServiceOptions } from '../base';

/**
 * Africa Clean Air Forum — event listings and detail
 */
const FORUM_ENDPOINTS = {
  FORUM_EVENTS: '/website/api/v2/forum-events/',
  FORUM_EVENT_DETAIL: (uniqueTitle: string) =>
    `/website/api/v2/forum-events/${encodeURIComponent(uniqueTitle)}/`,
  FORUM_EVENT_TITLES: '/website/api/v2/forum-events/titles/',
} as const;

const emptyPaginated = (params: { page?: number; page_size?: number }) => ({
  results: [],
  total_pages: 1,
  count: 0,
  next: null,
  previous: null,
  page_size: params.page_size ?? 10,
  current_page: params.page ?? 1,
});

class ForumEventsService extends BaseApiService {
  constructor() {
    super('ForumEventsService');
  }

  async getForumEvents(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    const response = await this.get<any>(FORUM_ENDPOINTS.FORUM_EVENTS, params, {
      ...options,
      throwOnError: false,
    });
    if (response.success) {
      return response.data;
    }
    return emptyPaginated(params);
  }

  async getForumEventDetails(
    uniqueTitle: string,
    options: ServiceOptions = {},
  ): Promise<any | null> {
    const response = await this.get<any>(
      FORUM_ENDPOINTS.FORUM_EVENT_DETAIL(uniqueTitle),
      undefined,
      {
        ...options,
        throwOnError: false,
      },
    );
    if (response.success) {
      return response.data;
    }
    return null;
  }

  async getForumEventTitles(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    const response = await this.get<any>(
      FORUM_ENDPOINTS.FORUM_EVENT_TITLES,
      params,
      {
        ...options,
        throwOnError: false,
      },
    );
    if (response.success) {
      return response.data;
    }
    return emptyPaginated(params);
  }
}

export const forumEventsService = new ForumEventsService();
export default forumEventsService;
