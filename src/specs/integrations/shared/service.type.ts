import { CronQuartzUIService } from '@lib/ui/quartz-ui.service';
import { CronUnixUIService } from '@lib/ui/unix-ui.service';

export type Service = CronQuartzUIService|CronUnixUIService;
