import { CountService } from '@/modules/count/count.service';
import { UserService } from '@/modules/user/user.service';
import { SiteService } from '@/modules/site/site.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CountEntity } from '@/entities/count.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    private userService: UserService,
    private siteService: SiteService,
    private countService: CountService,
  ) {}

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  @Interval(10000 * 60)
  handleInterval() {
    this.tarks();
    this.logger.debug(`Called every ${10 * 60} seconds`);
  }

  @Timeout(5000)
  async handleTimeout() {
    this.tarks();
    this.logger.debug('Called once after 5 seconds');
  }

  async tarks() {
    const user = await this.userService.findList({});
    const total = user.total;
    const countList: Promise<Partial<CountEntity>>[] = user.list.map((item) => {
      return new Promise((resolve) => {
        this.siteService
          .count({
            where: {
              authorId: item.id,
            },
          })
          .then((res) => {
            resolve({
              authorId: item.id,
              sites: res,
            });
          });
      });
    });
    for await (const item of countList) {
      this.update(item.authorId, {
        sites: item.sites,
      });
    }
  }

  async update(authorId: number, updateTask: Partial<CountEntity>) {
    const count = await this.countService.findOne({
      authorId,
    });
    if (count) {
      await this.countService.update(count.id, {
        ...count,
        ...updateTask,
        type: 'site',
      });
    } else {
      await this.countService.create({
        ...updateTask,
        authorId,
        sites: 0,
        views: 0,
        collections: 0,
        top: 0,
        down: 0,
        type: 'site',
      });
    }
  }
}
