import { type NotificationsService } from "~/services/notification/notification.js";
import { type SuperheroesService } from "~/services/services.js";

type ExtraArguments = {
  notificationsService: NotificationsService;
  superheroesService: SuperheroesService;
};

export { type ExtraArguments };
