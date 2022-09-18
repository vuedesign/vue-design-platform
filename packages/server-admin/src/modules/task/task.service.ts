import { SiteEntity } from '@/entities/site.entity';
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
    private page = 1;
    private total = 0;
    private readonly size = 10;

    constructor(
        private userService: UserService,
        private siteService: SiteService,
        private countService: CountService,
    ) {}

    // @Cron('45 * * * * *')
    // handleCron() {
    //   this.logger.debug('Called when the second is 45');
    // }

    @Interval(10000 * 6)
    handleInterval() {
        this.tarks();
        this.logger.debug(`Called every ${10 * 6} seconds`);
    }

    @Timeout(5000)
    async handleTimeout() {
        this.tarks();
        this.logger.debug('Called once after 5 seconds');
    }

    async tarks() {
        this.page = 1;
        const tark = await this.tark({ size: this.size, page: this.page });
        this.total = tark.total;
        while (this.page * tark.size < this.total) {
            this.page++;
            await this.tark({
                size: this.size,
                page: this.page,
            });
        }
    }

    async tark({ size = 20, page = 1 }) {
        const user = await this.userService.findList({
            select: {
                id: true,
            },
            pagination: {
                size,
                page,
            },
        });
        const total = user.total;
        const countList: Promise<Partial<CountEntity>>[] = this.getCountList(
            user.list,
        );
        for await (const item of countList) {
            if (item) {
                await this.update(item.authorId, item);
            }
        }
        return {
            page,
            size,
            total,
        };
    }

    getCountList(list: { id: number }[] = []): Promise<any>[] {
        return list.map(
            (item) =>
                new Promise((resolve) => {
                    this.siteService
                        .findList({
                            where: {
                                authorId: item.id,
                            },
                        })
                        .then(({ list, pagination, total }) => {
                            if (total > 0) {
                                resolve({
                                    authorId: item.id,
                                    sites: total,
                                    ...this.listFiledTotal(list),
                                });
                            } else {
                                resolve(null);
                            }
                        });
                }),
        );
    }

    /**
     * 累计
     */
    listFiledTotal(list: SiteEntity[]) {
        return list.reduce(
            (total, currentValue) => ({
                views: total.views + currentValue.views,
                collections: total.collections + currentValue.collections,
                top: total.top + currentValue.top,
                down: total.down + currentValue.down,
            }),
            {
                views: 0,
                collections: 0,
                top: 0,
                down: 0,
            },
        );
    }

    /**
     * 更新到统计表
     */
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
            // this.logger.log(JSON.stringify(updateTask));
        } else {
            await this.countService.create({
                authorId,
                sites: 0,
                views: 0,
                collections: 0,
                top: 0,
                down: 0,
                type: 'site',
            });
        }
        this.logger.log('update');
    }
}
