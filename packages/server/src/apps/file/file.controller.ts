import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

function resolve(dir) {
  return join(__dirname, dir);
}

const uploadOptions = {
  storage: diskStorage({
    destination: resolve('../../../../web/public/uploads'),
    filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

const fileMap = {
  1: ['image/jpeg', 'image/png'],
  2: ['image/gif'],
};

@Controller('file')
@ApiTags('公共模块')
@ApiBearerAuth()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', uploadOptions))
  async uploadFile(@UploadedFile() file, @Request() req) {
    const type: number = this.getFileType(file.mimetype);
    const createFile = {
      authorId: req.user.id,
      isShow: 1,
      type,
      originalname: file.originalname,
      mimetype: file.mimetype,
      path: file.destination,
      filename: file.filename,
      size: file.size,
    };
    console.log(file, createFile);
    const res = await this.fileService.create(createFile);
    console.log('uploadFile res', res);
    if (res) {
      return {
        ...createFile,
        filePath: join('uploads', file.filename),
      };
    }
  }

  getFileType(mimetype) {
    const item = Object.entries(fileMap).find(([, value]) => {
      return value.includes(mimetype);
    });
    if (item) {
      return Number(item[0]);
    }
    return 0;
  }

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
