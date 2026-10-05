import BaseApiService, { ServiceOptions } from '../base';

/**
 * Events API (AirQo / Clean Air listings, upcoming/past)
 */
const EVENTS_ENDPOINTS = {
  AIRQO: '/website/api/v2/events/airqo/',
  CLEAN_AIR: '/website/api/v2/events/clean-air/',
  UPCOMING: '/website/api/v2/events/upcoming/',
  PAST: '/website/api/v2/events/past/',
  DETAIL: (id: string) => `/website/api/v2/events/${encodeURIComponent(id)}/`,
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

class EventsService extends BaseApiService {
  constructor() {
    super('EventsService');
  }

  private async getPaginated(
    path: string,
    options: ServiceOptions,
    params: { page?: number; page_size?: number; event_status?: string },
  ): Promise<any> {
    const response = await this.get<any>(path, params, {
      ...options,
      throwOnError: false,
    });
    if (response.success) {
      return response.data;
    }
    return emptyPaginated(params);
  }

  async getAirQoEvents(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    return this.getPaginated(EVENTS_ENDPOINTS.AIRQO, options, params);
  }

  async getCleanAirEvents(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    return this.getPaginated(EVENTS_ENDPOINTS.CLEAN_AIR, options, params);
  }

  async getUpcomingEvents(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    return this.getPaginated(EVENTS_ENDPOINTS.UPCOMING, options, params);
  }

  async getPastEvents(
    options: ServiceOptions = {},
    params: { page?: number; page_size?: number } = {},
  ): Promise<any> {
    return this.getPaginated(EVENTS_ENDPOINTS.PAST, options, params);
  }

  async getEventDetails(
    id: string,
    options: ServiceOptions = {},
  ): Promise<any | null> {
    const response = await this.get<any>(
      EVENTS_ENDPOINTS.DETAIL(id),
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
}

export const eventsService = new EventsService();
export default eventsService;
